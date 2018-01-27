import { NgModule, ErrorHandler, InjectionToken } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IAuthService } from './core/services/auth/base.auth.service';
import { MobileAuthService } from './core/services/auth/mobile-auth.service';
export const AUTH_SERVICE = new InjectionToken<IAuthService>('AUTH_SERVICE');

import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { BreezeBridgeAngularModule } from 'breeze-bridge-angular'
import { IonicStorageModule } from '@ionic/storage';

import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { Reflectionship } from './reflectionship';
import { RootPage } from '../pages/root/root';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { NotificationPage } from '../pages/notification/notification';
import { PostPage } from '../pages/post/post';
import { RelationshipsPage } from '../pages/relationships/relationships';
import { RelationshipEditPage } from '../pages/relationshipEdit/relationshipEdit';
import { RelationshipPage } from '../pages/relationship/relationship';
import { ProfilePage } from '../pages/profile/profile';
import { SearchPage } from '../pages/search/search'
import { SettingsPage } from '../pages/settings/settings';
import { TimelinePage } from '../pages/timeline/timeline';
import { TimelineContentPage } from '../pages/timeline-content/timeline-content';
import { UsersPage } from '../pages/users/users';
import { SignupPage } from '../pages/signup/signup';
import { CsiPage } from '../pages/test-pages/csi/csi';

import { ElasticProfile } from '../components/elastic-profile/elastic-profile';
import { TimelineComponent } from '../components/timeline-component/timeline-component';
import { LoadingComponent } from '../components/loading/loading-component';

import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { Device } from '@ionic-native/device';
import { Geolocation } from '@ionic-native/geolocation';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { File } from '@ionic-native/file';
import { Network } from '@ionic-native/network';
import { Firebase } from '@ionic-native/firebase';
import { AppVersion } from '@ionic-native/app-version';
import { ImagePicker } from '@ionic-native/image-picker';

import { EntityManagerProvider, ReflectionshipUnitOfWork, UnitOfWork,
         LogService, ImageService, Core, State} from './core/services/common';

import { LoginService } from '../pages/login/login-service';
import { ProfileService } from '../pages/profile/profile-service';
import { RelationshipsService } from '../pages/relationships/relationships-service';
import { RelationshipEditService } from '../pages/relationshipEdit/relationshipEdit-service';
import { RelationshipService } from '../pages/relationship/relationship-service';

import { NvD3Module } from 'ng2-nvd3';

// Factory Method for AuthHttp.
export function getAuthHttp(http: Http, state: State) {
  return new AuthHttp(new AuthConfig({
        headerPrefix: 'Bearer',
        noJwtError: true,
        globalHeaders: [{'Accept': 'application/json'}],
        tokenGetter: (() => {
            return state.accessToken;
        }),
  }), http);
};

// AoT requires an exported function for factories
export function TranslateHttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

@NgModule({
    declarations: [
        Reflectionship,
        RootPage,
        LoginPage,
        HomePage,
        NotificationPage,
        PostPage,
        ProfilePage,
        RelationshipsPage,
        RelationshipEditPage,
        RelationshipPage,
        SearchPage,
        SettingsPage,
        TimelinePage,
        TimelineContentPage,
        UsersPage,
        SignupPage,
        CsiPage,
        ElasticProfile,
        TimelineComponent,
        LoadingComponent
    ],
    imports: [
        IonicModule.forRoot(Reflectionship, {
            scrollAssist: false
        }),
        IonicStorageModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: TranslateHttpLoaderFactory,
                deps: [Http]
            }
        }),
        ReactiveFormsModule,
        BreezeBridgeAngularModule,
        BrowserModule,
        HttpModule,
        HttpClientModule,
        NvD3Module
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        Reflectionship,
        RootPage,
        LoginPage,
        SignupPage,
        HomePage,
        NotificationPage,
        PostPage,
        RelationshipsPage,
        RelationshipEditPage,
        RelationshipPage,
        ProfilePage,
        SearchPage,
        SettingsPage,
        TimelinePage,
        TimelineContentPage,
        UsersPage,
        CsiPage
    ],
  providers: [
    UniqueDeviceID,
    Device,
    Geolocation,
    File,
    StatusBar,
    SplashScreen,
    Keyboard,
    Network,
    Firebase,
    AppVersion,
    ImagePicker,
    { provide: 'AUTH_SERVICE', useClass: MobileAuthService },
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: AuthHttp, useFactory: getAuthHttp, deps: [Http, State] },
    Core,
    EntityManagerProvider,
    ReflectionshipUnitOfWork,
    UnitOfWork,
    State,
    LogService,
    ImageService,
    LoginService,
    ProfileService,
    RelationshipsService,
    RelationshipEditService,
    RelationshipService
  ]
})
export class AppModule {
    constructor() {
    }
}
