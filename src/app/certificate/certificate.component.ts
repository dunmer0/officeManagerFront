import { CertificateService } from './shared/certificate.service';
import { Component, inject, OnInit } from '@angular/core';
import { CertificateStore } from './shared/certificate.store';

@Component({
  selector: 'app-certificate',
  standalone: true,
  imports: [],
  providers:[CertificateStore],
  templateUrl: './certificate.component.html',
  styleUrl: './certificate.component.css'
})
export class CertificateComponent implements OnInit {

  constructor() {
  }

  certificateStore = inject(CertificateStore);

  ngOnInit(): void {

  }

}
