import { DataTypes, Model } from "sequelize";
import { sequelize } from "../configs/postgre.config";
import { User } from "./user.model";
import { Course } from "./course.model";
import { Student } from "./student.model";

export class Review extends Model {
  public id!: number;
  public rating!: number;
  public comment!: string;
  public studentId!: number;
  public courseId!: number;
}

Review.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
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
  { sequelize, modelName: "Review", timestamps: true }
);

Review.belongsTo(Student, { foreignKey: "studentId" });
Review.belongsTo(Course, { foreignKey: "courseId" });
