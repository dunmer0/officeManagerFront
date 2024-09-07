import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Project} from "./project";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/project`;
  constructor() { }

  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.baseUrl}`, project);
  }
  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  updateProject(project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.baseUrl}`, project);
  }
  getProjects():Observable<Project[]>{
    return this.http.get<Project[]>(`${this.baseUrl}`);
  }
}
