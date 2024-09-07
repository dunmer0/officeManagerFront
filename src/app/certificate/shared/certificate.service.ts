import {inject, Injectable, signal} from '@angular/core';
import {Certificate} from "./certificate";
import {HttpClient} from "@angular/common/http";
import {toObservable, toSignal} from "@angular/core/rxjs-interop";
import {BeneficiaryService} from "../../beneficiary/shared/beneficiary.service";
import {Observable, switchMap, tap} from "rxjs";
import {environment} from "../../../environments/environment";
import { ReturnStatement } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  private certificateUrl = `${environment.apiUrl}/certificate`;
  private http: HttpClient = inject(HttpClient);
  

  constructor() {
  }

  getAllCertificates(): Observable<Certificate[]>{
    return this.http.get<Certificate[]>(this.certificateUrl);
  }

  getCertificatesByBeneficiary(beneficiaryId:number): Observable<Certificate[]> {
    console.log("Log from getCertificatesByBeneficiary()")
    console.log(`${this.certificateUrl}/beneficiary?beneficiaryId=${beneficiaryId}`)
    return this.http.get<Certificate[]>(`${this.certificateUrl}/beneficiary?beneficiaryId=${beneficiaryId}`).pipe(
      tap(certificate => console.log("API response:" + certificate))
    );
  }

  addCertificate(certificate:Certificate) : Observable<Certificate>{
    return this.http.post<Certificate>(this.certificateUrl, certificate);
  }

  updateCertificate(certificate:Certificate):Observable<Certificate>{
    return this.http.put<Certificate>(this.certificateUrl, certificate);
  }

  deleteCertificate(certificateId:number): Observable<any>{
    const deleteUrl = `${this.certificateUrl}/${certificateId}`;
    return this.http.delete<any>(deleteUrl);
  }


}
