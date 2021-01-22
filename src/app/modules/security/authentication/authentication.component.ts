import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseForm } from '../../shared/forms/base-form';
import { AccountService } from '../../shared/services/account.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent extends BaseForm implements OnInit {

  constructor(
    private fb: FormBuilder, 
    private accountService: AccountService,
    private router: Router) {
      super();
    }

  ngOnInit() {
    this.createAuthenticationForm();
  }

  private createAuthenticationForm() {
    this.form = this.fb.group({
      username: ['',[Validators.required,Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8),Validators.maxLength(10)]],
    });
  }

  authenticate(){
    if(this.form.valid){
      this.accountService.login(this.form.getRawValue()).subscribe(result => {
        this.router.navigateByUrl('/home');
      }, error => {
        console.log(error);
      });
    }
  }

}
