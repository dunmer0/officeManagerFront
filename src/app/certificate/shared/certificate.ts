import {Comment} from "../../comment/shared/comment";

export type Certificate ={
  id:number;
  beneficiaryId:number;
  title:string;
  number:string;
  releaseDate:string;
  expiryDate:string;
  checkTime:number;
  validity:number;
  comments: Comment[];
}
