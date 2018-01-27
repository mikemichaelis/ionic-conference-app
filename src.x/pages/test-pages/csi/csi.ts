// import { AnswerFactory } from './../../../app/core/services/reflectionship-unit-of-work';
import { Component, ViewChild } from '@angular/core';
import { NavController, MenuController, Content, AlertController } from 'ionic-angular';

// import { SearchPage } from "../../search/search";
// import { ProfilePage } from '../../profile/profile';

// import { NotificationPage } from "../../notification/notification";

// import { config, EntityManager, EntityQuery } from 'breeze-client';

// import { AuthHttp } from 'angular2-jwt';
// import { AjaxAngularAdapter } from 'breeze-bridge-angular';

// import { Storage } from '@ionic/storage';
// import { UniqueDeviceID } from '@ionic-native/unique-device-id';

import { ReflectionshipUnitOfWork } from '../../../app/core/services/reflectionship-unit-of-work';
import { Day, Session } from '../../../app/core/entities/entity-model';

import * as _ from 'lodash';

@Component({
  selector: 'csi',
  templateUrl: 'csi.html'
})
export class CsiPage {
  @ViewChild('content') content:Content;
  public questions: any[];
  public answers: any[]; // FormGroup;

  constructor(public navCtrl: NavController, public menuCtrl: MenuController,  public uow: ReflectionshipUnitOfWork,
              public alertCtrl: AlertController) {
    menuCtrl.enable(true);

    this.answers = [null, null, null, null, null,
                    null, null, null, null, null,
                    null, null, null, null, null,
                    null, null, null, null, null,
                    null, null, null, null, null,
                    null, null, null, null, null,
                    null, null];

    this.questions = [
      {
        "type": "button",
        "title": "Question 1",
        "text": "Please indicate the degree of happiness, all things considered, of your relationship.",
        "answers": [ "Extremely Unhappy", "Fairly Unhappy", "A Little Unhappy", "Happy", "Very Happy", "Extremely Happy", "Perfect" ],
        "values": [ 0, 1, 2, 3, 4, 5 ]
      },
      {
        "type": "text",
        "title": "Instructions 2 - 4",
        "text": "Most people have disagreements in their relationships. Please indicate the approximate extent of agreement or disagreement between you and your partner for questions 2 through 4.",
        "answers": [ "Always Agree", "Almost Always Agree", "Occasionally Disagree", "Frequently Disagree", "AlmostAlways Disagree", "Always Disagree" ],
        "values": [ 5, 4, 3, 2, 1, 0 ]
      },
      {
        "type": "button",
        "title": "Question 2",
        "text": "Amount of time spent together",
        "answers": [ "Always Agree", "Almost Always Agree", "Occasionally Disagree", "Frequently Disagree", "AlmostAlways Disagree", "Always Disagree" ],
        "values": [ 5, 4, 3, 2, 1, 0 ]
      },
      {
        "type": "button",
        "title": "Question 3",
        "text": "Making major decisions",
        "answers": [ "Always Agree", "Almost Always Agree", "Occasionally Disagree", "Frequently Disagree", "AlmostAlways Disagree", "Always Disagree" ],
        "values": [ 5, 4, 3, 2, 1, 0 ]
      },
      {
        "type": "button",
        "title": "Question 4",
        "text": "Demonstrations of affection",
        "answers": [ "Always Agree", "Almost Always Agree", "Occasionally Disagree", "Frequently Disagree", "AlmostAlways Disagree", "Always Disagree" ],
        "values": [ 5, 4, 3, 2, 1, 0 ]
      },
      {
        "type": "button",
        "title": "Question 5",
        "text": "In general, how often do you think that things between you and your partner are going well?",
        "answers": [ "All the Time", "Most of the Time", "More often than Not", "Occasionally", "Rarely", "Never" ],
        "values": [ 5, 4, 3, 2, 1, 0 ]
      },
      {
        "type": "button",
        "title": "Question 6",
        "text": "How often do you wish you hadn’t gotten into this relationship?",
        "answers": [ "All the Time", "Most of the Time", "More often than Not", "Occasionally", "Rarely", "Never" ],
        "values": [ 0, 1, 2, 3, 4, 5 ]
      },
      {
        "type": "button",
        "title": "Question 7",
        "text": "I still feel a strong connection with my partner.",
        "answers": [ "Not at all True", "A little True", "Somewhat True", "Mostly True", "Almost Completely True", "Completely True" ],
        "values": [ 0, 1, 2, 3, 4, 5 ]
      },
      {
        "type": "button",
        "title": "Question 8",
        "text": "If I had my life to live over, I would marry (or live with/date) the same person",
        "answers": [ "Not at all True", "A little True", "Somewhat True", "Mostly True", "Almost Completely True", "Completely True" ],
        "values": [ 0, 1, 2, 3, 4, 5 ]
      },
      {
        "type": "button",
        "title": "Question 9",
        "text": "Our relationship is strong",
        "answers": [ "Not at all True", "A little True", "Somewhat True", "Mostly True", "Almost Completely True", "Completely True" ],
        "values": [ 0, 1, 2, 3, 4, 5 ]
      },
      {
        "type": "button",
        "title": "Question 10",
        "text": "I sometimes wonder if there is someone else out there for me",
        "answers": [ "Not at all True", "A little True", "Somewhat True", "Mostly True", "Almost Completely True", "Completely True" ],
        "values": [ 5, 4, 3, 2, 1, 0 ]
      },
      {
        "type": "button",
        "title": "Question 11",
        "text": "My relationship with my partner makes me happy",
        "answers": [ "Not at all True", "A little True", "Somewhat True", "Mostly True", "Almost Completely True", "Completely True" ],
        "values": [ 0, 1, 2, 3, 4, 5 ]
      },
      {
        "type": "button",
        "title": "Question 12",
        "text": "I have a warm and comfortable relationship with my partner",
        "answers": [ "Not at all True", "A little True", "Somewhat True", "Mostly True", "Almost Completely True", "Completely True" ],
        "values": [ 0, 1, 2, 3, 4, 5 ]
      },
      {
        "type": "button",
        "title": "Question 13",
        "text": "I can’t imagine ending my relationship with my partner",
        "answers": [ "Not at all True", "A little True", "Somewhat True", "Mostly True", "Almost Completely True", "Completely True" ],
        "values": [ 0, 1, 2, 3, 4, 5 ]
      },
      {
        "type": "button",
        "title": "Question 14",
        "text": "I feel that I can confide in my partner about virtually anything",
        "answers": [ "Not at all True", "A little True", "Somewhat True", "Mostly True", "Almost Completely True", "Completely True" ],
        "values": [ 0, 1, 2, 3, 4, 5 ]
      },
      {
        "type": "button",
        "title": "Question 15",
        "text": "I have had second thoughts about this relationship recently",
        "answers": [ "Completely True", "Almost Completely True", "Mostly True", "Somewhat True", "A little True", "Not at all True" ],
        "values": [ 5, 4, 3, 2, 1, 0 ]
      },
      {
        "type": "button",
        "title": "Question 16",
        "text": "For me, my partner is the perfect romantic partner",
        "answers": [ "Not at all True", "A little True", "Somewhat True", "Mostly True", "Almost Completely True", "Completely True" ],
        "values": [ 0, 1, 2, 3, 4, 5 ]
      },
      {
        "type": "button",
        "title": "Question 17",
        "text": "I really feel like part of a team with my partner",
        "answers": [ "Not at all True", "A little True", "Somewhat True", "Mostly True", "Almost Completely True", "Completely True" ],
        "values": [ 0, 1, 2, 3, 4, 5 ]
      },
      {
        "type": "button",
        "title": "Question 18",
        "text": "I cannot imagine another person making me as happy as my partner does",
        "answers": [ "Not at all True", "A little True", "Somewhat True", "Mostly True", "Almost Completely True", "Completely True" ],
        "values": [ 0, 1, 2, 3, 4, 5 ]
      },
      {
        "type": "button",
        "title": "Question 19",
        "text": "How rewarding is your relationship with your partner?",
        "answers": [ "Not at All", "A little", "Somewhat", "Mostly", "Almost completely", "Completely" ],
        "values": [ 0, 1, 2, 3, 4, 5 ]
      },
      {
        "type": "button",
        "title": "Question 20",
        "text": "How well does your partner meet your needs?",
        "answers": [ "Not at All", "A little", "Somewhat", "Mostly", "Almost completely", "Completely" ],
        "values": [ 0, 1, 2, 3, 4, 5 ]
      },
      {
        "type": "button",
        "title": "Question 21",
        "text": " To what extent has your relationship met your original expectations?",
        "answers": [ "Not at All", "A little", "Somewhat", "Mostly", "Almost completely", "Completely" ],
        "values": [ 0, 1, 2, 3, 4, 5 ]
      },
      {
        "type": "button",
        "title": "Question 22",
        "text": "In general, how satisfied are you with your relationship?",
        "answers": [ "Not at All", "A little", "Somewhat", "Mostly", "Almost completely", "Completely" ],
        "values": [ 0, 1, 2, 3, 4, 5 ]
      },
      {
        "type": "slider",
        "title": "Question 23",
        "text": "How good is your relationship compared to most?",
        "max_label": "Better than all others (extremely good)",
        "min_label": "Worse than all others (extremely bad)",
        "max": 5,
        "min": 0,
      },
      {
        "type": "button",
        "title": "Question 24",
        "text": "Do you enjoy your partner’s company?",
        "answers": [ "Never", "Less than once a month", "Once or twice a month", "Once or twice a week", "Once a day", "More Often" ],
        "values": [ 0, 1, 2, 3, 4, 5 ]
      },
      {
        "type": "button",
        "title": "Question 25",
        "text": "How often do you and your partner have fun together?",
        "answers": [ "Never", "Less than once a month", "Once or twice a month", "Once or twice a week", "Once a day", "More Often" ],
        "values": [ 0, 1, 2, 3, 4, 5 ]
      },
      {
        "type": "text",
        "title": "Instructions 26 - 32",
        "text": "Position the slider where it best descr       ibes how you feel about your relationship. Base your responses on your first impressions and immediate feelings about the items."
      },
      {
        "type": "slider",
        "title": "Question 26",
        "max_label": "INTERESTING",
        "min_label": "BORING",
        "max": 5,
        "min": 0
      },
      {
        "type": "slider",
        "title": "Question 27",
        "max_label": "GOOD",
        "min_label": "BAD",
        "max": 5,
        "min": 0
      },
      {
        "type": "slider",
        "title": "Question 28",
        "max_label": "FULL",
        "min_label": "EMPTY",
        "max": 5,
        "min": 0
      },
      {
        "type": "slider",
        "title": "Question 29",
        "max_label": "FRIENDLY",
        "min_label": "LONELY",
        "max": 5,
        "min": 0
      },
      {
        "type": "slider",
        "title": "Question 30",
        "max_label": "STURDY",
        "min_label": "FRAGILE",
        "max": 5,
        "min": 0
      },
      {
        "type": "slider",
        "title": "Question 31",
        "max_label": "HOPEFUL",
        "min_label": "DISCOURAGING",
        "max": 5,
        "min": 0
      },
      {
        "type": "slider",
        "title": "Question 32",
        "max_label": "ENJOYABLE",
        "min_label": "MISERABLE",
        "max": 5,
        "min": 0
      },
    ];
  }

