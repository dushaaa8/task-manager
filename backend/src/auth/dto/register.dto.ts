import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
} from "class-validator";

export class RegisterDto {
  @IsEmail({}, { message: "Incorrect email format" })
  email!: string;

  @IsString({ message: "Incorrect password format" })
  @MinLength(6, { message: "The password length must be greater than 6" })
  @MaxLength(32, { message: "The password length must be less than 32" })
  password!: string;

  @IsString()
  @IsNotEmpty({ message: "Name cannot be empty" })
  @MinLength(2, { message: "Name must be 2 symbols at least" })
  name!: string;
}
