import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
    
    protected putWithContext(context: string, data: any){
      return this.http.put<any>(`${environment.baseUrl + context}`,JSON.stringify(data), { headers: this.headers});
    }

    protected patchWithContext(context: string, data: any): Observable<any>{
      return this.http.patch<any>(`${environment.baseUrl + context}`,JSON.stringify(data), { headers: this.headers});
    }

    protected getWithContext(context: string): Observable<any>{
      return this.http.get<any>(`${environment.baseUrl + context}`,{headers: this.headers});
    }

    protected getPaginatorWithContext(context: string, limit: number, offset:number, keyword: string): Observable<any>{
      let params = new HttpParams();
      if(keyword !== null && keyword !== ''){
        params = params.set('keyword', keyword);
      }
      params.set('limit',limit.toString()).set('offset',offset.toString());

      return this.http.get<any>(`${environment.baseUrl + context}`,{headers: this.headers, params});
    }

    protected deleteWithContext(context: string): Observable<any>{
      return this.http.delete(`${environment.baseUrl + context}`,{headers: this.headers});
    }
  }