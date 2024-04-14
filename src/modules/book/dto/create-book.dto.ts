import { IsNumber, IsString} from "class-validator"

export class CreateBookDTO {

    @IsString()
    title: string

    @IsNumber()
    page: number

    @IsNumber()
    quantity: number

    @IsNumber()
    author_id: number

    @IsString()
    synopsis: string

    @IsString()
    cover: string

}