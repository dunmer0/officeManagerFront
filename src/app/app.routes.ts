import {Routes} from '@angular/router';
import {BeneficiaryComponent} from "./beneficiary/beneficiary.component";
import {CertificateComponent} from "./certificate/certificate.component";
import {BeneficiaryDetailsComponent} from "./beneficiary/beneficiary-details/beneficiary-details.component";
import {BeneficiaryFormComponent} from "./beneficiary/beneficiary-form/beneficiary-form.component";

export const routes: Routes = [
  {
    path: 'beneficiary', component: BeneficiaryComponent,
    children: [
      {path: 'add-beneficiary', component: BeneficiaryFormComponent},
      {path: 'certificates', component: CertificateComponent},
      {path: 'details', component: BeneficiaryDetailsComponent}
    ]
  },
];
