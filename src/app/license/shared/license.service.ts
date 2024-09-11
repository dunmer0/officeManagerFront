import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {License} from "./license";

@Injectable({
  providedIn: 'root'
})
export class LicenseService {

  constructor() {
  }

  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/licenses`;

  public getAll(): Observable<License[]> {
    return this.http.get<License[]>(`${this.baseUrl}`);
  }

  public add(institution: License): Observable<License> {
    return this.http.post<License>(`${this.baseUrl}`, institution);
  }

  public update(institution: License): Observable<License> {
    return this.http.put<License>(`${this.baseUrl}`, institution);
  }

  public delete(institutionId: number): Observable<License> {
    const deleteUrl = `${this.baseUrl}/${institutionId}`;
    return this.http.delete<License>(deleteUrl);
  }
}
