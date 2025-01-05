import {
  Sequelize,
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";

import { sequelize } from "../configs/postgre.config";
import { ROLE } from "../utils/role.utils";
import { Student } from "./student.model";
import { Instructor } from "./instructor.model";

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: number;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare password: string;
  declare emailVerified: boolean;
  declare role: ROLE;
  declare profileImage: string | null;
  declare phone: string | null;
  declare lastLogin: Date | null;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  declare student?: Student;
  declare instructor?: Instructor;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
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
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "User",
    timestamps: true,
    indexes: [{ unique: true, fields: ["email"] }],
  }
);

// Associations
User.hasOne(Student, { foreignKey: "userId", as: "student" });
User.hasOne(Instructor, { foreignKey: "userId", as: "instructor" });
