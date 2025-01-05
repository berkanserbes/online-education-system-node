import { IsNumber, IsNotEmpty, IsEnum, IsDate } from "class-validator";

export class CreatePaymentDTO {
  @IsNumber()
  @IsNotEmpty()
  amount!: number;

  @IsDate()
  paymentDate!: Date;

  @IsEnum(["credit_card", "paypal", "stripe"])
  paymentMethod!: "credit_card" | "paypal" | "stripe";

  @IsNumber()
  @IsNotEmpty()
  studentId!: number;

  @IsNumber()
  @IsNotEmpty()
  courseId!: number;
}
