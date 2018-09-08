import { Component, OnInit, OnChanges, SimpleChanges, Input, ViewChild, EventEmitter, forwardRef, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Http } from '@angular/http';
import { Property } from '@core/data/models/property';
import { PropertyService } from '@core/data';
import { OSM_TILE_LAYER_URL, MapComponent as LeafletMap, MarkerDirective } from '@yaga/leaflet-ng2';
import { LatLng, Point } from 'leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import 'style-loader!leaflet/dist/leaflet.css';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import 'rxjs/add/operator/map';
import 'style-loader!angular2-toaster/toaster.css';
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LocationComponent),
      multi: true
    }
  ]
})
export class LocationComponent implements OnInit, AfterViewInit, OnChanges, ControlValueAccessor {

  @ViewChild('form') form: FormGroup;

  config: ToasterConfig;

  isCollapsed: boolean = false;

  location: any = {};

  userLocation: any = {
    address: '',
    city: '',
    state: '',
    postcode: '',
    country: '',
    longitude: 0,
    latitude: 0,
    isValid: false
  };

  mapLocation: any = {
    address: '',
    city: '',
    state: '',
    postcode: '',
    country: '',
    longitude: 0,
    latitude: 0
  };

  withNearest: string = '';

  nearest = [];

  private gpsListener: EventEmitter<Position>;

  @ViewChild(LeafletMap) private mapComponent: LeafletMap;

  @ViewChild(MarkerDirective) private secondaryPopup: MarkerDirective;

  openStreetMapProvider = new OpenStreetMapProvider();

  public iconUrl = 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png';
  public greyIconUrl = 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png';
  public greenIconUrl = 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png';
  public iconSize: Point = new Point(38, 40);
  public shadowUrl = 'http://leafletjs.com/examples/custom-icons/leaf-shadow.png';
  public shadowSize: Point = new Point(0, 0);
  public popupAnchor: Point = new Point(-10, -16);
  public greenPopupAnchor: Point = new Point(-7, -16);

  mapZoom = 2;

  mapLng = 0;

  mapLat = 0;

  tileLayerUrl = OSM_TILE_LAYER_URL;


  primaryMarker;

  secondaryMarker;

  secondaryPopupStatus = false;

  addresses = [];

  constructor(private http: Http, private toasterService: ToasterService, private propertyService: PropertyService) {

  }

  ngOnChanges(changes: SimpleChanges) {

  }

  ngOnInit() {
    this.buildForm();
    this.mapComponent.scrollWheelZoom.disable();
    this.mapComponent.dragging.disable();
  }

  ngAfterViewInit() {
    console.log(this.formUserLocation.value.longitude);
    if (this.formUserLocation.value.longitude) {
      this.location = { ...this.form.value };
      this.mapLocation = { ...this.formMapLocation.value };
      this.userLocation = { ...this.formUserLocation.value };
      if (this.userLocation.isValid) {
        this.primaryMarker = {
          longitude: this.userLocation.longitude,
          latitude: this.userLocation.latitude,
          address: this.userLocation.address,
          title: this.userLocation.address
        };
      } else {
        this.secondaryMarker = {
          longitude: this.userLocation.longitude,
          latitude: this.userLocation.latitude,
          address: this.userLocation.address,
          title: this.userLocation.address
        };
        this.secondaryMarker.display = true;
        this.secondaryPopupStatus = true;
      }
      this.mapZoom = 18;
      this.mapLat = this.userLocation.latitude;
      this.mapLng = this.userLocation.longitude;
      this.centerMap();
    } else {
      this.primaryMarker = null;
      this.secondaryMarker = null;
    }
  }

  buildForm() {
    this.form = new FormGroup({
      userLocation: new FormGroup({
        country: new FormControl({ value: null, disabled: false }, Validators.required),
        city: new FormControl({ value: null, disabled: false }, Validators.required),
        state: new FormControl({ value: null, disabled: false }, Validators.required),
        address: new FormControl({ value: null, disabled: false }, Validators.required),
        longitude: new FormControl({ value: null, disabled: false }, Validators.required),
        latitude: new FormControl({ value: null, disabled: false }, Validators.required),
        postcode: new FormControl({ value: null, disabled: false }, Validators.required),
        isValid: new FormControl({ value: null, disabled: false }, Validators.required),
      }),
      mapLocation: new FormGroup({
        country: new FormControl(null, Validators.required),
        city: new FormControl(null, Validators.required),
        state: new FormControl(null, Validators.required),
        address: new FormControl(null, Validators.required),
        longitude: new FormControl(null, Validators.required),
        latitude: new FormControl(null, Validators.required),
        postcode: new FormControl(null, Validators.required),
      }),
      isMapAddress: new FormControl()
    });
  }

