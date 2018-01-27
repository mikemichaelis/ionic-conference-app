import { Component, Inject, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { RootPage } from '../pages/root/root';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { RelationshipsPage } from '../pages/relationships/relationships';
import { SettingsPage } from '../pages/settings/settings';
import { NotificationPage } from '../pages/notification/notification';
import { TimelinePage } from '../pages/timeline/timeline';
import { ICON } from '../providers/constant';
import { TranslateService } from '@ngx-translate/core';
import { IAuthService } from './core/services/auth/base.auth.service';
import { Core, State, ImageService, LogService } from './core/services/common';
import { SystemEnum } from './core/enums/systemEnum';

@Component({
  templateUrl: 'reflectionship.html'
})

export class Reflectionship {
  @ViewChild(Nav) nav: Nav;
  public rootPage: any = RootPage;
  public pages: any;
  public icon: any;

  constructor(private core: Core, private state: State, @Inject('AUTH_SERVICE') public auth: IAuthService, public platform: Platform,
   public statusBar: StatusBar, public splashScreen: SplashScreen, public translateService: TranslateService, public imageService: ImageService, public logger: LogService,
   private changeDetectorRef: ChangeDetectorRef )
  {
    // stop tslint from complaining we are not using core
    // core is simply passed into the constructor here to force Angular DI to instantiate it before anything else

    translateService.setDefaultLang('en');
    translateService.use('en');

    platform.ready().then(async () => {
      this.logger.trace({ stack: 'Reflectionship.ctor().platform.ready()' });
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.icon = ICON;

    try {
      // TODO it is too early to build the menu here as we need the users account to determine available features
      translateService.get(['menu.home', 'menu.timeline', 'menu.profile', 'menu.relationships', 'menu.notifications', 'menu.settings', 'menu.logout']).subscribe(strings => {
        this.logger.trace({ stack: 'Reflectionship.ctor().translateService.get()', strings: strings !== null });
        this.pages = [
          { title: strings['menu.home'], icon:"person", component: HomePage },
          { title: strings['menu.timeline'], icon:"paper", component: TimelinePage },
          { title: strings['menu.profile'], icon:"person", component: ProfilePage } ];

        this.pages = [...this.pages,
          { title: strings['menu.relationships'], icon:"person", component: RelationshipsPage },
          { title: strings['menu.notifications'], icon:"notifications", component: NotificationPage, badge: 10 },
          { title: strings['menu.settings'], icon:"settings", component: SettingsPage },
          { title: strings['menu.logout'], icon:"log-out", component: LoginPage }
        ];
      });
    } catch (error) {
      this.logger.error({ stack: 'Reflectionship.ctor().translateService.get().catch()', error: error });
    }

    // TODO WTF is this doing...it's the only handler for SystemEnum.USER........
    this.state.systemEvents.subscribe((system) => {
      switch(system.event) {
        case SystemEnum.USER:
          this.logger.trace({ stack: 'Reflectionship.ctor().systemEvents', event: system.event, state: system.state });
          this.changeDetectorRef.markForCheck();
          break;
        default:
          break;
      }
    })

    this.state.navEvents.subscribe(
      page => {
        this.logger.trace({ stack: 'Reflectionship.ctor().navEvents', page: page.title });
        this.openPage(page)
      });
  }

  async openPage(page: any) {
    switch(page.title) {
      case 'Logout': {
        await this.core.logout();
        // TODO use local Home/LoginPage or use passed page.component?  clean this up.
        this.nav.setRoot(LoginPage, page.params);
        break;
      }
      case 'Home': {
        this.nav.setRoot(HomePage, page.params);
        break;
      }
      default: {
        this.nav.push(page.component, page.params);
        break;
      }
    }
  }

  ngAfterViewInit() {
    // TODO don't set root here, core should set the root
    this.rootPage = LoginPage
  }
}
