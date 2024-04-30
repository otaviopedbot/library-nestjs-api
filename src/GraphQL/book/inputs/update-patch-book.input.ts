import { Field, InputType } from "@nestjs/graphql"
import { IsString, IsNumber, IsOptional } from "class-validator"

@InputType()
export class UpdatePatchBookInput {

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    title: string

    @Field({ nullable: true })
    @IsNumber()
    @IsOptional()
    page: number

    @Field({ nullable: true })
    @IsNumber()
    @IsOptional()
    quantity: number

    @Field({ nullable: true })
    @IsNumber()
    @IsOptional()
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