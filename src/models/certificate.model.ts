import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { Student } from "./student.model";
import { Course } from "./course.model";
import { sequelize } from "../configs/postgre.config";

export class Certificate extends Model<
  InferAttributes<Certificate>,
  InferCreationAttributes<Certificate>
> {
  declare id: number;
  declare certificateCode: string;
  declare issueDate: Date;
  declare studentId: number;
  declare courseId: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  // İlişkiler için
  declare student?: Student;
  declare course?: Course;
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
      validate: {
        notEmpty: true,
        len: [10, 50],
      },
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
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  { sequelize, modelName: "Certificate", timestamps: true }
);

Certificate.belongsTo(Student, { foreignKey: "studentId" });
Certificate.belongsTo(Course, { foreignKey: "courseId" });