  get formUserLocation(): FormGroup { return this.form.get('userLocation') as FormGroup }

  get userAddress(): FormControl { return this.formUserLocation.get('address') as FormControl }

  get userCity(): FormControl { return this.formUserLocation.get('city') as FormControl }

  get userCountry(): FormControl { return this.formUserLocation.get('country') as FormControl }

  get userPostcode(): FormControl { return this.formUserLocation.get('postcode') as FormControl }

  get userState(): FormControl { return this.formUserLocation.get('state') as FormControl }

  get formMapLocation(): FormGroup { return this.form.get('mapLocation') as FormGroup }

  writeValue(value: any) {
    value && this.form.setValue(value, { emitEvent: false });
  }

  registerOnChange(fn: (value: any) => void) {
    this.form.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean) {
    disabled ? this.form.disable() : this.form.enable();
  }

  onTouched() {

  }

  zoomChange(zoom) {
  }

  /**
   * Handle end dragging event
   * Search for address given lon & lat
   * Show popup
   * @param event 
   * @param  
   */
  handleEvent(event, $event) {
    this.fetchAddress($event.target.lat, $event.target.lng).then(() => {
      this.secondaryMarker.display = true;
      this.secondaryPopup.openPopup();
    });
  }


  getQuery(location): string {
    return location.address ? location.address : '' + ',' + location.city ? location.city : '' + ',' + location.state ? location.state : '' + ',' + location.postcode ? location.postcode : '' + ',' + location.country ? location.country : '';
  }

  searchQuery(query: string, address: string): any {
    return this.openStreetMapProvider.search({ query: query }).then(results => {
      if (results.length > 0) {
        return results;
      } else if (address && address.split(' ').length > 0) {
        console.log(address);
        address = address.split(' ').slice(1, address.split(' ').length).join(' ')
        return this.searchQuery(address, address);
      } else {
        return;
      }
    });
  }

  /**
   * Use open street map provider to search for address
   * Locate the address
   * Set new zoom for map
   * center map
   * display marker
   * display popup
   */
  searchLocation() {
    this.mapComponent.scrollWheelZoom.enable();
    this.mapComponent.dragging.enable();
    if (!this.compare(this.userLocation, this.formUserLocation.value)) {
      const query = this.getQuery(this.formUserLocation.value);
      this.searchQuery(query, this.formUserLocation.value.address).then(results => {
        if (results && results.length > 0) {
          this.refreshMap(results);
        } else {
          this.showToast('error', '', 'Nous ne pouvons pas localiser votre address');
        }
      });
    }
  }

  showToast(type: string, title: string, body: string) {
    this.config = new ToasterConfig({
      positionClass: 'toast-top-right',
      timeout: 10000,
      newestOnTop: true,
      tapToDismiss: true,
      preventDuplicates: false,
      animation: 'fade',
      limit: 1,
    });
    const toast: Toast = {
      type: type,
      title: title,
      body: body,
      timeout: 5000,
      showCloseButton: true,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);
  }

  /*
  public setFollow(val: boolean): void {
    if (val && !this.gpsListener) {
      if (this.gpsService.position) {
        this.mapLat = this.gpsService.position.coords.latitude;
        this.mapLng = this.gpsService.position.coords.longitude;
      }
      return;
    }
    if (!val && this.gpsListener) {
      this.gpsListener.unsubscribe();
      this.gpsListener = null;
    }
  }
  */

  centerMap() {
    this.mapComponent.setView(new LatLng(this.userLocation.latitude ? this.userLocation.latitude : this.mapLocation.latitude, this.userLocation.longitude ? this.userLocation.longitude : this.mapLocation.longitude), 18);
  }

