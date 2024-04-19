import { IsNumber, IsNumberString } from "class-validator"

export class CreateRentDTO {

    @IsNumberString()
    user_id: number

    @IsNumberString()
    book_id: number

}