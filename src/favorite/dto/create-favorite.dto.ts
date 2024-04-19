import { IsNumber, IsNumberString } from "class-validator"

export class CreateFavoriteDTO {

    @IsNumber()
    user_id: number

    @IsNumber()
    book_id: number

}