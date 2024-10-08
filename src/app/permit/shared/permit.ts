import {Comment} from "../../comment/shared/comment";

export type Permit = {
  id:number;
  projectId:number;
  institutionId:number;
  title:string;
  number:string;
  releaseDate:string;
  expirationDate:string;
  submissionDate:string;
  validity:number;
  comments: Comment[];

}

