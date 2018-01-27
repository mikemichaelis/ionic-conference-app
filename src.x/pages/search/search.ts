import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'search',
  templateUrl: 'search.html'
})
export class SearchPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    // console.log('Hello SearchPage Page');
  }

  getItems(ev){
    // console.log("search bar is clicked");
  }
}
