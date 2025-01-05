import { CourseResponseDTO } from "../dtos/course/course-response.dto";
import { CreateCourseDTO } from "../dtos/course/create-course.dto";
import { Category } from "../models/category.model";
import { Course } from "../models/course.model";
import { Instructor } from "../models/instructor.model";

export class CourseService {
  static async createCourse(dto: CreateCourseDTO): Promise<CourseResponseDTO> {
    try {
      const course = await Course.create({
        title: dto.title,
        description: dto.description,
        price: dto.price,
        duration: dto.duration,
      });

      const result: CourseResponseDTO = {
        id: course.id,
        price: course.price,
        description: course.description,
        duration: course.duration,
        title: course.title,
      };

      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async getAllCourses(): Promise<CourseResponseDTO[]> {
    try {
      const courses: Course[] = await Course.findAll({
        include: [
          { model: Category, as: "categories" },
          { model: Instructor, as: "instructors" },
        ],
      });

      const result: CourseResponseDTO[] = courses.map((course) => ({
        id: course.id,
        price: course.price,
        description: course.description,
        duration: course.duration,
        title: course.title,
        categories: course.categories?.map((category) => ({
          id: category.id,
          name: category.name,
        })),
        instructors: course.instructors?.map((instructor) => ({
          id: instructor.id,
          userId: instructor.userId,
        })),
      }));

      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
