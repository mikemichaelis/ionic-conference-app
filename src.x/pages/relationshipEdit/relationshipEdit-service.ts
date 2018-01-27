import { SystemEnum } from './../../app/core/enums/systemEnum';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { State, LogService, ReflectionshipUnitOfWork } from '../../app/core/services/common';
import { Relationship } from '../../app/core/entities/entity-model';
import { REL_TYPES } from '../../providers/constant';

import * as Rx from 'rxjs';

export interface IRelationshipEditService {
  relationship: Relationship;
  rel_types: string[];
  dataEvent: Rx.Subject<any>;

  initialize(relationship?: Relationship);
  save(relationship: Relationship);
}

@Injectable()
export class RelationshipEditService implements IRelationshipEditService {
  public relationship: Relationship = new Relationship();
  public rel_types: any = {};
  public dataEvent: Rx.Subject<any> = new Rx.Subject<any>();

  constructor(private state: State, private uow: ReflectionshipUnitOfWork, public logger: LogService, public httpClient: HttpClient) {

    this.state.systemEvents.subscribe((system) => {
      switch(system) {
        // case SystemEnum.LOGOUT:

        // // remove any previous data
        // this.relationship = new Relationship();
        // this.dataEvent.next(true);
      }
    });

    this.httpClient.get(REL_TYPES).subscribe(data =>
      this.rel_types = data);
  }

  public async initialize(relationship?: Relationship) {

    if(relationship) {
      // This is an edit
      this.relationship = relationship;
    } else {

      // This is a create

      // TODO what if this.state.user is null or guid has not been assigned by the API?
      this.relationship = await this.uow.relationshipFactory.create({ user_guid: this.state.user.guid, type: 'ROMANTIC', name: '', active: true, private: false,  start: new Date(Date.now())});
      this.relationship.name = 'Test';

      // TODO establish defaults based on user gender and sexuality
      if(this.state.user.gender == 'male' ) {
        this.relationship.picture_url = 'assets/img/default/woman.png';
        this.relationship.background_url = 'assets/img/default/background.jpg';
      } else {
        this.relationship.picture_url = 'assets/img/default/man.png';
        this.relationship.background_url = 'assets/img/default/background.jpg';
      }
    }

    this.dataEvent.next(this.relationship);
  }

  public async save(relationship: Relationship): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.relationship.name = relationship.name;
      this.relationship.start = relationship.start;
      this.relationship.picture_url = relationship.picture_url;
      this.relationship.background_url = relationship.background_url;

      // TODO not sure if I should do this before the save or not.....
      // this.state.systemEvents.next(SystemEnum.EXPORT);

      this.uow.commit().then(relationship => {
        this.state.systemEvents.next({ event: SystemEnum.EXPORT, state: true });
        this.dataEvent.next(this.relationship);
        resolve(true);
      }).catch(error => {
        this.state.systemEvents.next({ event: SystemEnum.ERROR, state: error });
        this.logger.error({ message: 'Error saving relationship edit', error: error }); // TODO fix this error message
        resolve(false);
      });
    });
  }
}