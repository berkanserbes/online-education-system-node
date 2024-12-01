import { DataTypes, Model } from "sequelize";
import { Student } from "./student.model";
import { Course } from "./course.model";
import { sequelize } from "../configs/postgre.config";

export class Certificate extends Model {
  public id!: number;
  public issueDate!: Date;
  public student!: Student;
  public course!: Course;
}

Certificate.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    issueDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
  },
  { sequelize, modelName: "Certificate", timestamps: true }
);

Certificate.belongsTo(Student, { foreignKey: "studentId" });
Certificate.belongsTo(Course, { foreignKey: "courseId" });
