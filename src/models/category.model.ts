import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../configs/postgre.config";
import { Course } from "./course.model";

export class Category extends Model<
  InferAttributes<Category>,
  InferCreationAttributes<Category, { omit: "id" | "createdAt" | "updatedAt" }>
> {
  declare id: number;
  declare name: string;
  declare courses?: Course[];

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
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
      validate: {
        notEmpty: true,
        len: [3, 120],
      },
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  { sequelize, modelName: "Category", timestamps: true }
);

Category.belongsToMany(Course, {
  through: "CourseCategories",
  foreignKey: "categoryId",
  as: "courses",
  onDelete: "CASCADE",
});
