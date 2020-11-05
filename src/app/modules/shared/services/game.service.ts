import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { off } from 'process';
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
        return this.postWithContext('/api/admin/games/create', game);
    }

    public edit(game: Game): Observable<any>{
        return this.putWithContext('/api/admin/games/' + game.id,game);
    }

    public active(game: Game): Observable<any>{
        return this.patchWithContext('/api/admin/games/' + game.id, {active: game.active});
    }

    public delete(gameId: number): Observable<any>{
        return this.deleteWithContext('/api/admin/games/' + gameId);
    }

    public getList(): Observable<Array<Game>>{
        return this.getWithContext('/api/games');
    }

    public getPaginatorList(limit: number, offset:number, keyword: string):Observable<any>{
        return this.getPaginatorWithContext('/api/games',limit, offset, keyword);
    }
    
    public subscribe(game: Game): Observable<any>{
        return this.putWithContext('/api/games/subscribe/' + game.id, game);
    }
  }