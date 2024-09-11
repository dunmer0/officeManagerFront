import {Routes} from '@angular/router';
import {BeneficiaryComponent} from "./beneficiary/beneficiary.component";
import {CertificateComponent} from "./certificate/certificate.component";
import {BeneficiaryDetailsComponent} from "./beneficiary/beneficiary-details/beneficiary-details.component";
import {BeneficiaryFormComponent} from "./beneficiary/beneficiary-form/beneficiary-form.component";
import {CertificateFormComponent} from "./certificate/certificate-form/certificate-form.component";
import {ProjectComponent} from "./project/project.component";
import {ProjectFormComponent} from "./project/project-form/project-form.component";
import {authGuard} from "./auth/guard/auth-guard/auth.guard";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {ResetPasswordComponent} from "./auth/reset-password/reset-password.component";
import {AuthComponent} from "./auth/auth.component";

export const routes: Routes = [
  {path: '', component: AuthComponent},
  {
    path: 'beneficiary',
    // canActivate: [authGuard],
    component: BeneficiaryComponent,
    children: [
      {path: 'add-beneficiary', component: BeneficiaryFormComponent},
      {path: 'certificates', component: CertificateComponent},
      {path: 'details', component: BeneficiaryDetailsComponent},
      {path: 'add-certificate', component: CertificateFormComponent},
      {path: 'projects', component: ProjectComponent},
      {path: 'add-project', component: ProjectFormComponent},
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
];
