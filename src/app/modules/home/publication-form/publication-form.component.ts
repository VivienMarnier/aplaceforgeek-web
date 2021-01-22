import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BaseForm } from '../../shared/forms/base-form';
import { Game } from '../../shared/models/game.model';
import { Publication } from '../../shared/models/publication.model';

@Component({
  selector: 'app-publication-form',
  templateUrl: './publication-form.component.html',
  styleUrls: ['./publication-form.component.css']
})
export class PublicationFormComponent extends BaseForm implements OnInit {

  public modalTitle: string = "New publication";
  public publication: Publication;
  public subscribedGames: Array<Game> = [];

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private toastr: ToastrService) { 
    super();
  }

  ngOnInit(): void {
    if(this.subscribedGames.length == 0){
      this.toastr.warning("You have not subscribed to any games yet. You can't post until you subscribed to atleast one game.","No subscriptions", {positionClass: 'toast-bottom-right'})
    }
    this.createPublicationForm();
  }

  private createPublicationForm(): void{    
    this.form = this.fb.group({
      game: [this.publication ? this.publication.game : '', [Validators.required]],
      title: [this.publication ? this.publication.title : '',[Validators.required, Validators.maxLength(150)]],
      message: [this.publication ? this.publication.message : '', [Validators.maxLength(250)]],
    });
  }

  public save(){
    if(this.form.valid){
      const game = this.form.get('game').value;
      const title = this.form.get('title').value;
      const message = this.form.get('message').value;
      const publication = new Publication(title, message, game);
      if(this.publication){
        publication.id = this.publication.id;
      }
      this.activeModal.close(publication);
    }
  }

}
