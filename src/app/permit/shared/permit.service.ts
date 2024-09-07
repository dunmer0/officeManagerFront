import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Permit} from "./permit";
import {Contact} from "../../contact/shared/contact";

@Injectable({
  providedIn: 'root'
})
export class PermitService {

  constructor() { }

  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/permits`;

  public getAll():Observable<Permit[]>{
    return this.http.get<Permit[]>(`${this.baseUrl}`);
  }
  public add(permit:Permit):Observable<Permit>{
    return this.http.post<Permit>(`${this.baseUrl}`, permit);
  }
  public update(permit:Permit):Observable<Permit>{
    return this.http.put<Permit>(`${this.baseUrl}`, permit);
  }
  public delete(permitId:number):Observable<any>{
    return this.http.delete<number>(`${this.baseUrl}/${permitId}`);
  }
}
