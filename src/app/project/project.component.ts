import {Component, inject} from '@angular/core';
import {CertificateDetailsComponent} from "../certificate/certificate-details/certificate-details.component";
import {CommentComponent} from "../comment/comment.component";
import {TruncatePipe} from "../pipes/truncate.pipe";
import {CertificateStore} from "../certificate/shared/certificate.store";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectStore} from "./shared/project.store";

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    CertificateDetailsComponent,
    CommentComponent,
    TruncatePipe
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  projectStore = inject(ProjectStore);
  certificateStore = inject(CertificateStore)
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  protected choice:string = '';


  deleteProject(projectId:number){
    this.projectStore.deleteProject(projectId);
  }

  protected setChoice(choice:string) {
    this.choice = choice;
  }

  goToRoute(route: string){
    console.log(this.route);
    this.router.navigate([`../${route}`], {relativeTo: this.route});
  }
}
