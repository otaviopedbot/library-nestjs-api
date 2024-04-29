import { Field, InputType } from "@nestjs/graphql"
import { IsNumber, IsOptional, IsString,} from "class-validator"

@InputType()
export class CreateBookInput {

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

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    synopsis: string

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    cover: string

}