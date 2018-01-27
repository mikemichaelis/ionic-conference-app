import { Component, Inject, Injector } from '@angular/core';
import { NavController, MenuController, ModalController, LoadingController } from 'ionic-angular';
import { ICON, GOOGLE, FACEBOOK } from '../../providers/constant';
import { Core } from '../../app/core/services/common';
import { IAuthService } from '../../app/core/services/auth/base.auth.service';
import { State } from '../../app/core/services/state-service';
import { TranslateService } from '@ngx-translate/core';
import { SystemEnum } from '../../app/core/enums/systemEnum';

@Component({
    selector: 'login',
    templateUrl: 'login.html'
})
export class LoginPage {
    mobile: boolean;
    icon:any;
    facebook:any;
    google:any;
    myIcon: boolean;

    private core: Core;
    private state: State;

    constructor(private injector: Injector, @Inject('AUTH_SERVICE') public auth: IAuthService, public navCtrl:NavController, public menuCtrl:MenuController,
        public modalCtrl: ModalController, translate: TranslateService, private loadingCtrl: LoadingController) {

        this.core = this.injector.get(Core);
        this.state = this.injector.get(State);

        this.mobile = !this.state.browser;
        this.icon = ICON;
        this.google = GOOGLE;
        this.facebook = FACEBOOK;
        menuCtrl.enable(false);
    }

    ionViewDidEnter(){
        this.myIcon = true;
    }

    async signIn() {
        let loader = this.loadingCtrl.create({
            content: "Logging in....."
        });
        loader.present();
        if(await this.auth.login() ) {
            if(await this.core.establishUser()) {
                this.state.systemEventsSend({ event: SystemEnum.EXPORT, state: true });
                this.state.navEvents.next( { title: 'Home', component: this.state.homePage } )
            } else {
                //TODO redirect to notify user of login failure
                this.state.systemEventsSend({ event: SystemEnum.CLEAR, state: true });
                this.state.navEvents.next( { title: 'Logout', component: this.state.loginPage } )
            }
        }
        else {
            //TODO redirect to notify user of login failure
            this.state.systemEventsSend({ event: SystemEnum.CLEAR, state: true });
            this.state.navEvents.next( { title: 'Logout', component: this.state.loginPage } )
        }
        loader.dismiss();
    }

    register() {
        this.myIcon = false;
    }

}
