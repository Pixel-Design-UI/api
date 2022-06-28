import { IsString } from "class-validator";

export class CreateLinkDto {

    @IsString()
    type: string;

    @IsString()
    url: string;
}