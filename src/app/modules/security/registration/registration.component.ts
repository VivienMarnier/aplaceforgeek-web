import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseForm } from '../../shared/forms/base-form';
import { AccountService } from '../../shared/services/account.service';
import { MustMatch } from '../../shared/validators/must-match.validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent extends BaseForm implements OnInit{

  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router) {
    super();
  }

  ngOnInit(): void{
    this.createRegistrationForm();
  }

  createRegistrationForm(): void{
    this.form = this.fb.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8),Validators.maxLength(10)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8),Validators.maxLength(10)]],
    },{
      validator: MustMatch('password','confirmPassword')
    });
  }

  register(): void {
    if(this.form.valid){
      this.accountService.registerUser(this.form.getRawValue()).subscribe(result => {
        this.router.navigateByUrl('/');
      });
    }
  }
}
