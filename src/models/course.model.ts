import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../configs/postgre.config";
import { Category } from "./category.model";
import { Instructor } from "./instructor.model";
import { Student } from "./student.model";

export class Course extends Model<
  InferAttributes<Course>,
  InferCreationAttributes<Course>
> {
  declare id: number;
  declare title: string;
  declare description: string;
  declare price: number;
  declare duration: number;
  declare categories?: Category[];
  declare instructors?: Instructor[];
  declare enrolledStudents?: Student[];
  declare completedStudents?: Student[];
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Course.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 255],
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2), // d
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  { sequelize, modelName: "Course", timestamps: true }
);

// Associations
Course.belongsToMany(Category, {
  through: "CourseCategories",
  foreignKey: "courseId",
  as: "categories",
});

Course.belongsToMany(Instructor, {
  through: "CourseInstructors",
  foreignKey: "courseId",
  as: "instructors",
});

Course.belongsToMany(Student, {
  through: "StudentCourses",
  foreignKey: "courseId",
  as: "enrolledStudents",
});

Course.belongsToMany(Student, {
  through: "StudentCourses",
  foreignKey: "courseId",
  as: "completedStudents",
});
