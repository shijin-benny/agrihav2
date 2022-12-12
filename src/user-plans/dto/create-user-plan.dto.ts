export class CreateUserPlanDto {
  creator: import('mongoose').Types.ObjectId;
  project_id: import('mongoose').Types.ObjectId;
  plan_id: import('mongoose').Types.ObjectId;
  requirements_list: any;
}
