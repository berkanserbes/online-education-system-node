import { Sequelize, DataTypes, Model } from "sequelize";
import { sequelize } from "../configs/postgre.config";

export class Category extends Model {
  public id!: number;
  public name!: string;
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
