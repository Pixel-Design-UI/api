import { IsNotEmpty } from "class-validator";

export class CreateLinkDto {

    @IsNotEmpty()
    type: string;

    @IsNotEmpty()
    url: string;
}