import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/modules/shared/models/user.model';
import { AccountService } from 'src/app/modules/shared/services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public user: User;

  constructor(private accountService: AccountService) { }

  

  ngOnInit(): void {
    this.accountService.userSubject.subscribe(user =>{
      this.user = user;
    });
  }


  logoutUser(){
      this.accountService.logout();
  }

  public isUserAdmin(): boolean{
    return this.accountService.isUserAdmin();
  }

}
