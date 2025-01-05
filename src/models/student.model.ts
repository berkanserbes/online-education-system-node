import { DataTypes, Model } from "sequelize";
import { sequelize } from "../configs/postgre.config";
import { Course } from "./course.model";
import { Certificate } from "./certificate.model";
import { User } from "./user.model";

export class Student extends Model {
  public id!: number;
  public userId!: number;
  public certificates!: Certificate[];
  public enrolledCourses!: Course[];
  public completedCourses!: Course[];
}

Student.init(
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
  { sequelize, modelName: "Student", timestamps: true }
);

// Associations
Student.belongsTo(User, { foreignKey: "userId", as: "user" });

Student.belongsToMany(Course, {
  through: "StudentCourses",
  as: "enrolledCourses",
  foreignKey: "studentId",
});

Student.belongsToMany(Course, {
  through: "StudentCourses",
  as: "completedCourses",
  foreignKey: "studentId",
});

Student.hasMany(Certificate, { foreignKey: "studentId", as: "certificates" });
