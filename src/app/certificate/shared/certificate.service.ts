import {inject, Injectable} from '@angular/core';
import {Certificate} from "./certificate";
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {environment} from "../../../environments/environment";
import {Comment} from "../../comment/shared/comment";

@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  private certificateUrl = `${environment.apiUrl}/certificate`;
  private http: HttpClient = inject(HttpClient);


  constructor() {
  }

  getAllCertificates(): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(this.certificateUrl);
  }

  getCertificatesByBeneficiary(beneficiaryId: number): Observable<Certificate[]> {

    return this.http.get<Certificate[]>(`${this.certificateUrl}/beneficiary?beneficiaryId=${beneficiaryId}`);
  }

  addCertificate(certificate: Certificate): Observable<Certificate> {
    const addUrl = `${this.certificateUrl}?beneficiaryId=${certificate.beneficiaryId}`;
    return this.http.post<Certificate>(addUrl, certificate);
  }

  updateCertificate(certificate: Certificate): Observable<Certificate> {
    return this.http.put<Certificate>(this.certificateUrl, certificate);
  }

  deleteCertificate(certificateId: number): Observable<any> {
    const deleteUrl = `${this.certificateUrl}/${certificateId}`;
    return this.http.delete<any>(deleteUrl);
  }

  addComment(comment: Comment): Observable<any> {
    const commentUrl = `${this.certificateUrl}/comments`;
    return this.http.post<Certificate>(commentUrl, comment);
  }


}
