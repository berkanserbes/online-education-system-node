import { Sequelize, DataTypes, Model, ENUM } from "sequelize";

import { sequelize } from "../configs/postgre.config";
import { ROLE } from "../utils/role.utils";

export class User extends Model {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;
  public emailVerified!: boolean;
  public role!: string;
  public profileImage!: string | null;
  public phone!: string | null;
  public lastLogin!: Date | null;
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
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
      defaultValue: "student",
      allowNull: false,
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { sequelize, modelName: "User", timestamps: true }
);
