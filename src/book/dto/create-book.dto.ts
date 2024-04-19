import { IsNumber, IsNumberString, IsOptional, IsString,} from "class-validator"

export class CreateBookDTO {

    @IsString()
    title: string

    @IsNumberString()
    page: number

    @IsNumberString()
    quantity: number

    @IsNumberString()
    author_id: number

    @IsOptional()
    @IsString()
    synopsis: string

}