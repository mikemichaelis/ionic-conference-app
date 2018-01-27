import { SystemEnum } from './../../app/core/enums/systemEnum';
import { Predicate } from 'breeze-client';
import { Injectable } from '@angular/core';
import { State, ReflectionshipUnitOfWork, LogService } from '../../app/core/services/common';
import { Relationship } from '../../app/core/entities/entity-model';

import * as Rx from 'rxjs';

export interface IRelationshipsService {
  relationships: Relationship[];
  dataEvent: Rx.Subject<any>;

  initialize();
}

@Injectable()
export class RelationshipsService implements IRelationshipsService {
  public relationships: Relationship[] = [];
  public dataEvent: Rx.Subject<any> = new Rx.Subject<any>();

  private initialized: boolean = false;

  constructor(private state: State, private uow: ReflectionshipUnitOfWork, public logger: LogService) {
    this.state.systemEvents.subscribe((system) => {
      switch(system.event) {
        case SystemEnum.ONLINE:
          this.logger.trace({ stack: 'RelationshipsService.systemEvents', event: system.event, state: system.state });
          if(system.state) {
            this.fetchOnlineData();
          }
          break;
        case SystemEnum.RESET:
          this.logger.trace({ stack: 'RelationshipsService.systemEvents', event: system.event, state: system.state });
          this.initialized = false;
          this.relationships = [];
          this.dataEvent.next(true);
        default:
          break;
      }
    });
  }

  public async initialize() {
    this.logger.trace({ stack: 'RelationshipsService.initialize()', initialized: this.initialized });
    if(this.initialized) {
      this.dataEvent.next(this.relationships);
      this.fetchOnlineData();
    } else {
      let query = new Predicate('user_guid', 'eq', this.state.user.guid);
      this.relationships = this.uow.relationshipSet.whereInCache(query);

      this.logger.trace({ stack: 'RelationshipsService.initialize().whereInCache(query)', query: query, count: this.relationships.length });
      if(this.relationships.length > 0) {
        this.dataEvent.next(true);
      }

      this.fetchOnlineData();
      this.initialized = true;
    }
  }

  private async fetchOnlineData() {
    this.logger.trace({ stack: 'RelationshipsService.fetchOnlineData()', online: this.state.online });
    if(this.state.online) {
      try {
        let query = new Predicate('user_guid', 'eq', this.state.user.guid).and(new Predicate('active', 'eq', 1));
        this.relationships = <Relationship[]>(await this.uow.relationshipSet.where(query));

        this.logger.trace({ stack: 'RelationshipsService.fetchOnlineData().where(query)', query: query, count: this.relationships.length });
        if(this.relationships.length > 0) {
          this.dataEvent.next(this.relationships);
          this.state.systemEvents.next({ event: SystemEnum.EXPORT, state: true });
        } else {
          // No Relationships :-(
        }
      } catch (error) {
        this.logger.error({ stack: 'RelationshipsService:fetchOnlineData()', message: 'Error loading relationships', error: error.Message });
        this.state.systemEvents.next({ event: SystemEnum.ERROR, state: error });
        // TODO convert all this to an observable and retryWhen()
      }
    }
  }
}