import {Component, Input} from '@angular/core';
import {NavController} from 'ionic-angular';
import {TimelineContentPage} from "../../pages/timeline-content/timeline-content";

@Component({
    selector: 'my-timeline',
    templateUrl: 'timeline-component.html'
})
export class TimelineComponent {

    @Input() data;

    constructor(public navCtrl: NavController) {
       
    }

    like(timeline) {
        if ((timeline.liked == false) || (timeline.liked == undefined)) {
            timeline.liked = true;
            //code for adding liked post to server
        } else {
            timeline.liked = false;
        }
    }

    moreDetails(timeline, scrollToArea) {
        this.navCtrl.push(TimelineContentPage, {'timeline': timeline});
    }

}
