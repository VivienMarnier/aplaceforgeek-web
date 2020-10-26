import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {

  private registerUrl: string = environment.baseUrl + '/api/user-registration/registration';
  private loginUrl: string = environment.baseUrl + '/api/login_check';
  private loggedUser: User;
  public userSubject: BehaviorSubject<User>;

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService, private jwtHelperService: JwtHelperService) {
    this.userSubject = new BehaviorSubject(null);
  }

  public registerUser(user : any): Observable<any>{
    let headers = new HttpHeaders({ 'Content-Type': 'application/json'});
      return this.http.post<any>(`${this.registerUrl}`,JSON.stringify(user), { headers: headers});
  }

  /**
   * Log in user from Form
   * @param user 
   */
  public login(user : any): Observable<any>{
    
    let headers = new HttpHeaders({ 'Content-Type': 'application/json'});
      return this.http.post<any>(`${this.loginUrl}`,JSON.stringify(user), { headers: headers}).pipe(map(result => {
        this.storeSessionToken(result.token);
        this.setupUser(result.token);
        this.toastr.success('You are now connected !','Welcome',{positionClass: 'toast-bottom-right'});
      }));
  }

  /**
   * Log out user
   */
  public logout(){
    if(localStorage.getItem('token')){
      this.loggedUser = null;
      this.userSubject.next(null);
      localStorage.removeItem('token');
      this.toastr.success('You have been logged out !','Logout',{positionClass: 'toast-bottom-right'});
      this.router.navigateByUrl('/');
    }    
  }

  public reconnect(){
    const token = localStorage.getItem('token');
    if(token && !this.jwtHelperService.isTokenExpired(token)){
      this.setupUser(token);
    }

    return false;
  }

  /**
   * Check if logged user has admin role
   */
  public isUserAdmin(): boolean{
    if(this.loggedUser && this.loggedUser.roles.find(role => role === 'ROLE_ADMIN')){
      return true;
    }
    return false;
  }

  private setupUser(token: string) {
    const userInfos = this.jwtHelperService.decodeToken(token);
    this.loggedUser = new User(token);
    this.loggedUser.email = userInfos.email;
    this.loggedUser.roles = userInfos.roles;
    this.userSubject.next(this.loggedUser);
  }

  private storeSessionToken(token: any){
      localStorage.setItem('token', token);
  }
}