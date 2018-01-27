import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'post',
  templateUrl: 'post.html'
})

export class PostPage {

  constructor(public viewCtrl: ViewController) {}

  ionViewDidLoad() {

  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  post(){
    this.viewCtrl.dismiss();
  }

}
