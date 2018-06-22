import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import { User } from './models/user';

@Injectable()
export class AppUserService {

    private users: User[] = [{
        id: 1,
        firstname: 'user',
        lastname: 'user',
        email: 'user@easylocatus.com',
        phone: '0021612345614',
        password: '123456'
    }]


    constructor() {
        // this.userArray = Object.values(this.users);
    }

    add(user: User) {
        this.users.push(user);
    }

    all(): User[] {
        return this.users;
    }

    existe(user): boolean {
        const result = this.users.filter(u => {
            return user.email === u.email && user.password === u.password;
        });
        if(result.length > 0) {
            return true;
        }
        return false;
    }

}
