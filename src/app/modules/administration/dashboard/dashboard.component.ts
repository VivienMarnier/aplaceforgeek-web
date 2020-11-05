import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Game } from '../../shared/models/game.model';
import { User } from '../../shared/models/user.model';
import { GameService } from '../../shared/services/game.service';
import { UserService } from '../../shared/services/user.service';
import { GameFormComponent } from '../game-form/game-form.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  static USERS_TAB_INDEX = 0;
  static GAMES_TAB_INDEX = 1;

  public users: Array<any> = [];
  public games: Array<Game> = [];

  public paginatorLength: number = 0;
  public limit: number = 10;
  public offset: number = 0;
  public search: string = '';

  constructor(private modalService: NgbModal, private gameService: GameService, private userService: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  public getPaginatorData(event: PageEvent){
      this.limit = event.pageSize;
      this.offset = event.pageIndex;
      this.paginatorLength = event.length;
      this.loadGames();
  }

  public searchGames(search: string){
      this.search = search;
      this.loadGames();
  }

  public onSelectedTabChange(event : MatTabChangeEvent){
      switch(event.index){
        case DashboardComponent.USERS_TAB_INDEX:
          this.loadUsers();
          break;
        case DashboardComponent.GAMES_TAB_INDEX:
          this.limit = 10;
          this.offset = 0;
          this.search = '';
          this.loadGames();
          break;
        default:
          break;
      }
  }

  /**
   * Handle users slide toggle (active)
   * @param event 
   * @param user 
   */
  public onUserToggleChange(event: MatSlideToggleChange, user: User){
    user.active = event.checked;
    this.userService.active(user).subscribe(result => {
      let message = '';
      if(user.active){
        message = "User is now active.";
      }else{
        message = "User is now inactive";
      }
      this.toastr.success(message,'User edited',{positionClass: 'toast-bottom-right'});
      const index = this.games.findIndex(element => element.id === user.id);
      if(index !== -1){
        const editedUser = new User();
        editedUser.id = user.id;
        editedUser.email = user.email;
        editedUser.roles = user.roles;
        this.users[index] = editedUser;
      }  
    });
  }

  /**
   * Handle games slide toggle (active)  
   * @param event 
   * @param game 
   */
  public onGameToggleChange(event: MatSlideToggleChange, game: Game){
    game.active = event.checked;
    this.gameService.edit(game).subscribe(result => {
      let message = '';
      if(game.active){
        message = "Game is now active.";
      }else{
        message = "Game is now inactive";
      }
      this.toastr.success(message,'Game edited',{positionClass: 'toast-bottom-right'});  
      const index = this.games.findIndex(element => element.id === game.id);
      if(index !== -1){
        const editedGame = new Game(game.label,game.description,game.picture,game.active);
        editedGame.id = game.id;
        this.games[index] = editedGame;
      }
    });
  }

  /**
   * Load users list
   */
  private loadUsers(){
    this.userService.getList().subscribe(result => {
      this.users = result;
    });
  }

  /**
   * Load games list
   */
  private loadGames(){
    this.gameService.getPaginatorList(this.limit,this.offset, this.search).subscribe(result => {
      this.games = result.games;
      this.paginatorLength = result.totalItems;
    });
  }


  public deleteUser(user: User){
    this.userService.delete(user.id).subscribe(result => {
      this.toastr.success('Your user has been deleted.','User deleted',{positionClass: 'toast-bottom-right'});
      const index = this.games.findIndex(element => element.id === user.id);
      if(index !== -1){
        this.users.splice(index,1);
      }
    });
  }

  public createNewGame(){
    const options = {
      centered: true,
      size: 'lg',
    };
    const modalRef = this.modalService.open(GameFormComponent, options);
    modalRef.result.then(game =>{
      if(game instanceof Game){
        this.gameService.create(game).subscribe(result => {
          game.id = result.id;
          this.games.push(game);
          this.toastr.success('Your game has been created.','Game created',{positionClass: 'toast-bottom-right'});
        });
      }
    });
  }

  public editGame(game: Game){
    const options = {
      centered: true,
      size: 'lg',
    };
    const modalRef = this.modalService.open(GameFormComponent, options);
    modalRef.componentInstance.game = game;
    modalRef.componentInstance.modalTitle = "Edit " + game.label;
    modalRef.result.then(result =>{
      if(result instanceof Game){
        this.gameService.edit(result).subscribe(result => {
          this.toastr.success('Your game has been edited.','Game edited',{positionClass: 'toast-bottom-right'});  
          const index = this.games.findIndex(element => element.id === game.id);
          if(index !== -1){
            const editedGame = new Game(game.label,game.description,game.picture,game.active);
            editedGame.id = game.id;
            this.games[index] = editedGame;
            console.log('refresh ?');
          }
        });
      }
    });
  }

  public deleteGame(game: Game){
      this.gameService.delete(game.id).subscribe(result => {
        this.toastr.success('Your game has been deleted.','Game deleted',{positionClass: 'toast-bottom-right'});
          const index = this.games.findIndex(element => element.id === game.id);
          if(index !== -1){
            this.games.splice(index,1);
          }
      });
  }

}
