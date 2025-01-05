import { Category } from "../../models/category.model";
import { Instructor } from "../../models/instructor.model";

export interface CourseResponseDTO {
  id: number;
  title: string;
  description: string;
  price: number;
  duration: number;
  categories?: Category[];
  instructors?: Instructor[];
}
