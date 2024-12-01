import { sequelize } from "../configs/postgre.config";
import { User } from "./user.model";

export class Instructor extends User {}

Instructor.init({}, { sequelize, modelName: "Instructor", timestamps: true });
