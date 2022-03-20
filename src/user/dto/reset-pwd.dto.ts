import { IsEmail, IsNotEmpty, IsNumber } from "class-validator";

export class ResetPwd1Dto {

    @IsNotEmpty()
    @IsEmail()
    email: string;
}

export class ResetPwd2Dto {

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsNumber()
    code: number;
}

export class ResetPwd3Dto {

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    newPassword: number;

    @IsNotEmpty()
    @IsNumber()
    code: number;
}