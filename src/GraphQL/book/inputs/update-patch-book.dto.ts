import { Field, InputType } from "@nestjs/graphql"
import { IsString, IsNumber, IsOptional } from "class-validator"

@InputType()
export class UpdatePatchBookDTO {

    @Field()
    @IsString()
    @IsOptional()
    title: string

    @Field()
    @IsNumber()
    @IsOptional()
    page: number

    @Field()
    @IsNumber()
    @IsOptional()
    quantity: number

    @Field()
    @IsNumber()
    @IsOptional()
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