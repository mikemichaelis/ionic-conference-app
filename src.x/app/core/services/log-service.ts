import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import { State } from './state-service';
import { SystemEnum } from '../enums/systemEnum';
import { NetworkEnum } from './../enums/networkEnum';

import * as _ from 'lodash-es';

// le.min.js is included in index.html.  le.min.js exists in /src/assets/js and it deployed automatically by ionic
// here we create a reference to the LE lib created by le.min.js
declare var LE;

@Injectable()
export class LogService  {
  private queue: any[] = [];
  private processing: boolean = false;

  constructor(private state: State, private firebase: Firebase) {
    try {
      //LE.shouldCall = true;
      LE.init({
        token: '41a58fa3-bb99-43d0-bee3-a03e44f41181',
        ssl: false,
        catchall: true,
        trace: true,
        page_info: 'never',
        print: false
      });
    } catch (error) {};

    this.state.systemEvents.subscribe((system) => {
      switch(system.event) {
        // Dont need ONLINE here, authentication is not required for logging
        case SystemEnum.NETWORK:
          if(system.state !== NetworkEnum.NONE) {
            if(!this.processing)
            this.processQueue();
          } else {
            this.processing = false;
          }
        break;
      }
    })
  }

  public trace(message: any) {
    if(this.state.trace) this.push({message: message, type: 'trace'});
  }

  public log(message: any) {
    this.push({message: message, type: 'log'});
  }

  public warn(message: any) {
    this.push({message: message, type: 'warn'});
  }

  public info(message: any) {
    this.push({message: message, type: 'info'});
  }

  public error(message: any) {
    this.push({message: message, type: 'error'});
  }

  private push(entry: any) {
    // iterate entry.message members and JSON.stringify() if complex type
    let message: any = {};
    for(var p in entry.message){
      if(typeof entry.message[p] === "object") {
        try {
          message[p] = JSON.stringify(entry.message[p]);
        } catch (error) {
          this.error({ stack: 'LogService:JSON.stringify()', inner_stack: entry.message.stack });
        }
      } else {
        message[p] = entry.message[p];
      }
    }

    let type = entry.type.toUpperCase();
    message = _.assign({
      t: entry.type.toUpperCase(),
      did:  this.state.device.UniqueDeviceID
    }, message)

    // If online and not processing the queue, just send asap, otherwise queue it up
    if(this.state.network !== NetworkEnum.NONE && !this.processing) {
      this.sendEntry(message);
    } else {1
      this.queue.push(message);
    }
  }

  // TODO Change from using a queue to using RxJS
  private processQueue() {
    this.processing = true;
    while(this.queue.length > 0 && this.processing) {
      let entry = this.queue.shift();
      this.sendEntry(entry);
    }
    this.processing = false;
  }

  private sendEntry(message: any) {
    // TODO add network error handling
    console.log(JSON.stringify(message));
    this.firebase.logEvent(message.t, message).then(value => {
    }).catch(error => {
      console.log(JSON.stringify(error));
    })

    try {
      switch(message.t) {
        case 'TRACE':
          LE.log(message);
        break;
        case 'LOG':
          LE.log(message);
        break;
        case 'WARN':
          LE.warn(message);
        break;
        case 'INFO':
          LE.info(message);
        break;
        case 'ERROR':
          LE.error(message);
        break;
      }
    } catch (e) {
      // TODO this service must stop sending and losing the log entries
      // once error -> stop further tx attempts -> queue new messsages -> wait for system to restart the queue
       console.log(e) };
  }
}
