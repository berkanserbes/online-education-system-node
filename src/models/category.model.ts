import { DataTypes, Model } from "sequelize";
import { sequelize } from "../configs/postgre.config";
import { Course } from "./course.model";

export class Category extends Model {
  public id!: number;
  public name!: string;
  public courses?: Course[];
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  { sequelize, modelName: "Category", timestamps: true }
);

Category.belongsToMany(Course, {
  through: "CourseCategories",
  foreignKey: "categoryId",
  as: "courses",
});
