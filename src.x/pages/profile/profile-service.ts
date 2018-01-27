import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import { ReflectionshipUnitOfWork } from '../../app/core/services/reflectionship-unit-of-work';
import { User } from '../../app/core/entities/entity-model';
import { State } from '../../app/core/services/state-service';

// import * as _ from 'lodash';

@Injectable()
export class ProfileService {
    public user: User;


  constructor(private state: State, private uow: ReflectionshipUnitOfWork){}

  public init() {
    this.user = this.state.user;
  }

  public async save(profile: any) {

    this.user.nickname = profile.nickname;
    this.user.email = profile.email;
    this.user.locale = profile.locale;
    this.user.gender = profile.gender;
    this.user.orientation = profile.orientation;
    this.user.theme_id = profile.theme;
    this.user.push = profile.push;
    this.user.logout  = profile.logout;

    await this.uow.commit();
  }
}