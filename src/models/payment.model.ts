import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../configs/postgre.config";
import { Student } from "./student.model";
import { Course } from "./course.model";

export default class Payment extends Model<
  InferAttributes<Payment>,
  InferCreationAttributes<Payment>
> {
  declare id: number;
  declare amount: number;
  declare paymentDate: Date;
  declare paymentMethod: "credit_card" | "paypal" | "stripe";
  declare paymentStatus: "pending" | "completed" | "failed";
  declare studentId: number;
  declare courseId: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Payment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
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
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  { sequelize, modelName: "Payment", timestamps: true }
);

Payment.belongsTo(Student, { foreignKey: "studentId" });
Payment.belongsTo(Course, { foreignKey: "courseId" });
