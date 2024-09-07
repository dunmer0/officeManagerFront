export type Contact ={
  id:number,
  firstName:string,
  lastName:string,
  email:string,
  phone:string,
  beneficiaryId:number,
  institutionId:number,
  type:ContactType
}

export enum ContactType {
  BENEFICIARY = 'BENEFICIARY',
  INSTITUTION = 'INSTITUTION',
}
