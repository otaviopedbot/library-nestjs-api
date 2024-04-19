import { IsNumber, IsOptional, IsString,} from "class-validator"

export class CreateBookDTO {

    @IsOptional()
    @IsString()
    title: string

    @IsOptional()
    @IsNumber()
    page: number

    @IsOptional()
    @IsNumber()
    quantity: number

    @IsOptional()
    @IsNumber()
    author_id: number

    @IsOptional()
    @IsString()
    synopsis: string

    @IsOptional()
    @IsString()
    cover: string

}