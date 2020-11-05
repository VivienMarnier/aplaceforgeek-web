import { Component, OnInit } from '@angular/core';
import { Game } from '../../shared/models/game.model';
import { GameService } from '../../shared/services/game.service';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements OnInit {

  public games: Array<Game> = [];
  
  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.loadGames();
  }

    /**
   * Load games list
   */
  private loadGames(){
    this.gameService.getList().subscribe(result => {
      this.games = result;
    });
  }

  public subscribe(game: Game){
      this.gameService.subscribe(game).subscribe(result => {
          console.log(result);
      });
  }

}
