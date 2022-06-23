import { IsEmail, Length } from "class-validator";

export class UpdateUserDto {
    @IsEmail()
    email: string;

    @Length(8, 48)
    password: string;

    @Length(3, 256)
    fullName: string;
}