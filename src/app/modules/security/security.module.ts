import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import { SecurityRoutingModule } from './security-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationComponent } from './authentication/authentication.component';



@NgModule({
  declarations: [RegistrationComponent, AuthenticationComponent],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ]
})
export class SecurityModule { }
