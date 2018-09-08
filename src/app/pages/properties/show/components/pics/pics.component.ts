import { Component, OnInit, Input, OnDestroy, forwardRef, Self, Optional } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ControlValueAccessor, NgControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-pics',
  templateUrl: './pics.component.html',
  styleUrls: ['./pics.component.scss'],
})
export class PicsComponent implements OnInit, OnDestroy, ControlValueAccessor {

  images: any[];

  isCollapsed: boolean = true;

  task: AngularFireUploadTask;

  percentage: Observable<number>;

  snapshot: Observable<any>;

  isHovering: boolean;

  downloadUrlSubscription: Subscription;

  constructor(@Optional() @Self() public controlDir: NgControl, private storage: AngularFireStorage) {
    controlDir.valueAccessor = this;
  }

  ngOnInit() {
    const control = this.controlDir.control;
    let validators = control.validator ? [control.validator] : [];
    control.setValidators(validators);
    control.updateValueAndValidity();
  }

  toggleHovering(event: boolean) {
    this.isHovering = event;
  }

  startUpload(event: FileList) {
    const file = event.item(0);
    if (file.type.split('/')[0] !== 'image') {
      console.log('unsupprted file type');
      return;
    }
    const path = file.name;
    this.task = this.storage.upload(path, file);
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges();
    this.task.then(result => {
      this.downloadUrlSubscription = this.storage.ref(path).getDownloadURL().subscribe(url => {
        this.images.push({
          name: file.name,
          type: file.type,
          size: file.size,
          url: url
        });
        this.onChange(this.images);
      });
    });
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

  ngOnDestroy() {
    if (this.downloadUrlSubscription) {
      this.downloadUrlSubscription.unsubscribe();
    }
  }

  writeValue(value: any) {
    this.images = value;
  }

  registerOnChange(fn: (value: any) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  onChange(value: any) {

  }

  onTouched() {

  }

}
