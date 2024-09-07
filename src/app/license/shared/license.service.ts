import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Certificate} from "../../certificate/shared/certificate";
import {Institution} from "./license";

@Injectable({
  providedIn: 'root'
})
export class LicenseService {

  constructor() { }

  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/licenses`;

  public getAll(): Observable<Institution[]> {
    return this.http.get<Institution[]>(`${this.baseUrl}`);
  }
  public add(institution:Institution):Observable<Institution>{
    return this.http.post<Institution>(`${this.baseUrl}`, institution);
  }
  public update(institution:Institution):Observable<Institution>{
    return this.http.put<Institution>(`${this.baseUrl}`, institution);
  }
  public delete(institutionId:number):Observable<Institution> {
    const deleteUrl = `${this.baseUrl}/${institutionId}`;
    return this.http.delete<Institution>(deleteUrl);
  }
}
