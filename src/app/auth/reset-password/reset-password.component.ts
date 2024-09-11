import {Component, inject} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../shared/user.service";
import {ResetPasswordDto} from "../shared/user";

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  userService: UserService = inject(UserService);
  private token: string = '';

  resetForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  resetPassword() {
    if (this.resetForm.valid) {
      let resetRequest: ResetPasswordDto = new ResetPasswordDto (this.resetForm.value.email, this.token, this.resetForm.value.password);
      this.userService.resetPassword(resetRequest).subscribe(response => {
        console.log(response)
      })
      console.log(resetRequest);
    }

  }


  ngOnInit() {
    this.token = this.route.snapshot.queryParams['token'];
  }


}
