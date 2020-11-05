import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseForm } from '../../shared/forms/base-form';
import { Game } from '../../shared/models/game.model';
import { PictureValidator } from '../../shared/validators/picture.validator';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent extends BaseForm implements OnInit {

  public modalTitle: string = "Add new game";
  public imageSrc: string;
  public game: Game;
 
  constructor(public activeModal: NgbActiveModal,private fb: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.createGameForm();
  }

  private createGameForm(): void{
    
    if(!this.game){
      // CREATION
      this.form = this.fb.group({
        label: ['',[Validators.required, Validators.maxLength(50)]],
        description: ['', [Validators.maxLength(250)]],
        picture: ['', [Validators.required, PictureValidator.extension]],
        selectedPicture: '',
      });
    }else{
      //EDITION
      this.form = this.fb.group({
        label: [this.game.label,[Validators.required, Validators.maxLength(50)]],
        description: [this.game.description, [Validators.maxLength(250)]],
        picture: ['',[PictureValidator.extension]],
        selectedPicture: '',
      });

      this.imageSrc = this.game.picture;
    }
  }

  public save(){
    if(this.form.valid){
      const label = this.form.get('label').value;
      const description = this.form.get('description').value;
      const picture = this.form.get('selectedPicture').value;
      const game = new Game(label,description,picture,true);
      if(this.game){
        game.id = this.game.id
      }
      this.activeModal.close(game);
    }
  }

  public onFileSelect(files: FileList){
    this.form.get('picture').setValidators([Validators.required, PictureValidator.extension]);
    if (files.length > 0 && !this.form.controls.picture.errors) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.form.get('selectedPicture').patchValue(reader.result);
      };
    }
  }
}
