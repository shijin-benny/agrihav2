export class CreateQuotationDto {
  project_id: any;
  architect_id: any;
  quote: number;
  user_id: any;
  status: string; //when the user accept the quote
}

export class CreateActivitylogDto {
  user: any;
  activity: string;
  //project added
  //review added
  //scheduled site visits
  ref: import('mongoose').Types.ObjectId;
  architect_id: any;
  schedule: any;
}
