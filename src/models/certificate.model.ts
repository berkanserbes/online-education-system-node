import { DataTypes, Model } from "sequelize";
import { Student } from "./student.model";
import { Course } from "./course.model";
import { sequelize } from "../configs/postgre.config";

export class Certificate extends Model {
  public id!: number;
  public certificateCode!: string;
  public issueDate!: Date;
  public studentId!: number;
  public courseId!: number;
}

Certificate.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    certificateCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    issueDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize, modelName: "Certificate", timestamps: true }
);

Certificate.belongsTo(Student, { foreignKey: "studentId" });
Certificate.belongsTo(Course, { foreignKey: "courseId" });
