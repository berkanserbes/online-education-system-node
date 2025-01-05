import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../configs/postgre.config";
import { Course } from "./course.model";
import { Certificate } from "./certificate.model";
import { User } from "./user.model";
import { ROLE } from "../utils/role.utils";

interface StudentAttributes {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  emailVerified: boolean;
  role: ROLE;
  profileImage?: string;
  phone?: string;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
  // Student'a özgü alanlar
  enrollmentDate?: Date;
  studentNumber?: string;
}

export class Student
  extends Model<InferAttributes<Student>, InferCreationAttributes<Student>>
  implements StudentAttributes
{
  declare id: number;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare password: string;
  declare emailVerified: boolean;
  declare role: ROLE;
  declare profileImage?: string;
  declare phone?: string;
  declare lastLogin?: Date;

  // Student'a özgü alanlar
  declare enrollmentDate?: Date;
  declare studentNumber?: string;

  // İlişkiler için tip tanımlamaları
  declare certificates?: Certificate[];
  declare enrolledCourses?: Course[];
  declare completedCourses?: Course[];

  // Timestamp alanları
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  static associate() {
    Student.belongsToMany(Course, {
      through: "StudentCourses",
      as: "enrolledCourses",
      otherKey: "courseId",
    });

    Student.belongsToMany(Course, {
      through: "StudentCourses",
      as: "completedCourses",
      otherKey: "courseId",
    });

    Student.hasMany(Certificate, {
      as: "certificates",
      onDelete: "CASCADE",
    });
  }
}

Student.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    // User'dan gelen alanlar
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 50],
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 50],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    role: {
      type: DataTypes.ENUM(...Object.values(ROLE)),
      defaultValue: ROLE.USER,
      allowNull: false,
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
      },
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    // Student'a özgü alanlar
    enrollmentDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    studentNumber: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "Student",
    timestamps: true,
    paranoid: true,
    indexes: [
      { unique: true, fields: ["email"] },
      { unique: true, fields: ["studentNumber"] },
    ],
  }
);
