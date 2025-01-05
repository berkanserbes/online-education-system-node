import { IsString, IsNumber, IsNotEmpty, Min, Max } from "class-validator";

export class CreateReviewDTO {
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(5)
  rating!: number;

  @IsString()
  comment!: string;

  @IsNumber()
  @IsNotEmpty()
  studentId!: number;

  @IsNumber()
  @IsNotEmpty()
  courseId!: number;
}
