import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse }   from '@angular/common/http';
import { Injectable } from "@angular/core"
import { Observable, of } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { ToastrService } from 'ngx-toastr';
@Injectable()
export class ToastInterceptor implements HttpInterceptor {
    constructor(public toasterService: ToastrService) {}
intercept(
        req: HttpRequest<any>,
        next: HttpHandler
      ): Observable<HttpEvent<any>> {
    
        return next.handle(req).pipe(
            tap(evt => {
                if (evt instanceof HttpResponse) {
                    if(evt.body && evt.body.success)
                        this.toasterService.success('Success message test', 'Success', { positionClass: 'toast-bottom-right' });
                }
            }),
            catchError((err: any) => {
                if(err instanceof HttpErrorResponse) {
                    
                    try {
                        this.toasterService.error('An error occurred, please try again later.', 'Error', { positionClass: 'toast-bottom-right' });
                    } catch(e) {
                        this.toasterService.error('An error occurred', '', { positionClass: 'toast-bottom-right' });
                    }
                    //log error 
                }
                return of(err);
            }));
    
      }
      
}