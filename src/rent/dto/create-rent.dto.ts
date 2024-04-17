import { IsDate, IsNumber, IsOptional} from "class-validator"

export class CreateRentDTO {

    // @IsOptional()
    @IsDate()
    date: string

    @IsNumber()
    user_id: number

    @IsNumber()
    book_id: number

}