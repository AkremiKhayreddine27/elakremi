import { Subject } from "../../../../node_modules/rxjs";

export abstract class DataService {

    protected data: any[] = [];

    protected added: Subject<any> = new Subject();

    protected removed: Subject<any> = new Subject();

    protected changed: Subject<any> = new Subject();

    onAdded() {
        return this.added;
    }

    onRemoved() {
        return this.removed;
    }

    onChanged() {
        return this.changed;
    }

    all(): any[] {
        return this.data;
    }

    find(id: number): any {
        return this.data.find(item => {
            return item.id === id;
        });
    }

    findBy(attribute: string, value: any): any[] {
        return this.data.filter(item => {
            return this.getDataFromObject(item, attribute) === value;
        });
    }

    findFirstBy(attribute: string, value: any): any {
        return this.data.find(item => {
            return this.getDataFromObject(item, attribute) === value;
        });
    }

    findByAndBy(filters) {
        return this.data.filter((item: any) => {
            for (var key in filters) {
                if (this.getDataFromObject(item, key) === undefined || this.getDataFromObject(item, key) != filters[key])
                    return false;
            }
            return true;
        });
    }

    findFirstByAndBy(filters) {
        return this.data.find((item: any) => {
            for (var key in filters) {
                if (this.getDataFromObject(item, key) === undefined || this.getDataFromObject(item, key) != filters[key])
                    return false;
            }
            return true;
        });
    }

    store(item: any): void {
        this.data.push(item);
        this.added.next(item);
        this.changed.next(item);
    }

    delete(item: any): void {
        if (typeof item === 'number') {
            this.data = this.data.filter(r => {
                return r.id !== item;
            })
        } else {
            this.data = this.data.filter(r => {
                return r.id !== item.id;
            });
        }
        this.removed.next(item);
        this.changed.next(item);
    }

    update(oldValue: any, newValue: any): void {
        this.data = this.data.filter(r => {
            return r.id !== oldValue.id;
        });
        this.data.push(newValue);
        this.changed.next(newValue);
    }

    sortBy(attribute: any) {
        this.data.sort((a, b) => {
            return this.getDataFromObject(b, attribute) - this.getDataFromObject(a, attribute);
        });
    }

    clear() {
        this.data = [];
    }

    getDataFromObject(object, path) {
        let parts = path.split(".");
        if (parts.length == 1) {
            return object[parts[0]];
        }
        return this.getDataFromObject(object[parts[0]], parts.slice(1).join("."));
    }
}