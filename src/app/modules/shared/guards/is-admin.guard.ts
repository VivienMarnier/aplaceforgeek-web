import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../services/account.service';

@Injectable({
    providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {

    constructor(private router: Router, private accountService: AccountService, private toastr: ToastrService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(!this.accountService.isUserAdmin()){
            this.toastr.error('You are not allowed to access this page.','Access denied',{positionClass: 'toast-bottom-right'});
            if(this.accountService.isLoggedIn()){
                this.router.navigateByUrl('/home');
            }else{
                this.router.navigateByUrl('/');
            }
        }

        return true;
    }

}