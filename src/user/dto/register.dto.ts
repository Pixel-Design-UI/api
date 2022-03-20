import { IsBoolean, IsEmail, IsNotEmpty, IsString, Length, Min } from "class-validator";

export class RegisterDto {

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Length(8, 24)
    password: string;

    @IsNotEmpty()
    @Length(3, 256)
    fullName: string;
}