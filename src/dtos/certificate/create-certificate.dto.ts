import { IsString, IsNumber, IsNotEmpty, IsDate } from "class-validator";

export class CreateCertificateDTO {
  @IsString()
  @IsNotEmpty()
  certificateCode!: string;

  @IsDate()
  issueDate!: Date;

  @IsNumber()
  @IsNotEmpty()
  studentId!: number;

  @IsNumber()
  @IsNotEmpty()
  courseId!: number;
}
