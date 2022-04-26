import { IsEmail, IsNumber, Length } from "class-validator";

export class AskResetDto {
    @IsEmail()
    email: string;
}

export class CheckCodeDto {
    @IsEmail()
    email: string;

    @IsNumber()
    code: number;
}

export class SetNewPwdDto {
    @IsEmail()
    email: string;

    @Length(8, 48)
    newPassword: string;

    @IsNumber()
    code: number;
}