import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, NavParams, ModalController, MenuController, Content } from 'ionic-angular';

import { PostPage } from '../post/post';

import { UsersPage } from "../users/users";
import { NotificationPage } from "../notification/notification";

import { ProfileService } from './profile-service';

@Component({
    selector: 'profile',
    templateUrl: 'profile.html',
    providers: [ FormBuilder ]
})

export class ProfilePage {
  @ViewChild(Content) content: Content;
    public profile: any = {};
    public title;
    public posts;
    public photos;
    public show:any;
    public allowPost: boolean;

    public profileForm: FormGroup;
    public themes: any[];
    public orientations: string[];
    public genders: string[];
    public locales: string[];

    constructor(public navCtrl:NavController, public navParams:NavParams, public modalCtrl:ModalController, public menuCtrl:MenuController,
                public profileService: ProfileService, private formBuilder: FormBuilder) {
        menuCtrl.enable(true);

        this.profileForm = this.formBuilder.group( {
            nickname: [null, Validators.required],
            email: [null, Validators.email],
            locale: [null, Validators.required],
            gender: [null, Validators.required],
            orientation: [null, Validators.required],
            theme: [null, Validators.required],
            push: [null, Validators.required],
            logout: [null, Validators.required]
        });
    }

    ionViewWillEnter() {
        this.profileService.init();

        this.show = "posts";
        if (this.navParams.get('myProfile') !== undefined) {
            //this.profile = navParams.get('myProfile')[0];
            this.title = "My Profile";
            this.allowPost = true;
        } else {
            //this.profile = navParams.get('other');
            this.title = "View Profile";
            this.allowPost = false;
        }

        // TODO remove use of this.profile completely, retrieve data directly from service
        this.profile = {};
        this.profile.id = 5;
        this.profile.username = this.profileService.user.name;
        this.profile.avatar = this.profileService.user.picture_url;
        this.profile.cover = this.profileService.user.background_url;
        this.profile.location = "India";
        this.profile.following = 3;
        this.profile.followers = 3;
        this.profile.posts = 100;
        this.profile.photos = 3;

        this.createProfileForm();

        this.themes = [ {id: 1, name: 'blue'},
                        {id: 2, name: 'pink'}];


        this.orientations = [ "heterosexual", "homosexual"];

        this.genders = [ "female", "male", "ladyboy",
                        "agender (genderless)",
                        "androgyne",
                        "bigender",
                        "genderqueer (non-binary)",
                        "gender bender",
                        "hijra",
                        "pangender",
                        "queer heterosexuality"];

        this.locales = ["en-US", "th-TH", "es-MX"];

        this.profileForm.valueChanges.forEach(
            async (value: string) => {
                if(this.profileForm.valid) {
                    await this.saveProfile()
                };
            }
        );

        // myService.getTimelines().subscribe((data) => {
        //     this.posts = data.timelines;
        //     this.photos = data.photos;
        // });

    }

    private createProfileForm() {
        this.profileForm = this.formBuilder.group( {
            nickname: [this.profileService.user.nickname, Validators.required],
            email: [this.profileService.user.email, Validators.email],
            locale: [this.profileService.user.locale, Validators.required],
            gender: [this.profileService.user.gender, Validators.required],
            orientation: [this.profileService.user.orientation, Validators.required],
            theme: [this.profileService.user.theme_id, Validators.required],
            push: [this.profileService.user.push, Validators.required],
            logout: [this.profileService.user.logout, Validators.required]
        });
            // dob
            // ethnicity
            // total relationships
            // failed relationships

            // Personality

            // Relationships

            // picture_url: string;
            // backgroud_url: string

            // logout
    }

    private async saveProfile() {
        await this.profileService.save(this.profileForm.value);
    }

    ionViewDidLoad() {
    }

    openNotifications(){
        this.navCtrl.push(NotificationPage);
    }

    addPost() {
        let modal = this.modalCtrl.create(PostPage);
        modal.present();
    }

    getFollowing(){
        this.navCtrl.push(UsersPage);
    }

    getFollowers(){
        this.navCtrl.push(UsersPage);
    }
}
