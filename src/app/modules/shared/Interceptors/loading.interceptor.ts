import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import {tap} from 'rxjs/internal/operators'
import { Observable, of } from 'rxjs';
import { LoadingOverlayRef, LoadingService } from '../Services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let loadingRef: LoadingOverlayRef;

    Promise.resolve(null).then(() => loadingRef = this.loadingService.open());

    
    return next.handle(req).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse && loadingRef) {
            loadingRef.close();
          }else if(event instanceof HttpErrorResponse && loadingRef){
            loadingRef.close();
          }
        },
        error => {
          if (loadingRef) {
            loadingRef.close();
          }
    
          return of(error);
        }
      )
    );
  }
}
