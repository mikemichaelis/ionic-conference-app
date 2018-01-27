import { Http } from '@angular/http';
import { Injectable, NgZone } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AUTH_CONFIG, AuthConfig } from './auth-config';
import { LogService } from '../common';
import { State } from '../state-service';
import { NetworkEnum } from '../../enums/networkEnum';
import { SystemEnum } from '../../enums/systemEnum';
import Auth0 from 'auth0-js';
import * as _ from 'lodash-es';

export interface IAuthService {

  initialize(refreshToken?: string): Promise<boolean>;

  isAuthenticated(): Promise<boolean>;

  //autoLogin(): Promise<boolean>;
  loginRefresh(refreshToken: string);

  login();
  logout();
}

@Injectable()
export abstract class BaseAuthService implements IAuthService {

  protected auth0Config: AuthConfig = AUTH_CONFIG;
  protected refreshToken: string;
  protected expiresAt: number;

  private auth0: any;

  constructor(public state: State, public http: Http, public storage: Storage, public zone: NgZone, public logger: LogService) {
    this.auth0 = new Auth0.WebAuth(this.auth0Config);

    this.state.systemEvents.subscribe(async (system) => {
      if(!this.state.initialized) return;
      switch(system.event) {
        case SystemEnum.NETWORK:
        this.logger.trace({ stack: 'BaseAuthService.systemEvents', event: system.event, state: system.state });
          if(system.state === NetworkEnum.NONE) {
            // we lost network but don't change authenticated state as our token is
            // still good until it times out
          } else {
            if(await this.isAuthenticated()) {
              this.state.authenticated = true;
            } else {
              if(this.refreshToken) {
                // try to authenticate with refresh token
                this.state.authenticated = await this.loginRefresh();
              }
              else {
                // TODO this should never happen in mobile......
                // this can happen in a SPA
                // no refresh token means user has never logged in
                // initial login is a requirement
                if(!this.state.browser) throw 'missing refresh token';
              }
            }
          }
        }
    });
  }

  // refreshToken is passed here to allow development from a SPA
  public async initialize(refreshToken?: string): Promise<boolean> {
      this.logger.trace({ stack: 'BaseAuthService.initialize()', refreshToken: refreshToken !== null });
      let tasks: Promise<any>[] = [];
      tasks.push(this.getStorageVariable('profile').then(profile => { this.state.profile = profile  }));
      tasks.push(this.getStorageVariable('id_token').then(idToken => { this.state.idToken = <string>idToken }));
      tasks.push(this.getStorageVariable('access_token').then(accessToken => {
        this.state.accessToken = <string>accessToken
      }));
      tasks.push(this.getStorageVariable('expires_at').then(expires_at => { this.expiresAt = expires_at }));
      tasks.push(this.getStorageVariable('refresh_token').then(refreshToken => { this.refreshToken = <string>refreshToken }));
      await Promise.all(tasks);

      // Exclusive for SPA development
      if(refreshToken) {
        this.refreshToken = refreshToken;
        await this.loginRefresh();
      }

      this.state.authenticated = await this.isAuthenticated();

      if(this.state.authenticated) {
        this.setAccessTokenTimeout(this.expiresAt);
      }

      return Promise.resolve(this.state.authenticated);
  }

  // public async autoLogin(): Promise<boolean> {
  //   let isAuthenticated = await this.isAuthenticated();
  //   if(isAuthenticated && BaseAuthService.idToken && BaseAuthService.accessToken) {
  //     this.setAuthenticatedState(await this.processAuthResult(BaseAuthService.idToken,BaseAuthService.accessToken, (this.expiresAt - Date.now()) / 1000, this.refreshToken));
  //   } else {
  //     await this.loginRefresh();
  //   }
  //   return this.isAuthenticated();
  // }

  public abstract login();

  public async logout() {
    await this.storage.remove('profile');
    await this.storage.remove('access_token');
    await this.storage.remove('id_token');
    await this.storage.remove('refresh_token');
    await this.storage.remove('expires_at');

    this.state.idToken = null;
    this.state.accessToken = null;
    this.state.profile = null;

    this.state.authenticated = false;
  }

