import { sequelize } from "../configs/postgre.config";
import { Certificate } from "./certificate.model";
import { Course } from "./course.model";
import { User } from "./user.model";

export class Student extends User {
  public enrolledCourses!: Course[];
  public completedCourses!: Course[];
  public certificates!: Certificate[];
}

Student.init({}, { sequelize, modelName: "Student", timestamps: true });

Student.belongsToMany(Course, {
  through: "StudentCourses",
  as: "enrolledCourses",
});
Student.belongsToMany(Course, {
  through: "StudentCourses",
  as: "completedCourses",
});
