import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../configs/postgre.config";
import { User } from "./user.model";
import { Course } from "./course.model";
import { Student } from "./student.model";

export class Review extends Model<
  InferAttributes<Review>,
  InferCreationAttributes<Review>
> {
  declare id: number;
  declare rating: number;
  declare comment: string;
  declare studentId: number;
  declare courseId: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
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
      validate: {
        len: [0, 1000], // Maximum yorum uzunluğu
      },
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
  { sequelize, modelName: "Review", timestamps: true }
);

Review.belongsTo(Student, { foreignKey: "studentId" });
Review.belongsTo(Course, { foreignKey: "courseId" });
