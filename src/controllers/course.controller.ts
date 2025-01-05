import { Request, Response } from "express";
import { CourseService } from "../services/course.service";
import { CreateCourseDTO } from "../dtos/course/create-course.dto";
import { MESSAGES } from "../utils/message.util";

export class CourseController {
  static async createCourse(req: Request, res: Response) {
    try {
      const dto: CreateCourseDTO = req.body;
      const course = await CourseService.createCourse(dto);

      res.status(201).json({
        message: MESSAGES.SUCCESS.CREATED,
        isSuccess: true,
        data: course,
      });
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
        isSuccess: false,
        data: null,
      });
    }
  }

  static async getAllCourses(req: Request, res: Response) {
    try {
      const courses = await CourseService.getAllCourses();

      res.status(200).json({
        message: MESSAGES.SUCCESS.FETCHED,
        isSuccess: true,
        data: courses,
      });
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
        isSuccess: false,
        data: null,
      });
    }
  }
}
