import { IsEmail, IsNumber, IsOptional, IsString, Max, Min } from "class-validator"

export class CreateReviewDTO {

    @IsString()
    complete_name: string

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(5)
    rating: number

    @IsString()
    body: string

    @IsNumber()
    user_id: number

    @IsNumber()
    book_id: number

}