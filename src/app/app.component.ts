import {Component, inject} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {BeneficiaryComponent} from "./beneficiary/beneficiary.component";
import {MatButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {BeneficiaryFormComponent} from "./beneficiary/beneficiary-form/beneficiary-form.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BeneficiaryComponent, MatButton, MatTooltip, MatSlideToggle, BeneficiaryFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  protected menuState : 'open' | 'closed' = 'closed';
  title = 'officeManagementFront';
  private router = inject(Router);
  goToRoute(route: string){
    this.router.navigate([`/${route}/`]);
  }

}
