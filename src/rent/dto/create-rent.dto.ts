import { IsNumber } from "class-validator"

export class CreateRentDTO {

    @IsNumber()
    user_id: number

    @IsNumber()
    book_id: number

}