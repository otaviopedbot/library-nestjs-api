import { IsDate, IsNumber, IsString} from "class-validator"

export class CreateRentDTO {

    @IsDate()
    title: string

    @IsNumber()
    user_id: number

    @IsNumber()
    book_id: number

}