//import { ReflectionshipUnitOfWork, EntityManagerProvider } from '../../app/core/services/common';
//import { EntityManager } from 'breeze-client';

//import { Day } from '../../app/core/entities/entity-model';
import { Component } from '@angular/core';
import { NavController, MenuController, ModalController } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
//import { ICON, GOOGLE, FACEBOOK } from '../../providers/constant';
//import { TimelinePage } from '../timeline/timeline';
import { TranslateService } from '@ngx-translate/core';
import { CsiPage } from '../test-pages/csi/csi';
//import { NvD3Module } from 'ng2-nvd3';
declare let d3: any;

@Component({
    selector: 'home',
    templateUrl: 'home.html'
})
export class HomePage {
    options;
    data;

    //private em: EntityManager;

    constructor(public navCtrl:NavController, public menuCtrl:MenuController, public modalCtrl: ModalController, translate: TranslateService,
      public imagePicker: ImagePicker) {

        this.options = {
          chart: {
            type: 'discreteBarChart',
            height: 450,
            margin : {
              top: 20,
              right: 20,
              bottom: 50,
              left: 55
            },
            x: function(d){return d.label;},
            y: function(d){return d.value;},
            showValues: true,
            valueFormat: function(d){
              return d3.format(',.4f')(d);
            },
            duration: 500,
            xAxis: {
              axisLabel: 'X Axis'
            },
            yAxis: {
              axisLabel: 'Y Axis',
              axisLabelDistance: -10
            }
          }
        }
        this.data = [
          {
            key: "Cumulative Return",
            values: [
              {
                "label" : "A" ,
                "value" : -29.765957771107
              } ,
              {
                "label" : "B" ,
                "value" : 0
              } ,
              {
                "label" : "C" ,
                "value" : 32.807804682612
              } ,
              {
                "label" : "D" ,
                "value" : 196.45946739256
              } ,
              {
                "label" : "E" ,
                "value" : 0.19434030906893
              } ,
              {
                "label" : "F" ,
                "value" : -98.079782601442
              } ,
              {
                "label" : "G" ,
                "value" : -13.925743130903
              } ,
              {
                "label" : "H" ,
                "value" : -5.1387322875705
              }
            ]
          }
        ];

    }

      public goToCSI() {
        this.navCtrl.push(CsiPage);
      }

      // ionViewDidLoad() { console.log('ionViewDidLoad')}
      ionViewWillEnter(){
        this.menuCtrl.enable(true);
      }
      // ionViewDidEnter() { console.log('ionViewDidEnter') }
      // ionViewWillLeave() { console.log('ionViewWillLeave') }
      // ionViewDidLeave() { console.log('ionViewDidLeave') }
      // ionViewWillUnload() { console.log('ionViewWillUnload') }

      public getImage() {
        this.imagePicker.getPictures({maximumImagesCount: 1}).then((results) => {
          for (var i = 0; i < results.length; i++) {
              console.log('Image URI: ' + results[i]);
          }
        }, (err) => { });
      }
}
