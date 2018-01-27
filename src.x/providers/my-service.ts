import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ReflectionshipUnitOfWork } from '../app/core/services/common';
import { TIMELINES, PROFILES, USERS, NOTIFICATIONS } from '../providers/constant';
import 'rxjs/Rx';

@Injectable()
export class MyService {
  private http;

  constructor(http:Http, public uow: ReflectionshipUnitOfWork) {
    this.http = http;
  }

  /**
   * Gets the timelines.json from asset
   * @returns Array of timelines
   */
  getTimelines() {
    return this.http.get(TIMELINES)
        .map((res:Response) => res.json());
  }

  /**
   * Gets the profiles.json from asset
   * @returns profile data
   */
  getMyProfile(){
    return this.http.get(PROFILES)
        .map((res:Response) => res.json().profile);
  }

  getAllUsers(){
    return this.http.get(USERS)
        .map((res:Response) => res.json().users);
  }

  getAllNotifications(){
    return this.http.get(NOTIFICATIONS)
        .map((res:Response) => res.json().notifications);
  }
}