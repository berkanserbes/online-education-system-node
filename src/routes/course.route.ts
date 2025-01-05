import { Router } from "express";
import { CourseController } from "../controllers/course.controller";
import { CreateCourseDTO } from "../dtos/course/create-course.dto";
import { validateRequest } from "../middlewares/validate-request.middleware";

const router = Router();

router.post(
  "/",
  validateRequest(CreateCourseDTO),
  CourseController.createCourse
);
router.get("/", CourseController.getAllCourses);

export default router;
