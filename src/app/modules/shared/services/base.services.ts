import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
  })
  export class BaseService {

    private headers: HttpHeaders;

    constructor(protected http: HttpClient){
      this.headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    }

    protected postWithContext(context: string, data: any): Observable<any>{
      return this.http.post<any>(`${environment.baseUrl + context}`,JSON.stringify(data), { headers: this.headers});
    }

    protected getWithContext(context: string): Observable<any>{
      return this.http.get<any>(`${environment.baseUrl + context}`,{headers: this.headers});
    }

    protected deleteWithContext(context: string): Observable<any>{
      return this.http.delete(`${environment.baseUrl + context}`,{headers: this.headers});
    }
  }