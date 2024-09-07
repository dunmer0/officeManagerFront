import {Component, computed, EventEmitter, inject, OnDestroy, OnInit, Output, signal} from '@angular/core';
import {BeneficiaryService} from "../shared/beneficiary.service";
import {toObservable, toSignal} from "@angular/core/rxjs-interop";
import {switchMap} from "rxjs";
import {Beneficiary} from "../shared/beneficiary";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {BeneficiariesStore} from "../shared/beneficiary.store";
import {JsonPipe, Location, NgIf} from "@angular/common";
import {FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-beneficiary-details',
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
    MatCheckbox,
    MatIcon,
    FormsModule
  ],
  templateUrl: './beneficiary-details.component.html',
  styleUrl: './beneficiary-details.component.css'
})
export class BeneficiaryDetailsComponent implements OnDestroy{
  ngOnDestroy(): void {
  if (this.isEditable){
    this.isEditable = false;
  }

  }
  beneficiaryStore = inject(BeneficiariesStore);
  location = inject(Location);
  protected isEditable: boolean = false;

  protected setIsEditable(){
    this.isEditable = !this.isEditable;
  }

 protected onSubmit() {

    // this.beneficiaryStore.updateBeneficiary(beneficiary);
  }
  protected goBack(){

  }



}
