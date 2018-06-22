import {
    ComponentFactoryResolver,
    Injectable
} from '@angular/core'

@Injectable()
export class NgxTableService {

    private rootViewContainer;

    constructor(private resolver: ComponentFactoryResolver) {
    }

    addDynamicComponent(viewContainerRef: any, component, toPay, payments) {
        this.rootViewContainer = viewContainerRef;
        this.rootViewContainer.clear();
        const factory = this.resolver.resolveComponentFactory(component);
        const createdComponent = this.rootViewContainer.createComponent(factory);
        createdComponent.instance.toPay = toPay;
        createdComponent.instance.payments = payments;
    }
}