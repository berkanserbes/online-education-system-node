import { DataTypes, Model } from "sequelize";
import { sequelize } from "../configs/postgre.config";

export default class Payment extends Model {
  public id!: number;
  public amount!: number;
  public paymentDate!: Date;
  public paymentMethod!: string;
  public paymentStatus!: string;
}

Payment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    paymentDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    paymentMethod: {
      type: DataTypes.ENUM("credit_card", "paypal", "stripe"),
      allowNull: false,
    },
    paymentStatus: {
      type: DataTypes.ENUM("pending", "completed", "failed"),
      allowNull: false,
    },
  },
  { sequelize, modelName: "Payment", timestamps: true }
);
