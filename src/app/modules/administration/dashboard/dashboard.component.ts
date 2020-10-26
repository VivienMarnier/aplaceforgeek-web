import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Game } from '../../shared/models/game.model';
import { GameService } from '../../shared/services/game.service';
import { GameFormComponent } from '../game-form/game-form.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  static USERS_TAB_INDEX = 0;
  static GAMES_TAB_INDEX = 1;

  public users: Array<any> = null;
  public games: Array<any> = null;

  constructor(private modalService: NgbModal, private gameService: GameService) { }

  ngOnInit(): void {
  }

  public onSelectedTabChange(event : MatTabChangeEvent){
      switch(event.index){
        case DashboardComponent.USERS_TAB_INDEX:
          break;
        case DashboardComponent.GAMES_TAB_INDEX:
          break;
        default:
          break;
      }
  }

  public createNewGame(){
    const options = {
      centered: true,
      size: 'lg',
    };
    const modalRef = this.modalService.open(GameFormComponent, options);
    modalRef.result.then(result =>{
      if(result instanceof Game){
        this.gameService.create(result);
      }
    });
  }

}
