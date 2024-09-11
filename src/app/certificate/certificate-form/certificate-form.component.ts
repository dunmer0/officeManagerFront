import {Component, inject, signal} from '@angular/core';
import {FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {Location, NgIf} from "@angular/common";
import {BeneficiariesStore} from "../../beneficiary/shared/beneficiary.store";
import {Beneficiary} from "../../beneficiary/shared/beneficiary";
import {CertificateStore} from "../shared/certificate.store";
import {Certificate} from "../shared/certificate";
import {Comment} from "../../comment/shared/comment";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-certificate-form',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './certificate-form.component.html',
  styleUrl: './certificate-form.component.css'
})
export class CertificateFormComponent {


  private fb = inject(NonNullableFormBuilder)
  private certificateStore = inject(CertificateStore);
  private beneficiaryStore = inject(BeneficiariesStore);
  private location = inject(Location);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);


  certificateForm = this.fb.group({
    title: ["", {validators: [Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z0-9._ -]*')]}],
    number: ["", {validators: [Validators.required, Validators.pattern('[a-zA-Z0-9._ -]*'), Validators.maxLength(50)]}],
    releaseDate: ["", {validators: [Validators.required]}],
    checkTime: ["", {validators: [Validators.pattern('[0-9]*'), Validators.required]}],
    validity: ["", {validators: [Validators.required, Validators.maxLength(50), Validators.pattern('[0-9]*')]}]
  })


  protected onSubmit() {
    const validity = +this.certificateForm.getRawValue().validity;
    const checkTime = +this.certificateForm.getRawValue().checkTime
    const certificate: Certificate = {
      ...this.certificateForm.getRawValue(),
      beneficiaryId: this.beneficiaryStore.beneficiaryId(),
      comments: [],
      id: 0,
      expiryDate: "",
      validity: validity,
      checkTime: checkTime
    };
    this.certificateStore.addCertificate(certificate);
    this.router.navigate([`../details`], {relativeTo: this.activatedRoute});
  }

  protected goBack() {
    this.location.back();

  }
}
