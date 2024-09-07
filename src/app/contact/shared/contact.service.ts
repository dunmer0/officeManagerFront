import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Contact, ContactType} from "./contact";
import {Observable} from "rxjs";
import * as string_decoder from "node:string_decoder";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor() { }

  private http = inject(HttpClient);
  private baseUrl:string = `${environment.apiUrl}/contacts`;

  addContact(contact:Contact):Observable<Contact>{
    return this.http.post<Contact>(`${this.baseUrl}`, contact);
  }
  updateContact(contact:Contact):Observable<Contact>{
    return this.http.put<Contact>(`${this.baseUrl}`,contact);
  }
  getContacts(contactType:ContactType):Observable<Contact[]>{
    return this.http.get<Contact[]>(`${this.baseUrl}/all/${contactType}`)
  }
 deleteContact(contact: Contact):Observable<any>{
    return this.http.delete<string>(this.baseUrl,{body:contact});
 }

}
