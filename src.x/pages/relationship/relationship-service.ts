import { SystemEnum } from './../../app/core/enums/systemEnum';
import { Predicate } from 'breeze-client';
import { Injectable } from '@angular/core';
import { State, ReflectionshipUnitOfWork } from '../../app/core/services/common';
import { User, Relationship } from '../../app/core/entities/entity-model';

import * as Rx from 'rxjs';

export interface IRelationshipService {
  user: User;
  partner: User;
  relationship: Relationship;
  dataEvent: Rx.Subject<any>;

  initialize(relationship: Relationship);
  save(relationship: Relationship);
}

@Injectable()
export class RelationshipService implements IRelationshipService {
  public user: User = new User();
  public partner: User = new User();
  public relationship: Relationship = new Relationship();
  public dataEvent: Rx.Subject<any> = new Rx.Subject<any>();

  constructor(private state: State, private uow: ReflectionshipUnitOfWork) {
    this.user = this.state.user;

    this.state.systemEvents.subscribe((system) => {
      switch(system.event) {
        // case SystemEnum.LOGOUT:
        //   this.initialized = false;

        //   // remove any previous data
        //   this.user = new User();
        //   this.partner = new User();
        //   this.relationship = null;
        //   this.dataEvent.next(true);
        //   break;
        case SystemEnum.ONLINE:
          this.fetchOnlineData();
          break;
        default:
          break;
      }
    });
  }

  public async initialize(relationship: Relationship) {
    this.relationship = relationship;

    this.dataEvent.next(true);

    if(this.state.online) this.fetchOnlineData();

    // if(this.initialized) {
    //   this.dataEvent.next(this.relationship);
    //   if(this.state.online) this.fetchOnlineData();
    // } else {
    //   this.user = this.state.user;
    //   let query = new Predicate('user_guid', 'eq', this.user.guid);
    //   let relationships = this.uow.relationshipSet.whereInCache(query);

    //   if(relationships[0]) {
    //     this.relationship = relationships[0];
    //     this.partner = this.relationship.Partner ? this.relationship.Partner : this.partner;
    //     this.dataEvent.next(true);
    //   }

    //   // Test online/offline behavior
    //   this.state.onlineEvents.subscribe(async (online) => {
    //     if(online) this.fetchOnlineData();
    //   });

    //   this.initialized = true;
    // }
  }

  private async fetchOnlineData() {
    try {
      let query = new Predicate('guid', 'eq', this.relationship.guid).and(new Predicate('active', 'eq', 1));
      let relationships = await this.uow.relationshipSet.where(query);
      if(relationships.length > 0) {
        this.relationship = relationships[0];
        this.dataEvent.next(this.relationship);
        this.state.systemEvents.next({ event: SystemEnum.EXPORT, state: true });
      } else {
        // This should never ever happen!
      }
    } catch (e) {

    }
  }

  public async save(relationship: Relationship) {

    // this.user.nickname = profile.nickname;
    // this.user.email = profile.email;
    // this.user.locale = profile.locale;
    // this.user.gender = profile.gender;
    // this.user.orientation = profile.orientation;
    // this.user.theme_id = profile.theme;
    // this.user.push = profile.push;
    // this.user.logout  = profile.logout

    // await this.uow.commit();
  }
}