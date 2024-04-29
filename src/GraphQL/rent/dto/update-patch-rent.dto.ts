import { IsNumber, IsOptional } from "class-validator"
import { PartialType } from "@nestjs/mapped-types"
import { Field, InputType } from "@nestjs/graphql"

@InputType()
export class UpdatePatchRentDTO {

    @Field()
    @IsNumber()
    @IsOptional()
    user_id: number

    @Field()
    @IsNumber()
    @IsOptional()
    book_id: number

}