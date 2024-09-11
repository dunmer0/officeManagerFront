import {Component, inject} from '@angular/core';
import {FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {Location, NgForOf, NgIf} from "@angular/common";
import {CertificateStore} from "../../certificate/shared/certificate.store";
import {BeneficiariesStore} from "../../beneficiary/shared/beneficiary.store";
import {ActivatedRoute, Router} from "@angular/router";
import {Certificate} from "../../certificate/shared/certificate";
import {ProjectStore} from "../shared/project.store";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {Project} from "../shared/project";

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [
    FormsModule,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    NgIf,
    ReactiveFormsModule,
    NgForOf,
    MatOption,
    MatSelect
  ],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.css'
})
export class ProjectFormComponent {
  private fb = inject(NonNullableFormBuilder)
  private projectStore = inject(ProjectStore);
  protected certificateStore = inject(CertificateStore);
  private beneficiaryStore = inject(BeneficiariesStore);
  private location = inject(Location);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);


  projectForm = this.fb.group({
    title: ["", {validators: [Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z0-9._ -]*')]}],
    number: ["", {validators: [Validators.required, Validators.pattern('[a-zA-Z0-9._ -]*'), Validators.maxLength(50)]}],
    certificate: ["", {validators: [Validators.required]}],
  })


  protected onSubmit() {
    const project: Project = {
      beneficiaryId: this.beneficiaryStore.beneficiaryId(),
      comments: [],
      certificateId: +this.projectForm.getRawValue().certificate,
      id: 0,
      number: this.projectForm.getRawValue().number,
      title: this.projectForm.getRawValue().title
    }
    console.log(project);
    // const certificate: Certificate = {
    //   ...this.certificateForm.getRawValue(),
    //   beneficiaryId: this.beneficiaryStore.beneficiaryId(),
    //   comments: [],
    //   id: 0,
    //   expiryDate: "",
    //   validity: validity,
    //   checkTime: checkTime
    // };
    // this.certificateStore.addCertificate(certificate);
    this.projectStore.addProject(project);
    this.router.navigate([`../details`], {relativeTo: this.activatedRoute});
  }

  protected goBack() {
    this.location.back();

  }
}
