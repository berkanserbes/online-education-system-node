import { IsString, IsNumber, IsNotEmpty, Min } from "class-validator";

export class CreateCourseDTO {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  description!: string;

  @IsNumber()
  @Min(0)
  price!: number;

  @IsNumber()
  @Min(1)
  duration!: number;

  categoryIds?: number[];
  instructorIds?: number[];
}
