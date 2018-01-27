import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams, ModalController, MenuController, LoadingController, ViewController, Platform, ToastController } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { Relationship } from '../../app/core/entities/entity-model';
import { RelationshipEditService } from './relationshipEdit-service';
import { State } from '../../app/core/services/common';
import { TranslateService } from '@ngx-translate/core';
import { REL_TYPES } from '../../providers/constant';
import * as Rx from 'rxjs';

// TODO this causes build errors in magic-ball spec files...???....???
//import { RelationshipPage } from '../relationship/relationship';

@Component({
    selector: 'relationshipEdit',
    templateUrl: 'relationshipEdit.html',
    providers: [ FormBuilder ]
})
export class RelationshipEditPage {
    public strings: any;
    public edit: boolean;

    public form: FormGroup;
    public relationship: Relationship;

    public rel_types: any = ["test", "test2"]

    private dataEventSubscription: Rx.Subscription;
    private initializedSubscription: Rx.Subscription;

    constructor(public state: State, public navCtrl:NavController, public navParams:NavParams, public modalCtrl:ModalController, public menuCtrl:MenuController,
                public service: RelationshipEditService, private formBuilder: FormBuilder, private loadingCtrl: LoadingController, public toastCtrl: ToastController,
                public platform: Platform, public viewCtrl: ViewController, translateService: TranslateService, public httpClient: HttpClient,
                public imagePicker: ImagePicker) {

        this.form = this.formBuilder.group( {
            name: [null, Validators.required],
            type: [null, Validators.required],
            start: [null, Validators.required],
            picture_url: [null, Validators.required],
            background_url: [null, Validators.required],
        });

        this.relationship = this.service.relationship;
        let that = this;
        this.dataEventSubscription = this.service.dataEvent.subscribe((data) => {
            that.relationship = that.service.relationship;

            that.form.reset();
            that.form.setValue({
                name: that.relationship.name,
                type: that.relationship.type,
                start: that.getIonicDateTime(that.relationship.start),
                picture_url: that.relationship.picture_url,
                background_url: that.relationship.background_url
            });
        });

        translateService.get(['relationship-edit.created', 'relationship-edit.saved',
        'relationship-types.DATING', 'relationship-types.XXX', 'relationship-types.FLIRT',
        'relationship-types.FRIEND', 'relationship-types.LOVER', 'relationship-types.MARRIAGE',
        'relationship-types.PLATONIC', 'relationship-types.ROMANTIC', 'relationship-types.SELF', 'relationship-types.SEXUAL'
    ]).subscribe(strings => {
            this.strings = strings;
        });

        this.httpClient.get(REL_TYPES).subscribe(data =>
            this.rel_types = data
        );
    }

    public getRelationshipType(type: string): string{
        return this.strings['relationship-types.' + type];
    }

    ionViewWillEnter() {
        this.menuCtrl.enable(false);

        let relationship = this.navParams.get('relationship');
        this.edit = relationship;

        this.initializedSubscription = this.state.initializeEvents.subscribe(async (initialized) => {
            if(initialized) {
                this.service.initialize(relationship);
            }
        });
    }

    ionViewWillUnload() {
        this.dataEventSubscription.unsubscribe();
        this.initializedSubscription.unsubscribe();
    }

    selectImage(type: string) {
        this.imagePicker.getPictures({maximumImagesCount: 1}).then((results) => {
            for (var i = 0; i < results.length; i++) {
                console.log('Image URI: ' + results[i]);
            }
          }, (err) => { });
    }

    save() {
        let loader = this.loadingCtrl.create({
            content: "Saving..."
          });
        loader.present();

        this.relationship.name = this.form.value.name;
        this.relationship.type = this.form.value.type;
        this.relationship.start = this.setIonicDateTime(this.form.value.start);
        this.relationship.picture_url = this.form.value.picture_url;
        this.relationship.background_url = this.form.value.background_url;

        this.service.save(this.relationship).then(success => {
            loader.dismiss();
            if(success) {
                this.viewCtrl.dismiss(success);
                let toast = this.toastCtrl.create( {
                    message: this.edit ? this.strings['relationship-edit.saved'] : this.strings['relationship-edit.created'],
                    duration: 3000,
                    position: 'bottom' });
                  toast.present();
            }
        });
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    setIonicDateTime(value: string): Date {
        if (value) {
            let date: Date = new Date(value);
            let ionicDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds());
            return ionicDate;
        }
        return null;
    }
    getIonicDateTime(value: Date): string {
        if (value) {
            let date: Date = new Date(value);
            let ionicDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
            return ionicDate.toISOString();
        }
        return null;
    }
}
