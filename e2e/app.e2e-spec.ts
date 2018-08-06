import { AppPage } from './app.po';
import { async, inject, TestBed } from '@angular/core/testing';
import { NbAuthService, NbTokenService, NbPasswordAuthStrategy, NbTokenStorage, NbAuthTokenParceler } from '@nebular/auth';

describe('angular4-calendar App', () => {
    let page: AppPage;
    let auth: NbAuthService;

    beforeEach(
        inject(
            [NbAuthService],
            (_auth) => {
                auth = _auth;
                page = new AppPage();
                auth.authenticate('email', { email: 'email@example.com', password: 'test' });
            },
        )
    );


    it('should display welcome message', () => {
        page.navigateTo();
        expect(page.getParagraphText()).toEqual('Welcome to app!');
    });
});