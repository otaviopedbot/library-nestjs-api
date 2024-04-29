import { Field, InputType } from "@nestjs/graphql"
import { IsNumber, IsOptional, IsString,} from "class-validator"

@InputType()
export class CreateBookDTO {

    @Field()
    @IsString()
    title: string

    @Field()
    @IsNumber()
    page: number

    @Field()
    @IsNumber()
    quantity: number

    @Field()
    @IsNumber()
    author_id: number

    @Field()
    @IsOptional()
    @IsString()
    synopsis: string

    @Field()
    @IsOptional()
    @IsString()
    cover: string

}