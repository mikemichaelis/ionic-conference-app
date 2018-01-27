import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavController, NavParams, ModalController, MenuController, Content } from 'ionic-angular';
import { Relationship } from '../../app/core/entities/entity-model';
import { RelationshipsService } from './relationships-service';
import { State } from '../../app/core/services/common';
import { RelationshipPage } from '../relationship/relationship';
import { RelationshipEditPage } from '../relationshipEdit/relationshipEdit';
import * as Rx from 'rxjs';

@Component({
    selector: 'relationships',
    templateUrl: 'relationships.html',
    providers: [ FormBuilder ]
})

export class RelationshipsPage {
  @ViewChild(Content) content: Content;
    public relationships: Relationship[] = [];

    private dataEventSubscription: Rx.Subscription;
    private initializedSubscription: Rx.Subscription;

    constructor(public state: State, public navCtrl:NavController, public navParams:NavParams, public modalCtrl:ModalController, public menuCtrl:MenuController,
                public service: RelationshipsService) {

        this.relationships = this.service.relationships;

        var that = this;;
        this.dataEventSubscription = this.service.dataEvent.subscribe((data) => {
            that.relationships = that.service.relationships;
        });
    }

    // ionViewDidLoad() { console.log('ionViewDidLoad')}
    ionViewWillEnter() {
        // console.log('ionViewWillEnter');
        this.menuCtrl.enable(false);
        // I would rather have the service initialize itself from the initialized Subject,
        // but since this page can be destroyed and recreated and the service is not (it stays in the DI container and is always reused)
        // there is nothing to tell the service to serve up its data via the service dataEvent
        // So, I initialize the service from here, which will cause an already initialized service to fire its dataEvent().
        this.initializedSubscription = this.state.initializeEvents.subscribe(async (initialized) => {
            if(initialized) {
                this.service.initialize();
            }
        });
    }
    // ionViewDidEnter() { console.log('ionViewDidEnter') }
    // ionViewWillLeave() { console.log('ionViewWillLeave') }
    // ionViewDidLeave() { console.log('ionViewDidLeave') }
    ionViewWillUnload() {
        // console.log('ionViewWillUnload');
        this.dataEventSubscription.unsubscribe();
        this.initializedSubscription.unsubscribe();
    }

    addRelationship() {
        let create = this.modalCtrl.create(RelationshipEditPage)
        create.onDidDismiss((data, role) => {
            if(data) this.service.initialize();
        });
        create.present();
    }

    relationshipSelect(relationship: Relationship) {
        //this.navCtrl.pop(); // pop this page off the stack
        this.state.navEvents.next({ component: RelationshipPage, params: { relationship: relationship } });
    }

    relationshipTimeline(relationship: Relationship) {
        // console.log('timeline: ' + relationship.name);
    }

    relationshipChat(relationship: Relationship) {
        // console.log('chat: ' + relationship.name);
    }

    relationshipStats(relationship: Relationship) {
        // console.log('stats: ' + relationship.name);
    }

    relationshipSettings(relationship: Relationship) {
        let create = this.modalCtrl.create(RelationshipEditPage, { relationship: relationship });
        create.onDidDismiss((data, role) => {
            //if(data) this.service.initialize();
        });
        create.present();
    }

    relationshipFavorite(relationship: Relationship) {
        // console.log('favourite: ' + relationship.name);
    }
}
