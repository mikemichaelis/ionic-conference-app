import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
    selector: 'timeline-content',
    templateUrl: 'timeline-content.html'
})
export class TimelineContentPage {

    timeline:any;
    scrollLocation: any;

    constructor(public navCtrl:NavController, public navParams:NavParams) {
        this.timeline = navParams.get('timeline');
    }

    ionViewDidLoad() {

    }

    like(timeline) {
        if ((timeline.liked == false) || (timeline.liked == undefined)) {
            timeline.liked = true;
            //code for adding liked post to server
        } else {
            timeline.liked = false;
        }
    }

}
