import {
    ComponentFactoryResolver,
    Injectable
} from '@angular/core'

@Injectable()
export class NgxTableService {

    private rootViewContainer;

    constructor(private resolver: ComponentFactoryResolver) {
    }

    addDynamicComponent(viewContainerRef: any, component, data, nomenclature) {
        this.rootViewContainer = viewContainerRef;
        this.rootViewContainer.clear();
        const factory = this.resolver.resolveComponentFactory(component);
        const createdComponent = this.rootViewContainer.createComponent(factory);
        createdComponent.instance.data = data;
        createdComponent.instance.nomenclature = nomenclature;
    }
}