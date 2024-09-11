import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {UserService} from "../shared/user.service";
import {Router, RouterLink} from "@angular/router";
import {LoginUser} from "../shared/user";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgClass,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userService = inject(UserService);
  router = inject(Router);
  user: LoginUser = new LoginUser();
  reset: string = '';

  forgotPassword = false;

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.pattern(/^[a-zA-Z0-9]+$/), Validators.required]),
    password: new FormControl('', [Validators.pattern(/^[a-zA-Z0-9]+$/), Validators.required])
  });
  resetForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required])
  })


  onSubmit() {
    if (this.loginForm.value.username && this.loginForm.value.password) {
      let user = new LoginUser(this.loginForm.value.username, this.loginForm.value.password);
      this.userService.loginUser(user).subscribe(
        data => {
          console.log("Before local storage")
          localStorage.setItem('token', data);
          console.log(data)
        }
      );

    }


    this.loginForm.reset();
    // console.log(this.loginForm.valid);
  }


  onSubmitReset() {
    this.userService.forgotPasswordRequest(this.resetForm.value.email).subscribe(
      response => {
        window.alert(response.value.title + "\n" + response.value.message);
      }
    )
    this.resetForm.reset();
    this.reset = '';
  }
}

