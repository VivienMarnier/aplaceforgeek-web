import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../services/account.service';

@Injectable({
    providedIn: 'root'
})
export class IsSignedInGuard implements CanActivate {

    constructor(private router: Router, private accountService: AccountService, private toastr: ToastrService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(!this.accountService.isLoggedIn()){
            this.toastr.error('You are not connected, please authenticate.','Disconnected',{positionClass: 'toast-bottom-right'});
            this.router.navigateByUrl('/');
        }

        return true;
    }

}