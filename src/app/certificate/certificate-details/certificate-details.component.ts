import {Component, inject, Input} from '@angular/core';
import {Certificate} from "../shared/certificate";
import {FormsModule} from "@angular/forms";
import {MatError, MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatHeaderRowDef} from "@angular/material/table";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {provideNativeDateAdapter} from "@angular/material/core";
import {CertificateStore} from "../shared/certificate.store";

@Component({
  selector: 'app-certificate-details',
  standalone: true,
  imports: [
    FormsModule,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    NgIf,
    MatIcon,
    MatHint,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker
  ],
  providers:[provideNativeDateAdapter()],
  templateUrl: './certificate-details.component.html',
  styleUrl: './certificate-details.component.css'
})
export class CertificateDetailsComponent {
  @Input({required: true}) certificate: Certificate | undefined;
  private certificateStore = inject(CertificateStore);
  protected isEditable: boolean = false;

  protected setIsEditable() {
    this.isEditable = !this.isEditable;
  }

  save(title:string, number:string, releaseDate:string, checkTime:number, validity:number){
    if (this.certificate){
      const newCertificate : Certificate = {...this.certificate, title, number, checkTime, validity};
      this.certificateStore.updateCertificate(newCertificate);
      this.setIsEditable();
      console.log(newCertificate)
    }

  }




}
