import { IsNumber, IsOptional } from "class-validator"
import { Field, InputType } from "@nestjs/graphql"

@InputType()
export class UpdatePatchRentInput {

    @Field({ nullable: true })
    @IsNumber()
    @IsOptional()
    user_id: number

    @Field({ nullable: true })
    @IsNumber()
    @IsOptional()
    book_id: number

}