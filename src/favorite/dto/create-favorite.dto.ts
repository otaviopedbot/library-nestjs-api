import { IsNumber, IsNumberString } from "class-validator"

export class CreateFavoriteDTO {

    @IsNumberString()
    user_id: number

    @IsNumberString()
    book_id: number

}