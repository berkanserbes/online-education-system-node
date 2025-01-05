import { DataTypes, Model } from "sequelize";
import { sequelize } from "../configs/postgre.config";
import { User } from "./user.model";
import { Course } from "./course.model";

export class Instructor extends Model {
  public id!: number;
  public userId!: number;
  public courses!: Course[];
}

Instructor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  { sequelize, modelName: "Instructor", timestamps: true }
);

Instructor.belongsTo(User, { foreignKey: "userId", as: "user" });

Instructor.belongsToMany(Course, {
  through: "CourseInstructors",
  as: "courses",
  foreignKey: "instructorId",
});
