import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the RootPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-root',
  templateUrl: 'root.html',
})
export class RootPage {

  loader: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, private loadingController: LoadingController) {
    // Force shitty IonicStorage to open the SQLite DB
    this.loader = this.loadingController.create({
      content: "Please wait..."
    });

    this.storage.get("profile");
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad RootPage');
    this.loader.present();

  }

  ionViewWillUnload() {
    this.loader.dismiss();
  }
}
