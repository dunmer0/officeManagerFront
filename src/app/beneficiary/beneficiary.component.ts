import {AfterViewInit, Component, EventEmitter, inject, OnInit, Output, signal, ViewChild} from '@angular/core';
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";
import {NgClass} from "@angular/common";
import {BeneficiariesStore} from "./shared/beneficiary.store";
import {BeneficiaryFormComponent} from "./beneficiary-form/beneficiary-form.component";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatIcon} from "@angular/material/icon";
import {BeneficiaryService} from "./shared/beneficiary.service";
import {MatPaginator} from "@angular/material/paginator";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from "@angular/material/table";
import {Beneficiary} from "./shared/beneficiary";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-beneficiary',
  standalone: true,
  imports: [
    RouterOutlet,
    NgClass,
    BeneficiaryFormComponent,
    MatIcon,
    MatPaginator,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatTable,
    MatHeaderRowDef,
    MatCellDef,
    MatRowDef,
    MatHeaderCellDef,
    FormsModule,
  ],
  animations: [
    trigger('openClose',[
      state('closed', style({transform: 'translateX(120%)'})),
      state('open', style({transform: 'translateX(0)'})),
      transition('closed <==> open', [animate('is ease-in')])
    ])
  ],
  templateUrl: './beneficiary.component.html',
  styleUrl: './beneficiary.component.css'
})
export class BeneficiaryComponent {
  beneficiaryStore = inject(BeneficiariesStore);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  protected menuState : 'open' | 'closed' = 'closed';
  displayedColumns: string[] = ['name'];





  goToRoute(route: string) {
    this.router.navigate([`${route}`], {relativeTo: this.route});
  }

  checkRoute(route: string): boolean {
    return this.router.url.includes(route);
  }

  deleteBeneficiary(beneficiaryId:number){
    // this.beneficiaryStore.
    console.log("clicked")
  }
}
