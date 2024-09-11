import {Component, inject, Input} from '@angular/core';
import {Certificate} from "../certificate/shared/certificate";
import {FormsModule} from "@angular/forms";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {CertificateStore} from "../certificate/shared/certificate.store";
import {Comment} from "./shared/comment";
import {License} from "../license/shared/license";
import {Permit} from "../permit/shared/permit";
import {Project} from "../project/shared/project";

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [
    FormsModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    NgIf
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {
  @Input({required: true}) input: Certificate | License| Permit | Project | undefined;
  protected isEditable: boolean = false;
  private certificateStore = inject(CertificateStore);

  addComment(){
    this.isEditable = true;
  }
  saveComment(text:string){
    if (this.input){
      const comment: Comment = {certificateId: this.input.id, id: 0, licenseId: this.input.id, permitId: this.input.id, projectId: this.input.id, text: text}
      this.certificateStore.addComment(comment);
    }
    this.isEditable = false;

  }
  // addComment(){
  //   this.certificate?.comments.push({certificateId: 0, id: 0, licenseId: 0, permitId: 0, projectId: 0, text: ""})
  //   console.log(this.certificate);
  //   console.log("test")
  // }
}
