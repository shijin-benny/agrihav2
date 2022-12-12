export class CreateProjectRequirementDto {
  creator: import("mongoose").Types.ObjectId;
  no_of_floors: Number;
  total_area: Number;
  no_of_bedrooms: Number;
  attached_bathrooms: Number;
  design_type: String;
  total_budget: Number;
  project: import("mongoose").Types.ObjectId;

}
