import { CertificateService } from './shared/certificate.service';
import { Component, inject, OnInit } from '@angular/core';
import { CertificateStore } from './shared/certificate.store';
import {CertificateDetailsComponent} from "./certificate-details/certificate-details.component";
import {CommentComponent} from "../comment/comment.component";
import {TruncatePipe} from "../pipes/truncate.pipe";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-certificate',
  standalone: true,
  imports: [
    CertificateDetailsComponent,
    CommentComponent,
    TruncatePipe
  ],
  providers:[CertificateStore],
  templateUrl: './certificate.component.html',
  styleUrl: './certificate.component.css'
})
export class CertificateComponent implements OnInit {

  constructor() {
  }

  certificateStore = inject(CertificateStore);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  protected choice:string = '';
  printCertificate(){
    for (let certificate of this.certificateStore.certificatesByBeneficiary()) {
      console.log(certificate);
    }
  }

  deleteCertificate(certificateId:number){
    this.certificateStore.removeCertificate(certificateId);
  }

  protected setChoice(choice:string) {
    this.choice = choice;
  }

  goToRoute(route: string){
    console.log(this.route);
    this.router.navigate([`../${route}`], {relativeTo: this.route});
  }
  ngOnInit(): void {

  }

}
