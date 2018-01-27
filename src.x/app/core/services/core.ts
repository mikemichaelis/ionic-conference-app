import { release } from './../../../globals';
import { SystemEnum } from './../enums/systemEnum';
import { Injectable, Inject, Injector } from '@angular/core';
import { Http } from '@angular/http';
import { Platform, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file';
import { Network } from '@ionic-native/network';
import { Device } from '@ionic-native/device';
import { Firebase } from '@ionic-native/firebase';
import { AppVersion } from '@ionic-native/app-version';
import { Predicate } from 'breeze-client';
import { State, LogService } from './common';
import { IAuthService } from './auth/base.auth.service';
import { EntityManagerProvider, ReflectionshipUnitOfWork } from './common';
import { RelationshipsPage } from '../../../pages/relationships/relationships';
import { LoginPage } from '../../../pages/login/login';
import { HomePage } from '../../../pages/home/home';
import { NetworkEnum } from '../enums/networkEnum';
import { TranslateService } from '@ngx-translate/core';

import Auth0Cordova from '@auth0/cordova';

import * as globals from '../../../globals';
import * as _ from 'lodash-es';

@Injectable()
export class Core {
  // i18n translated strings in dictionary format
  private strings: any;

  private guid: string; // guid of current user

  private uow: ReflectionshipUnitOfWork;

  /*
    TODO

    Establish Push Notifications
    Establish Analytics
    Establish Mode of Operation (free/paid)

  */
  constructor(private state: State, @Inject('AUTH_SERVICE') private auth: IAuthService, private emProvider: EntityManagerProvider, private injector: Injector,
    public platform: Platform, private device: Device, public file: File, public storage: Storage, public logger: LogService, public http: Http,
    public network: Network, public toast: ToastController, public translateService: TranslateService, public firebase: Firebase, public appVersion: AppVersion) {

      this.logger.info({ stack: 'Core.ctor() ---------------------------------------------------------------------------------- '});

      this.attachSystemHandlers();

      this.platform.ready().then(async () => await this.platformReady());
  }

  /**
   * establishUser is used post authentication (login) to retrieve User from service
   */
  public async establishUser(): Promise<boolean> {
    return new Promise<boolean>(async(resolve) => {

      let ext_id: string = this.state.profile.sub;
      let predicate = new Predicate('ext_id', 'eq', ext_id);
      let users = await this.uow.userSet.where(predicate);
      if(users[0]) {
        this.state.user = users[0];
        this.guid = this.state.user.guid;
        await this.uow.import(this.guid);
        this.logger.trace({ stack: 'Core.establishUser()', user: this.state.user !==null });
        resolve(true);
      } else {
        this.state.user = null;
        this.logger.trace({ stack: 'Core.establishUser()', user: this.state.user !== null });
        resolve(false);
      }
    });
  }

  public async logout(clear?: boolean): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
      if(clear) this.storage.remove(this.guid);
      await this.storage.remove('guid');
      await this.auth.logout();
      this.uow.clear();
      this.state.user = null;
      this.logger.trace({ stack: 'Core.logout()', user: this.state.user !== null });
      this.state.navEvents.next( { title: 'Login', component: this.state.loginPage } );
      resolve(true);
    });
  }

  private async platformReady() {
    // It is important that no other classes request ReflectionshipUnitOfWork prior to platform.ready() including Core
    // ReflectionshipUnitOfWork requires EntityManagerProvider which has not been prepared yet

    // Establish deep link open handler used in Auth0 callback after login
    // This function is part of "Set Up Auth0-Cordova"
    (<any>window).handleOpenURL = (url) => {
      // TODO can't log whole url with tokens
      this.logger.trace({ stack: 'Core.platformReady().handleOpenURL()', url: this.stripQueryStringAndHashFromPath(url) });
      Auth0Cordova.onRedirectUri(url);
    };

    _.assignIn(this.state.device, this.device);

    if(!this.state.device.platform) this.state.device.platform = "Browser";
    if(!this.state.device.uuid) this.state.device.uuid = this.uuidv4();
    this.logger.trace({ stack: 'Core.platformReady()', device: this.state.device });

    if(!this.state.browser) {
      this.initFirebase();

      this.appVersion.getVersionNumber().then(num => {
        this.appVersion.getVersionCode().then(code => {
          this.state.version = num + '(' + code +')';
          this.logger.info({ version: this.state.version, api_url: globals.api_url, release: globals.release });
      })});
    }

    this.translateService.get(['system.error-notification']).subscribe(strings => {
      this.logger.trace({ stack: 'Core.platformReady().translateService.get', strings: strings !== null });
      this.strings = strings;
    });

    // I've removed this in favor of device.uuid - uniqueDeviceID requires call permission on phone which is unacceptable
    // TODO remove await - put in a background thread
    // Set ID, then replace with real ID if running on device
    //this.state.uniqueDeviceID = this.uuidv4();
    //await this.uniqueDeviceID.get().then((uuid: any) => this.state.uniqueDeviceID = uuid);

    this.attachPlatformHandlers();

    await new Promise<NetworkEnum>((resolve) => {
      setTimeout(() => {
        this.state.network = <NetworkEnum>this.network.type;
        this.logger.trace({ stack: 'Core.platformReady().Promise().resolve()', network: this.state.network });
        resolve();
      })
    })

    // load application static files
    this.loadStaticData();

    // wait for storage before loading data files
    this.storage.ready().then(async () => {
      this.logger.trace({ stack: 'Core.platformReady().storage().ready()', browser: this.state.browser });
      if(this.state.browser) {
        this.state.online = true;
        this.state.network = NetworkEnum.UNKNOWN;
        this.guid = 'af825a7d-4e9c-4b6b-8e4b-4faf463ccc40';
        // Hack for development in Spa
        // Force login from hard coded refresh token and export data cache
        await this.auth.initialize(globals.refresh_token);

        // load initial dev data
        let query = new Predicate('id', 'eq', 20);
        this.state.user = (await this.uow.userSet.where(query))[0];

        // clear any previously cached data with dev data
        await this.uow.export(this.guid);

        // force use of dev guid
        await this.storage.set('guid', this.guid);
      } else {
        await this.auth.initialize();
      }

      // retrieve last user guid
      this.guid  = await this.storage.get('guid');
      this.logger.trace({ stack: 'Core.platformReady()', guid: this.guid });
      if(this.guid) {
        // a last user exists, load that users persisted data set

        // TODO examine removing await and processing this in the background
        let imported = await this.uow.import(this.guid);
        if(imported) {
          // Retrieve the user from local cache
          let query = new Predicate('guid', 'eq', this.guid);
          this.state.user = this.uow.userSet.whereInCache(query)[0];

          this.state.navEvents.next( { title: 'Home', component: this.state.homePage } );
        } else {
          // nothing imported from existing guid, maybe os deleted?, weird but I'll handle it anyway
          // TODO refresh of entire UoW should happen outside if(imported)
          // network queries need to be performed only when online
          let query = new Predicate('guid', 'eq', this.guid);
          this.state.user = (await this.uow.userSet.where(query))[0];
        }
        this.logger.trace({ stack: 'Core.platformReady().this.state.user', imported: imported });

        //this.state.navEvents.next({component: RelationshipsPage })
        //this.state.navEvents.next({component: LoginPage })
      }
      else {
        // no saved user guid exists - this is a first time run
        this.logger.trace({ stack: 'Core.platformReady()', network: this.state.network });
        if(this.state.network !== NetworkEnum.NONE) {
          this.state.navEvents.next({ title: 'Logout', component: this.state.loginPage });
          // TODO LoginPage will create new user if one does not exist
        } else {
          // error out, first time run must have network!
        }
      }

      this.setOnline();

      this.state.initialized = true;
    });
  }

  private stripQueryStringAndHashFromPath(url) {
    try {
    return url.split("?")[0].split("#")[0];
    } catch (error) {
      this.logger.error({ stack: 'Core.stripQueryStringAndHashFromPath().error()', error: error });
      return "error";
    }
  }

  private attachSystemHandlers(): void {
    this.state.systemEvents.subscribe(async (system) => {
      if(!this.state.initialized) return;
      switch(system.event) {

        case SystemEnum.EXPORT:

          this.exportData();
          break;

        case SystemEnum.CLEAR:
          this.logger.trace({ stack: 'ore.attachSystemhandlers().systemEvents.CLEAR'});
          try {
            this.logout(true);
          } catch (error) {
            this.logger.error({ stack: 'ore.attachSystemhandlers().systemEvents.CLEAR.catch()', error: error })
          }

          this.state.navEvents.next({ title: 'Logout', component: this.state.loginPage });
          break;

        case SystemEnum.ERROR:

          // Restart the UOW

          // In debug lets toast to the user
          if(!globals.release) {
            let toast = this.toast.create( {
              message: this.strings['system.error-notification'],
              duration: 3000,
              position: 'bottom' });
            toast.present();
          }
          break;

        case SystemEnum.RESET:

          break;

        case SystemEnum.USER:
          this.setOnline();
        break;

        case SystemEnum.AUTHENTICATED:
          this.setOnline();
          break;

        case SystemEnum.NETWORK:
          this.setOnline();
          break;

        case SystemEnum.ONLINE:
          //  Start a web worker to sync local cached data with remote data
          //  Start a SignalR web worker for notifications
          break;

          // this.state.onlineEvents.subscribe((online) => {
          //   if(this.state.initialized) this.logger.log({ online: online });

          // TODO update authenticated to be enum reflecting the type of authentication
          // None
          // LoggedIn
          // Refreshed

        default:
          break;
      }
    });
  }

  private attachPlatformHandlers(): void {
    this.platform.pause.asObservable().subscribe(
      (pause) => {
        // persist data
        // console.log('platform.pause (pause)');
        //this.exportData();
      },
      (error) => {
        // bad things
        // console.log('platform.pause (error)');
      },
      () => {
        // maybe this will happen on shutdown
        // console.log('platform.pause (complete)');
      }
    );

    this.platform.resume.asObservable().subscribe(
      (resume) => {
        // persist data
        // console.log('platform.resume (resume)');
      },
      (error) => {
        // bad things
        // console.log('platform.resume (error)');
      },
      () => {
        // maybe this will happen on shutdown
        // console.log('platform.resume (complete)');
      }
    );

    this.platform.backButton.asObservable().subscribe(
      (back) => {
        // persist data
        // console.log('platform.backButton (back)');
      },
      (error) => {
        // bad things
        // console.log('platform.backButton (error)');
      },
      () => {
        // maybe this will happen on shutdown
        // console.log('platform.backButton (complete)');
      }
    );

    // TODO add setTimeout() to call setOnline()?
    this.network.onConnect().subscribe(
      (connect) =>
      {
        if(connect.type == 'online') {
          this.state.network = NetworkEnum.UNKNOWN;
          //this.state.networkEvents.next(NetworkEnum.UNKNOWN);
        }
      },
      (error) =>
      {
        this.state.network = NetworkEnum.NONE;
        //this.state.networkEvents.next(NetworkEnum.NONE);
      },
      () => {}
    );

    this.network.onDisconnect().subscribe(
      (disconnect) =>
      {
        if(disconnect.type == 'offline') {
          this.state.network = NetworkEnum.NONE;
          //this.state.networkEvents.next(NetworkEnum.NONE);
        }
      },
      (error) =>
      {
        this.state.network = NetworkEnum.NONE;
        //this.state.networkEvents.next(NetworkEnum.NONE);
      },
      () => {}
    );
  }

  private async initFirebase() {

    await this.firebase.getToken().then(token => {
      this.logger.trace({ stack: 'Core.platformReady().firebase.getToken()', token: token != null });
      this.state.firebase_token = token;
    }).catch(error => {
      this.logger.error({ stack: 'Core.platformReady().firebase.getToken().catch', error: error });
    })

    // define defaults
    var defaults = {
      natasha: 'hugs :-)'
    }
    await this.firebase.setDefaults(defaults, 'default');

    await this.firebase.setConfigSettings( { developerModeEnabled: true } );

    this.firebase.fetch(globals.firebase_fetch_timeout).then(async (config) => {

      this.firebase.activateFetched().then(reason => {
        this.logger.trace({ stack: 'Core.initFirebase().fetch().activateFetched()', reason: reason });

          this.firebase.getValue('natasha', 'default').then(value => {
          console.log(value);
          }).catch(error => console.error(error));
        this.firebase.getInfo().then (info => {
          this.logger.trace({ stack: 'Core.initFirebase().fetch().activateFetched().getInfo()', info: info });
        }).catch(error => {
          console.error(error);
        });
      })
    }).catch(error => {
      this.logger.error({ stack: 'Core.initFirebase().fetch().catch', error: error });
    });

    this.firebase.hasPermission().then(data => {
        this.logger.trace({ stack: 'Core.initFirebase().hasPermission()', data: data });
    });

    this.firebase.onNotificationOpen().subscribe(next => {
      this.onNotification(next);
    })
  }

  private onNotification(next) {
    console.log(JSON.stringify(next));
  }

  private loadStaticData() {
    this.http.get('assets/metadata/metadata.json').subscribe(
      (response) => {
        this.emProvider.prepare(response.text());

        // ReflectionshipUnitOfWork is retrieved here directly from injector so it is created after Core!
        this.uow = this.injector.get(ReflectionshipUnitOfWork);
      },
      (error) => { console.log(JSON.stringify(error)) }
    );
  }

  /**
   * Online is a combination of Network and Authenticated states
   *
   * To be online must be Authenticated, have network, and user must exist
   */
  private setOnline() {
    this.state.online = this.state.authenticated && this.state.network !== NetworkEnum.NONE && this.state.user !== null;
  }

  private async exportData()  {
    this.logger.trace({ stack: 'Core.exportData()'});
    try {
      if(this.state.user && this.uow) {
        this.storage.set('guid', this.state.user.guid);
        this.uow.export(this.state.user.guid).catch(error => {
          this.logger.error({ stack: 'Core.exportData().export().catch()', error: error })
        })
      }
    } catch (error) {
      this.logger.error({ stack: 'Core.exportData().catch()', error: error })
    }
  }

  private uuidv4(): string {

    // use 4f4f4f4f to indicate a generated uuid (not a device id - meaning running in browser)
    return '4f4f4f4f-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}