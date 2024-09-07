import {inject, Injectable, signal, Signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {toObservable, toSignal} from "@angular/core/rxjs-interop";
import {Beneficiary} from "./beneficiary";
import {environment} from "../../../environments/environment";
import {Observable, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BeneficiaryService {
  private http = inject(HttpClient);
  private baseUrl:string = `${environment.apiUrl}/beneficiary`;





  getBeneficiaries():Observable<Beneficiary[]>{
    console.log(this.baseUrl)
    return this.http.get<Beneficiary[]>(this.baseUrl);
  }
  getBeneficiary(id:number):Observable<Beneficiary> {
    return this.http.get<Beneficiary>(`${this.baseUrl}/${id}`);
  }
  addBeneficiary(beneficiary:Beneficiary):Observable<Beneficiary>{
    return this.http.post<Beneficiary>(this.baseUrl, beneficiary);
  }
  deleteBeneficiary(id:number): void{
    this.http.delete(`${this.baseUrl}/id`)
  }
  updateBeneficiary(beneficiary:Beneficiary): Observable<Beneficiary>{
    return this.http.put<Beneficiary>(this.baseUrl, beneficiary);
  }



  constructor() { }
}
