import { Injectable } from '@angular/core';

@Injectable()
export class UtilitiesService {


    getDataFromObject(object, path) {
        let parts = path.split(".");
        if (parts.length == 1) {
            return object[parts[0]];
        }
        return this.getDataFromObject(object[parts[0]], parts.slice(1).join("."));
    }

}