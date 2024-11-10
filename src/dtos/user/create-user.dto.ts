import { IsString, IsEmail, IsNotEmpty, Length } from "class-validator";

export class CreateUserDTO {
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
}
