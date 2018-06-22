import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NbAuthService, NbAuthSimpleToken } from '@nebular/auth';
import { tap } from 'rxjs/operators/tap';

@Injectable()
export class NotAuthGuard implements CanActivate {

    constructor(private authService: NbAuthService, private router: Router) {
    }

    // TO DO
    canActivate() {
        return true;
    }
}