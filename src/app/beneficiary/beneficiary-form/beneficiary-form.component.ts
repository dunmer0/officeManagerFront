import {Component, inject, signal} from '@angular/core';
import {NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatError, MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {JsonPipe, Location, NgIf} from "@angular/common";
import {Beneficiary} from "../shared/beneficiary";
import {BeneficiariesStore} from "../shared/beneficiary.store";
import {MatButtonToggle} from "@angular/material/button-toggle";
import {MatDivider} from "@angular/material/divider";

@Component({
  selector: 'app-beneficiary-form',
  standalone: true,
  imports: [
    MatCardTitle,
    ReactiveFormsModule,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatFormField,
    MatInput,
    MatCardActions,
    MatButton,
    NgIf,
    MatLabel,
    MatHint,
    MatError,
    JsonPipe,
    MatButtonToggle,
    MatDivider
  ],
  templateUrl: './beneficiary-form.component.html',
  styleUrl: './beneficiary-form.component.css'
})
export class BeneficiaryFormComponent {
  private fb = inject(NonNullableFormBuilder)
  private beneficiaryStore = inject(BeneficiariesStore);
  private location = inject(Location)
  beneficiaryForm = this.fb.group({
    name: ["", {validators: [Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z0-9._ -]*')]}],
    addressName: ["", {validators: [Validators.required, Validators.pattern('[a-zA-Z0-9._ -]*'), Validators.maxLength(50)]}],
    streetNumber: ["", {validators: [Validators.pattern('[0-9]*'), Validators.maxLength(5)]}],
    state: ["", {validators: [Validators.pattern('[a-zA-Z0-9._ -]*'), Validators.required]}],
    city: ["", {validators: [Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z0-9._ -]*')]}]
  })
  protected readonly nameValue = signal('');
  protected readonly addressValue = signal('');

  protected onName(event: Event) {
    this.nameValue.set((event.target as HTMLInputElement).value);
  }

  protected onAddress(event: Event) {
    this.addressValue.set((event.target as HTMLInputElement).value);
  }

  protected onSubmit() {
    const beneficiary: Beneficiary = {
      ...this.beneficiaryForm.getRawValue(), id: 0, streetNumber: +this.beneficiaryForm.getRawValue().streetNumber
    };
    this.beneficiaryStore.addBeneficiary(beneficiary);
    this.goBack();
  }

  protected goBack() {
    this.location.back();
  }
}
