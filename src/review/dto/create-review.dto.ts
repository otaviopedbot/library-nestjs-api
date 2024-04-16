import { IsEmail, IsNumber, IsString } from "class-validator"

export class CreateReviewDTO {

    @IsString()
    complete_name: string

    @IsNumber()
    rating: number

    @IsString()
    body: string

    @IsNumber()
    user_id: number

    @IsNumber()
    book_id: number

}