import { Sequelize, Model, DataTypes, DateDataType } from "sequelize";
import { sequelize } from "../configs/postgre.config";
import { Category } from "./category.model";
import { Instructor } from "./instructor.model";
import { Student } from "./student.model";

export class Course extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public price!: number;
  public duration!: number;
  public categories?: Category[];
  public instructors?: Instructor[];
  public students?: Student[];
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
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize, modelName: "Course", timestamps: true }
);

Course.belongsToMany(Category, { through: "CourseCategories" });
Course.belongsToMany(Instructor, { through: "CourseInstructors" });
Course.belongsToMany(Student, { through: "CourseStudents" });
