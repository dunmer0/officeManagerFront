export type License = {
  id: number;
  beneficiaryId: number;
  institutionId: number;
  projectId: number;
  title:string;
  number: string;
  releaseDate: string;
  expirationDate: string;
  validity: number;
  isValid: boolean;
}
