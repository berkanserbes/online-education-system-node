import { Category } from "../../models/category.model";
import { Instructor } from "../../models/instructor.model";
import { ICategoryResponse, IInstructorResponse } from "../../types/response";

export interface CourseResponseDTO {
  id: number;
  title: string;
  description: string;
  price: number;
  duration: number;
  categories?: ICategoryResponse[];
  instructors?: IInstructorResponse[];
}
