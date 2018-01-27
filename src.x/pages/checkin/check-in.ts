import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, MenuController, Content, AlertController } from 'ionic-angular';
import { ReflectionshipUnitOfWork } from '../../app/core/services/reflectionship-unit-of-work';

@Component({
  selector: 'check-in',
  templateUrl: 'check-in.html'
})
export class CheckInPage {
  @ViewChild('content') content:Content;

  checkInForm: FormGroup;

  constructor(public navCtrl: NavController, public menuCtrl: MenuController, private formBuilder: FormBuilder, public uow: ReflectionshipUnitOfWork,
              public alertCtrl: AlertController) {
    menuCtrl.enable(true);

    // how was your day 1-10
    // how to you feel emotionally 1-10
    //

    this.checkInForm = this.formBuilder.group( {
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

  async ngOnInit() {
  }

  public async onComplete(): Promise<void> {
      await this.save();
      this.navCtrl.pop();
  }

  private async save() {
    //let now = Date.now();

    //let day: Day = await this.uow.dayFactory.create({ 'note': '', 'relationship_id': 1} );
    //let session: Session = await this.uow.sessionFactory.create( { 'test_id': 1, 'relationship_id': 1, 'Day': day });

    //await this.uow.commit();
  }
}
