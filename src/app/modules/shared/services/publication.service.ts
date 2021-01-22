import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../models/game.model';
import { Publication } from '../models/publication.model';
import { AccountService } from './account.service';
import { BaseService } from './base.services';

@Injectable({
    providedIn: 'root',
  })
  export class PublicationService extends BaseService {

    constructor(protected http: HttpClient, protected accountService: AccountService){
        super(http);
    }
    
    public create(publication: Publication): Observable<any>{
        return this.postWithContext('/api/publications/create', publication);
    }

    public edit(publication: Publication): Observable<any>{
        return this.putWithContext('/api/publications/' + publication.id,publication);
    }

    public delete(publicationId: number): Observable<any>{
        return this.deleteWithContext('/api/publications/' + publicationId);
    }

    public getUserFeed(){
        return this.getWithContext('/api/users/'+ this.accountService.getUser().id +'/publications');
    }
  }