import {Component, inject} from '@angular/core';
import {CertificateDetailsComponent} from "../certificate/certificate-details/certificate-details.component";
import {CommentComponent} from "../comment/comment.component";
import {TruncatePipe} from "../pipes/truncate.pipe";
import {CertificateStore} from "../certificate/shared/certificate.store";
import {ActivatedRoute, Router} from "@angular/router";
import {LicenseStore} from "./shared/license.store";

@Component({
  selector: 'app-license',
  standalone: true,
    imports: [
        CertificateDetailsComponent,
        CommentComponent,
        TruncatePipe
    ],
  templateUrl: './license.component.html',
  styleUrl: './license.component.css'
})
export class LicenseComponent {
  licenseStore = inject(LicenseStore);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  protected choice:string = '';


  deleteLicense(licenseId:number){
    this.licenseStore.deleteLicense(licenseId);
  }

  protected setChoice(choice:string) {
    this.choice = choice;
  }

  goToRoute(route: string){
    console.log(this.route);
    this.router.navigate([`../${route}`], {relativeTo: this.route});
  }
}
