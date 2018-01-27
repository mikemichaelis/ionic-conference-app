import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {ProfilePage} from "../profile/profile";

@Component({
    selector: 'users',
    templateUrl: 'users.html'
})
export class UsersPage {

    users:any;

    constructor(public navCtrl:NavController) {
        // myService.getAllUsers().subscribe((data) => {
        //     this.users = data;
        //     console.log("what in users ", this.users);
        // });
    }

    openProfile(user) {
        this.navCtrl.push(ProfilePage, {'other': user});
    }

}
