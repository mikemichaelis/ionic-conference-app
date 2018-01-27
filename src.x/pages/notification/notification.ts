import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';


@Component({
    selector: 'notification',
    templateUrl: 'notification.html'
})
export class NotificationPage {

    notifications:any;

    constructor(public navCtrl:NavController) {
    }

}
