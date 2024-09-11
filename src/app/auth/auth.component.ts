import {Component, inject} from '@angular/core';
import {Router} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    LoginComponent,
    RegisterComponent,
    NgIf
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  router = inject(Router)
  loadedFeature:string = 'login';
  registerFeature:string = '';

  constructor() {
  }



  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
