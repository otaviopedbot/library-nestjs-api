import { IsNumber } from "class-validator"

export class CreateFavoriteDTO {

    @IsNumber()
    user_id: number

    @IsNumber()
    book_id: number

}