import { IsNumber, IsNumberString, IsOptional, IsString, Max, Min } from "class-validator"

export class CreateReviewDTO {

    @IsOptional()
    @IsNumberString()
    @Min(0)
    @Max(5)
    rating: number

    @IsString()
    body: string

    @IsNumberString()
    user_id: number

    @IsNumberString()
    book_id: number

}