  public async loginRefresh(): Promise<any> {
    return new Promise((resolve: Function) => {
      let response = this.http.post("https://" + this.auth0Config.domain + '/oauth/token',
        {
          "grant_type": "refresh_token",
          "client_id": this.auth0Config.clientID,
          "refresh_token": this.refreshToken
        });

      response.subscribe(
        async (next) => {
          let success = false;
          try {
            this.logger.trace({ stack: 'BaseAuthService.loginRefresh().next()', success: true });
            let authResult: any = JSON.parse(next["_body"]);
            success = await this.processAuthResult(authResult.id_token, authResult.access_token, authResult.expires_in, null)
            this.logger.trace({ stack: 'BaseAuthService.loginRefresh().next()', success: success });
          } catch(error) {
            this.logger.trace({ stack: 'BaseAuthService.loginRefresh().next().catch()', error: error });
          }

          resolve(success);
        },
        (error) => {
          this.logger.error({ stack: 'BaseAuthService.loginRefresh().error()', error: error });
          resolve(false);
        })
    });
  }


  protected async processAuthResult(idToken: string, accessToken: string, expiresIn: number, refreshToken: string): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
      this.setIdToken(idToken);
      this.setAccessToken(accessToken, expiresIn);

      if(refreshToken) {
        this.setRefreshToken(refreshToken);
      }

      let authenticated = await this.getUserInfo(accessToken);
      this.state.authenticated = authenticated;

      resolve(authenticated);
    });
  }

  protected async getUserInfo(accessToken: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.auth0.client.userInfo(accessToken, (error, profile) => {
        if(error) {
          this.logger.error({ stack: 'BaseAuthService.getUserInfo()', error: error });
          resolve(false);
        }
        else {
          this.logger.trace({ stack: 'BaseAuthService.getUserInfo()', success: profile !== null  });
          profile.user_metadata = profile.user_metadata || {};
          this.setProfile(profile);
          resolve(true);
        }
      })
    });
  }

  protected setIdToken(token) {
    this.state.idToken = token;
    this.setStorageVariable('id_token', token);
  }

  protected setAccessToken(token:string, expiresIn: number) {
    this.state.accessToken = token;
    this.setStorageVariable('access_token', token);
    // console.log("setAccessToken: " + token);

    // expiresIn is Seconds the access_token is valid
    // convert to MS then add the current time resulting in the MS the token will expire in local time
    const expiresAt: number = (expiresIn * 1000) + Date.now();  //new Date().getTime();
    this.setStorageVariable('expires_at', expiresAt);

    this.setAccessTokenTimeout(expiresAt);
  }

  protected setRefreshToken(token) {
    this.refreshToken = token;
    this.setStorageVariable('refresh_token', token);
  }

  protected setProfile(profile:any) {
    this.setStorageVariable('profile', profile);
    // TODO - zone.run()......
    this.zone.run(() => {
      this.state.profile = profile;
    });
  }

  protected setStorageVariable(name, data) {
    this.storage.set(name, JSON.stringify(data));
  }

  protected async getStorageVariable(name: string): Promise<any> {
    return new Promise((resolve) => {
      this.storage.get(name).then(data => resolve(JSON.parse(data)));
    });
  }

  public async isAuthenticated(): Promise<boolean> {
    const expiresAt = <number>(await this.getStorageVariable('expires_at'));
    let authenticated: boolean = (Date.now() < expiresAt) && !_.isEmpty(this.state.idToken) && !_.isEmpty(this.state.accessToken);
    this.logger.trace({ stack: 'BaseAuthService.isAuthenticated()', authenticated: authenticated  });
    return authenticated;
  }

  private timeout: any;
  private setAccessTokenTimeout(expiresAt: number) {
    if(this.timeout) clearTimeout(this.timeout);
    let ms = expiresAt - Date.now() - 60000;  // MS until expires w/ a 60 sec buffer to refresh access_token
    var that = this;
    if(ms > 60000) {
      this.logger.trace({ stack: 'BaseAuthService.setAccessTokenTimeout()', expiresAt: expiresAt, ms: ms });
      // TODO convert this to RxJS and implement error handling and retry
      this.timeout = setTimeout(() => {
        this.logger.trace({ stack: 'BaseAuthService.setAccessTokenTimeout().setTimeout()' });
        that.loginRefresh();
      }, ms);
    } else {
      // Less than 60 sec until timeout expires (120 until access_token expires), refresh now
      this.loginRefresh();
    }
  }
}
