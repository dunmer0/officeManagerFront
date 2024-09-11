
import {Component, inject, OnInit} from '@angular/core';
import {UserService} from "../shared/user.service";
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgFor, NgIf} from '@angular/common';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent implements OnInit {

  userService = inject(UserService);
  router = inject(Router);
  formBuilder = inject(FormBuilder)
  registerForm: FormGroup = new FormGroup({});
  submitted: boolean = false;
  errorMessages: string[] = []
  response: any;

  initForm() {
    this.registerForm = this.formBuilder.group({
      username: new FormControl('', [Validators.pattern(/^[a-zA-Z0-9]+$/), Validators.required]),
      passwordHash: new FormControl('', [Validators.pattern(/^[a-zA-Z0-9]+$/), Validators.required]),
      name: new FormControl('', [Validators.pattern(/^[a-zA-Z0-9]+$/), Validators.required]),
      email: new FormControl('', [Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/), Validators.required])
    });

  }

  ngOnInit(): void {
    this.initForm();
  }

  register() {
    this.submitted = true;
    this.errorMessages = [];
    if (this.registerForm.valid) {
      this.userService.registerUser(this.registerForm.value).subscribe((data) => {
        this.response = data;
        window.alert(this.response.value.message);
      });
    }
    this.registerForm.reset();


  }
}
