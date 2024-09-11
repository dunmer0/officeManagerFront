import {Component, inject} from '@angular/core';
import {FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {Location, NgIf} from "@angular/common";
import {CertificateStore} from "../../certificate/shared/certificate.store";
import {BeneficiariesStore} from "../../beneficiary/shared/beneficiary.store";
import {ActivatedRoute, Router} from "@angular/router";
import {Certificate} from "../../certificate/shared/certificate";
import {LicenseStore} from "../shared/license.store";
import {Comment} from "../../comment/shared/comment";
import {License} from "../shared/license";
import {InstitutionStore} from "../../institution/shared/institution.store";
import {ProjectStore} from "../../project/shared/project.store";

@Component({
  selector: 'app-license-form',
  standalone: true,
  imports: [
    FormsModule,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './license-form.component.html',
  styleUrl: './license-form.component.css'
})
export class LicenseFormComponent {
  private fb = inject(NonNullableFormBuilder)
  private licenseStore = inject(LicenseStore);
  private beneficiaryStore = inject(BeneficiariesStore);
  private projectStore = inject(ProjectStore);
  private location = inject(Location);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);


  licenseForm = this.fb.group({
    title: ["", {validators: [Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z0-9._ -]*')]}],
    number: ["", {validators: [Validators.required, Validators.pattern('[a-zA-Z0-9._ -]*'), Validators.maxLength(50)]}],
    releaseDate: ["", {validators: [Validators.required]}],
    checkTime: ["", {validators: [Validators.pattern('[0-9]*'), Validators.required]}],
    validity: ["", {validators: [Validators.required, Validators.maxLength(50), Validators.pattern('[0-9]*')]}]
  })

  protected onSubmit() {
    const validity = +this.licenseForm.getRawValue().validity;
    const checkTime = +this.licenseForm.getRawValue().checkTime
    const license: License = {
      institutionId: 0,
      projectId: 0,
      ...this.licenseForm.getRawValue(),
      beneficiaryId: this.beneficiaryStore.beneficiaryId(),
      comments: [],
      id: 0,
      expirationDate: "",
      validity: validity,
      isValid: true,
    };
    this.licenseStore.addLicense(license);
    this.router.navigate([`../details`], {relativeTo: this.activatedRoute});
  }

  protected goBack() {
    this.location.back();

  }
}
