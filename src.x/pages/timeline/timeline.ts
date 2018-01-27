import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

// import { SearchPage } from "../search/search";
// import { ProfilePage } from '../profile/profile';

import { ToastController } from 'ionic-angular';

import { NotificationPage } from "../notification/notification";

//import { config, EntityManager, EntityQuery } from 'breeze-client';

import { AuthHttp } from 'angular2-jwt';
//import { AjaxAngularAdapter } from 'breeze-bridge-angular';

//import { Storage } from '@ionic/storage';
//import { UniqueDeviceID } from '@ionic-native/unique-device-id';

import { ReflectionshipUnitOfWork, ImageService } from '../../app/core/services/common';

@Component({
  selector: 'timeline',
  templateUrl: 'timeline.html'
})
export class TimelinePage {

  public timelines:any;

  //private data: any;

  constructor(public authHttp: AuthHttp, public navCtrl: NavController, public menuCtrl: MenuController,
    public uow: ReflectionshipUnitOfWork, public imageService: ImageService,
    private toastController: ToastController) {
    menuCtrl.enable(true);
    // myService.getTimelines().subscribe((data) => {
    //   this.timelines = data.timelines;
    // })

    // var serviceName = 'http://192.168.1.10/reflectionship-api/breeze/Reflectionship'; // route to the Web Api controller
    // var manager = new EntityManager(serviceName);

    // var query = EntityQuery.from("TestSet");

    // config.registerAdapter('ajax', () => new AjaxAngularAdapter(<any>this.authHttp));
    // config.initializeAdapterInstance('ajax', AjaxAngularAdapter.adapterName, true);

    // manager.executeQuery(query).then(data => {
    //     this.data = data;
    //   }).catch();
  }

  async ngOnInit() {
    // this.data = await this.uow.testEntities.all();
    // console.log(this.data);
  }

  openNotifications(){
    this.navCtrl.push(NotificationPage);
  }

  search(){
    let toast = this.toastController.create({
      message: 'User was added successfully',
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      // console.log('Dismissed toast');
    });

    toast.present();
  }

  viewMyProfile(){
    // this.myService.getMyProfile().subscribe((data) => {
    //   this.navCtrl.push(ProfilePage, {'myProfile': data})
    // });
  }
}
