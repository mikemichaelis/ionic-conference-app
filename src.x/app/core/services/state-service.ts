import { Injectable } from '@angular/core';
import { User } from '../entities/entity-model';
import { NetworkEnum } from '../enums/networkEnum';
import { SystemEnum } from '../enums/systemEnum';
import { SystemEvent } from '../classes/system-event';
import { HomePage } from '../../../pages/home/home';
import { LoginPage } from '../../../pages/login/login';

import * as _ from 'lodash-es';
import * as Rx from 'rxjs';

@Injectable()
export class State {

    public version: string;
    public device: any = {};
    public firebase_token: any;

    public trace: boolean = true;

    public loginPage: any = LoginPage;
    public homePage: any = HomePage;

    /**
     * Used to determine if execution is within a browser or device
     */
    get browser(): boolean {
        return this.device.platform === null || this.device.platform === 'Browser';
    }

    /**
     * Indicates if system has been properly initialized.
     */
    private _initialized: boolean = false;
    get initialized(): boolean {
        return this._initialized;
    }
    set initialized(value: boolean) {
        if(value === this._initialized) return;
        this._initialized = value;
        this.initializeEvents.next(this._initialized);
    }

    private _language: string = 'en';
    get language(): string {
        return this._language;
    }
    set language(value: string) {
        if(value === this._language) return;
        this._language = value;
        this.languageEvents.next(this._language);
    }

    /**
     * current user
     *
     * PRODUCER - Core will set this value from within establishUser() after authentication has been performed
     */
    private _user: User = null;
    get user(): User {
        return this._user;
    }
    set user(value: User) {
        if(value === this._user) return;
        this._user = value;
        this.systemEvents.next({ event: SystemEnum.USER, state: this._user !== null });
    }

    /**
     * online is a combination of network and authenticated states indicating if authorized communication with server is possible at a give time.
     *
     * PRODUCER - Core will watch both network and authenticated system events and set online appropriately
     */
    private _online: boolean = false;
    get online(): boolean {
        return this._online;
    }
    set online(value: boolean) {
        if(value === this._online) return;
        // TODO actually try to ping the server before announcing we are online to cut own on
        // bouncing around on a bad network connection and possibly crashing from overlapping network calls
        // maybe we should have 5 consecutive successful pings before announcing online
        this._online = value;
        // NOTE this is debounced in doNetworkEvents, which is the parent call to setting online
        this.systemEvents.next({ event: SystemEnum.ONLINE, state: this._online });
    }

    private _network: NetworkEnum = NetworkEnum.NONE;
    get network(): NetworkEnum {
        return this._network;
    }
    set network(value: NetworkEnum) {
        if(value === this._network) return;
        this._network = value;
        this.doNetworkEvent(this._network);
    }

    private _authenticated: boolean = false;
    get authenticated(): boolean {
        return this._authenticated;
    }
    set authenticated(value: boolean) {
        if(value === this._authenticated) return;
        this._authenticated = value;
        this.systemEvents.next({ event: SystemEnum.AUTHENTICATED, state: this._authenticated })
    }

    public accessToken: string;
    public idToken: string;
    public profile: any;

    public navEvents: Rx.Subject<any> = new Rx.Subject<any>();
    public initializeEvents: Rx.BehaviorSubject<boolean> = new Rx.BehaviorSubject<boolean>(false);
    public languageEvents: Rx.BehaviorSubject<string> = new Rx.BehaviorSubject<string>(this._language);
    //public onlineEvents: Rx.BehaviorSubject<boolean> = new Rx.BehaviorSubject<boolean>(false);
    //public networkEvents: Rx.BehaviorSubject<NetworkEnum> = new Rx.BehaviorSubject<NetworkEnum>(NetworkEnum.NONE);
    //public authenticatedEvents: Rx.BehaviorSubject<boolean> = new Rx.BehaviorSubject<boolean>(false);
    public systemEvents: Rx.Subject<SystemEvent> = new Rx.Subject<SystemEvent>();
    public systemEventsSend(system: SystemEvent) {
        //this.logger.error({ stack: 'State.systemEventsSend()', event: system.event, state: system.state});
        this.systemEvents.next(system);
    }

    // Used to debounce network state changes
    private doNetworkEvent: any;

    constructor() {
        // TODO this debounce should align with the HTTP timeout
        this.doNetworkEvent = _.debounce((state) => {
            this.systemEvents.next({ event: SystemEnum.NETWORK, state: this._network });
        }, 1000*10, { leading: true, trailing: true });

    }
}