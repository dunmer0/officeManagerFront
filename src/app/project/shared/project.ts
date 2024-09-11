import {Comment} from "../../comment/shared/comment";

export type Project = {
  id: number;
  title: string;
  number: string;
  beneficiaryId: number;
  certificateId: number;
  comments: Comment[];
}