  getLocationProperties() {
    const keys = []
    for (let key in this.formUserLocation.value) {
      if (this.formUserLocation.value.hasOwnProperty(key) && key !== 'isValid' && key !== 'mapLocation' && key !== 'longitude' && key !== 'latitude' && key !== 'isMapAddress') {
        if (this.formUserLocation.value[key] !== '') {
          keys.push(key);
        }
      }
    }
    return keys;
  }

  refreshMap(data, zoom = 18) {
    this.fetchAddress(data[0].raw.lat, data[0].raw.lon).then((location: any) => {
      this.mapZoom = zoom === 0 ? 6 : zoom;
      this.mapLat = location.lat;
      this.mapLng = location.lng;
      this.secondaryMarker.display = true;
      this.secondaryPopupStatus = true;
    });
  }


  /**
   * Close Popup
   * save location lon & lat
   * @param  
   */
  closePopup($event) {
    this.secondaryPopupStatus = false;
    this.userLocation.latitude = this.mapLocation.latitude;
    this.userLocation.longitude = this.mapLocation.longitude;
  }

  /**
   * Close Popup
   * Save data
   * Change marker
   */
  validateLocation() {
    this.secondaryPopup.closePopup();
    this.formUserLocation.patchValue({ address: this.formUserLocation.value.address ? this.formUserLocation.value.address : this.mapLocation.address })
    this.formUserLocation.patchValue({ city: this.formUserLocation.value.city ? this.formUserLocation.value.city : this.mapLocation.city })
    this.formUserLocation.patchValue({ state: this.formUserLocation.value.state ? this.formUserLocation.value.state : this.mapLocation.state })
    this.formUserLocation.patchValue({ postcode: this.formUserLocation.value.postcode ? this.formUserLocation.value.postcode : this.mapLocation.postcode })
    this.formUserLocation.patchValue({ country: this.formUserLocation.value.country ? this.formUserLocation.value.country : this.mapLocation.country })
    this.formUserLocation.patchValue({ isValid: true })
    this.primaryMarker = this.secondaryMarker;
    this.secondaryMarker = null;
    this.mapComponent.scrollWheelZoom.disable();
    this.mapComponent.dragging.disable();
  }

  getNearby(nearest) {
    this.withNearest = nearest;
    if (nearest === 'Biens') {
      this.nearest = this.propertyService.getNearby(this.mapComponent.getBounds(), this.propertyService.currentProperty).map((p: Property) => {
        return {
          latitude: p.location.userLocation.latitude,
          longitude: p.location.userLocation.longitude,
          property: p,
          display: true
        };
      });
    } else {
      this.nearest = [];
    }

  }

  fetchAddress(lat, lng) {
    return new Promise((resolve, reject) => {
      this.http.get('https://nominatim.openstreetmap.org/reverse?format=json&lat=' + lat + '&lon=' + lng).
        map(response => response.json()).subscribe(result => {
          const address = result.display_name.split(',')[0] + ',' + result.display_name.split(',')[1];
          const city = result.address.town ? result.address.town : result.address.county;
          const display = address + ', ' + city + ', ' + result.address.state + ', ' + result.address.postcode + ', ' + result.address.country;
          this.secondaryMarker = {
            longitude: lng,
            latitude: lat,
            address: display,
            title: display,
            display: false
          }

          this.mapLocation = {
            address: address,
            country: result.address.country,
            city: city,
            longitude: lng,
            latitude: lat,
            postcode: result.address.postcode,
            state: result.address.state,
          };
          resolve({ lat: result.lat, lng: result.lon });
        }, error => {
          console.log('Nous avons rencontrés des problème lors de la localisation votre address');
          reject(error);
        });
    });
  }

  compare(obj1, obj2) {
    //Loop through properties in object 1
    for (var p in obj1) {
      //Check property exists on both objects
      if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) return false;

      switch (typeof (obj1[p])) {
        //Deep compare objects
        case 'object':
          if (!this.compare(obj1[p], obj2[p])) return false;
          break;
        //Compare function code
        case 'function':
          if (typeof (obj2[p]) == 'undefined' || (p != 'compare' && obj1[p].toString() != obj2[p].toString())) return false;
          break;
        //Compare values
        default:
          if (obj1[p] != obj2[p]) return false;
      }
    }

    //Check object 2 for any extra properties
    for (var p in obj2) {
      if (typeof (obj1[p]) == 'undefined') return false;
    }
    return true;
  }
}
