import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePostDto {

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsString()
    url: string;

    // @IsNotEmpty()
    // imagesUrls: Array<string>;

    @IsNumber()
    likes: number;
}
