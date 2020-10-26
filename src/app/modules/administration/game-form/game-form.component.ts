import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseForm } from '../../shared/forms/base-form';
import { Game } from '../../shared/models/game.model';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent extends BaseForm implements OnInit {

  public imageSrc: string;

  constructor(public activeModal: NgbActiveModal,private fb: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.createGameForm();
  }

  private createGameForm(): void{
    
    this.form = this.fb.group({
      label: ['',[Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.maxLength(250)]],
      picture: ['', [Validators.required]],
    });
  }

  public save(){
    console.log(this.form.valid);
    if(this.form.valid){
      const label = this.form.get('label').value;
      const description = this.form.get('description').value;
      const picture = this.form.get('picture').value;
      const game = new Game(label,description,picture,true);
      this.activeModal.close(game);
    }
  }

  public onFileSelect(event){
    if (event.target.files.length > 0) {
      const reader = new FileReader();
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.form.get('picture').patchValue(reader.result);
      };
    }
  }
}
