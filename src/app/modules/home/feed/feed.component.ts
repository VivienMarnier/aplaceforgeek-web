import { Component, OnInit } from '@angular/core';
import { faTintSlash } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Game } from '../../shared/models/game.model';
import { Publication } from '../../shared/models/publication.model';
import { AccountService } from '../../shared/services/account.service';
import { GameService } from '../../shared/services/game.service';
import { PublicationService } from '../../shared/services/publication.service';
import { UserService } from '../../shared/services/user.service';
import { PublicationFormComponent } from '../publication-form/publication-form.component';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  public publications: Array<Publication> = [];
  private userSubscribedGames: Array<Game> = [];
  constructor(
    private modalService: NgbModal, 
    private toastr: ToastrService, 
    private publicationService: PublicationService, 
    private userService: UserService, 
    private accountService: AccountService,
    private gameService: GameService) { }

  ngOnInit(): void {
    this.loadUsersSubscriptions();
    this.loadUserFeed();
  }

  public loadUsersSubscriptions(){
    this.userService.getSubscriptions(this.accountService.getUser().id).subscribe(result => {
        this.userSubscribedGames = result;
    });
  }

  public loadUserFeed(){
      this.publicationService.getUserFeed().subscribe(result =>{
        this.publications = result;
      });
  }

  public createPost(){
    const options = {
      centered: true,
      size: 'lg',
    };
    const modalRef = this.modalService.open(PublicationFormComponent, options);
    modalRef.componentInstance.subscribedGames = this.userSubscribedGames;
    modalRef.result.then(publication =>{
      if(publication instanceof Publication){
        this.publicationService.create(publication).subscribe(result => {
          publication.id = result.id;
          this.publications.unshift(publication);
          this.toastr.success('Your publication has been posted.','Publication created',{positionClass: 'toast-bottom-right'});
        });
      }
    });
  }

  public unsubscribe(publication: Publication){
    //TODO CALL game service unsubscribe ...
    this.gameService.unsubscribe().subscribe(result => {
      console.log(result);
      this.loadUserFeed();
    });
  }
}
