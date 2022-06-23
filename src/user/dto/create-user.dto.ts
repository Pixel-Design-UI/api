import { IsEmail, Length } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    email: string;

    @Length(8, 48)
    password: string;

    @Length(3, 24)
    username: string;
}