  async ngOnInit() {
  }

  public isComplete(): boolean {
    let complete: boolean = true;
    _.forEach(this.answers, answer => {
      if(!answer) complete = false;
    })
    return complete;
  }

  public ionSelect(i: number, value: number){
    if(i === 1) return;
    if(i === 26) return;

    if(i >= 1) i = i - 1;
    if(i > 25) i = i - 1;
    //$event.target.value
    this.answers[i] = value;
  }

  public async onComplete(): Promise<void> {

    let unanswered: string = '';
    _.forEach(this.answers, (answer: any, i: number) => {
      if(answer === null) unanswered = unanswered + ', ' + (i + 1);
    });

    if(unanswered !== '') {
      unanswered = 'Questions [' + unanswered.slice(2) + '] have not been answered';
      let confirm = this.alertCtrl.create({
        title: 'Unanswered Questions',
        message: unanswered,
        buttons: [
          {
            text: 'Cancel',
            handler: () => {}
          },
          {
            text: 'Save anyway',
            handler: async () => {
              await this.save();
              this.navCtrl.pop();
            }
          }
        ]
      });
      await confirm.present();
    }
    else {
      await this.save();
      this.navCtrl.pop();
    }
  }

  private async save() {
    //let now = Date.now();

    let day: Day = await this.uow.dayFactory.create({ 'note': '', 'relationship_guid': '1'} );
    let session: Session = await this.uow.sessionFactory.create( { 'test_guid': '1', 'relationship_guid': '1', 'day_guid': day.guid });

    _.forEach(this.answers, async (value, i) => {
      await this.uow.answerFactory.create( { 'session_guid': session.guid, 'question': i, 'value': this.answers[i] !== null ? this.answers[i] : -1 })
    })

    let score:number = 0;
    _.foreach(this.answers, (answer) => {
      // ignoer -1 unanswered values
      if(answer > 0) score = score + answer;
    });

    session.score = score;

    await this.uow.commit();
  }

  // public scrollTo(element:string) {
  //   let yOffset = document.getElementById(element).offsetTop;
  //   this.content.scrollTo(0, yOffset, 1000)
  // }
}
