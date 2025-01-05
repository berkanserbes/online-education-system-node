import {
  IsString,
  IsEmail,
  IsNotEmpty,
  Length,
  IsOptional,
} from "class-validator";

export class CreateStudentDTO {
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  password!: string;

  @IsString()
  @IsOptional()
  studentNumber?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  profileImage?: string;
}
