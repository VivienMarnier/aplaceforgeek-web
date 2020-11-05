import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../models/game.model';
import { User } from '../models/user.model';
import { BaseService } from './base.services';

@Injectable({
    providedIn: 'root',
  })
  export class UserService extends BaseService {

    constructor(protected http: HttpClient){
        super(http);
    }
    
    public active(user: User): Observable<any>{
        return this.patchWithContext('/api/admin/users/' + user.id, {active: user.active});
    }

    public delete(userId: number): Observable<any>{
        return this.deleteWithContext('/api/admin/users/' + userId);
    }

    public getList(): Observable<Array<User>>{
        return this.getWithContext('/api/admin/users');
    }

    public getSubscriptions(userId: number): Observable<any>{
        return this.getWithContext('/api/users/' + userId + '/subscriptions');
    }
    
  }