import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Institution} from "./institution";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/institutions`;
  constructor() { }

  addInstitution(institution:Institution):Observable<Institution> {
    return this.http.post<Institution>(`${this.baseUrl}`, institution);
  }
  updateInstitution(institution:Institution):Observable<Institution> {
    return this.http.put<Institution>(`${this.baseUrl}`, institution);
  }
  deleteInstitution(institutionId:number):Observable<string> {
    const deleteUrl = `${this.baseUrl}/${institutionId}`;
    return this.http.delete<string>(deleteUrl);
  }

  getInstitutions():Observable<Institution[]> {
    return this.http.get<Institution[]>(`${this.baseUrl}`);
  }
}
