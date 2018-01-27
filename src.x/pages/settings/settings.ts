import { SystemEnum } from './../../app/core/enums/systemEnum';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { State } from '../../app/core/services/state-service';

@Component({
  selector: 'settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(public state: State, public navCtrl: NavController) {}

  ionViewDidLoad() {
    // console.log('Hello SettingsPage Page');
  }

  public clearData() {
    this.state.systemEvents.next({ event: SystemEnum.CLEAR, state: true });
  }
}
