import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../models/game.model';
import { BaseService } from './base.services';

@Injectable({
    providedIn: 'root',
  })
  export class GameService extends BaseService {

    constructor(protected http: HttpClient){
        super(http);
    }
    
    public create(game: Game): Observable<any>{
        return this.postWithContext('/api/game/create', game);
    }

    public edit(game: Game): Observable<any>{
        return this.postWithContext('/api/game/edit',game);
    }

    public delete(gameId: number){
        return this.deleteWithContext('/api/game/delete/' + gameId);
    }

    public getList(){
        //TODO
        return this.getWithContext('/api/game/');
    } 
  }