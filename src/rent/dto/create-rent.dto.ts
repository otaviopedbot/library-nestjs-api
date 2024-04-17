import { IsDate, IsNumber, IsOptional} from "class-validator"

export class CreateRentDTO {

    @IsNumber()
    user_id: number

    @IsNumber()
    book_id: number

}