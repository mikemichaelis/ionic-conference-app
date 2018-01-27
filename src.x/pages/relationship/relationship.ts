import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, NavParams, ModalController, MenuController, Content } from 'ionic-angular';
import { Relationship, User } from '../../app/core/entities/entity-model';
import { RelationshipService } from './relationship-service';
import { State } from '../../app/core/services/common';
import { RelationshipEditPage } from '../relationshipEdit/relationshipEdit';
import * as Rx from 'rxjs';

@Component({
    selector: 'relationship',
    templateUrl: 'relationship.html',
    providers: [ FormBuilder ]
})

export class RelationshipPage {
  @ViewChild(Content) content: Content;
    public form: FormGroup;
    public user: User;
    public relationship: Relationship;

    public locales: string[];

    // public page: any = RelationshipEditPage;

    private dataEventSubscription: Rx.Subscription;
    private initializedSubscription: Rx.Subscription;

    constructor(public state: State, public navCtrl:NavController, public navParams:NavParams, public modalCtrl:ModalController, public menuCtrl:MenuController,
                public service: RelationshipService, private formBuilder: FormBuilder) {

        this.form = this.formBuilder.group( {
            name: [null, Validators.required],
            picture_url: [null, Validators.required],
            background_url: [null, Validators.required]
        });

        this.locales = ["en-US", "th-TH", "es-MX"];

        this.relationship = this.service.relationship;
        this.user = this.service.user;

        var that = this;
        this.dataEventSubscription = this.service.dataEvent.subscribe((data) => {
            that.user = that.service.user;
            that.relationship = that.service.relationship;

            this.form.reset();
            that.form.setValue({
                name: that.relationship.name,
                picture_url: that.relationship.picture_url,
                background_url: that.relationship.background_url
            });
        });
    }

    // ionViewDidLoad() { console.log('ionViewDidLoad')}
    ionViewWillEnter() {
        this.menuCtrl.enable(true);

        let relationship = this.navParams.get('relationship');

        // I would rather have the service initialize itself from the initialized Subject,
        // but since this page can be destroyed and recreated and the service is not (it stays in the DI container and is always reused)
        // there is nothing to tell the service to serve up its data via the service dataEvent
        // So, I initialize the service from here, which will cause an already initialized service to fire its dataEvent().
        this.initializedSubscription = this.state.initializeEvents.subscribe(async (initialized) => {
            if(initialized) {
                this.service.initialize(relationship);
            }
        });
    }
    // ionViewDidEnter() { console.log('ionViewDidEnter')}
    // ionViewWillLeave() { console.log('ionViewWillLeave')}
    // ionViewDidLeave() { console.log('ionViewDidLeave')}
    ionViewWillUnload() {
        // console.log('ionViewWillUnload');
        this.dataEventSubscription.unsubscribe();
        this.initializedSubscription.unsubscribe();
    }

    relationshipSettings() {
        let create = this.modalCtrl.create(RelationshipEditPage, { relationship: this.relationship });
        create.onDidDismiss((data, role) => {
            if(data) this.service.initialize(this.relationship);
        });
        create.present();
    }

    // private createProfileForm() {

    //     this.form = this.formBuilder.group( {
    //         name: [this.partner.name, Validators.required],
    //         nickname: [this.partner.nickname, Validators.required],
    //         email: [this.partner.email, Validators.email],
    //         locale: [this.partner.locale, Validators.required],

    //     });
    // }

    // private async saveProfile() {
    //     //await this.service.save(this.form.value);
    // }

    // openNotifications(){
    //     //this.navCtrl.push(NotificationPage);
    // }

    // addPost() {
    //     //let modal = this.modalCtrl.create(PostPage);
    //     //modal.present();
    // }

    // getFollowing(){
    //     //this.navCtrl.push(UsersPage);
    // }

    // getFollowers(){
    //     //this.navCtrl.push(UsersPage);
    // }


}
