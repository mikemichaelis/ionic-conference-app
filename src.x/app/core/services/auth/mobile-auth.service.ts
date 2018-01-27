import { Injectable, NgZone } from '@angular/core';
import { Http } from '@angular/http';

import { Storage } from '@ionic/storage';
import { LogService } from '../common';
import { State } from '../state-service';

import Auth0Cordova from '@auth0/cordova';

import { BaseAuthService, IAuthService } from './base.auth.service';

import { AUTH_CONFIG } from './auth-config';

@Injectable()
export class MobileAuthService extends BaseAuthService implements IAuthService  {
  private client: any;

  constructor(public state: State, public http: Http, public storage: Storage, public zone: NgZone, public logger: LogService) {
    super(state, http, storage, zone, logger);

    // TODO this is http://192.168.3.?:8100 and should be a mobile address
    this.auth0Config.callbackURL = location.href;
    this.auth0Config.scope = this.auth0Config.scope;

    try {
      this.client = new Auth0Cordova(this.auth0Config);
    } catch(error) {
      this.logger.error({ stack: 'MobileAuthService.Auth0Cordova().catch()', error: error });
    }
  }

  public async login(): Promise<boolean> {
    return new Promise<boolean>((resolve) =>
    this.client.authorize({ scope: AUTH_CONFIG.scope, audience: AUTH_CONFIG.audience },
      async (error, authResult) => {
        if(error) {
          this.logger.error({ stack: 'MobileAuthService.login()', error: error });
          resolve(false);
        } else {
          await this.processAuthResult(authResult.idToken, authResult.accessToken, authResult.expiresIn, authResult.refreshToken);
          let authenticated = await this.isAuthenticated();
          resolve(authenticated);
        }
    }));
  }
}
