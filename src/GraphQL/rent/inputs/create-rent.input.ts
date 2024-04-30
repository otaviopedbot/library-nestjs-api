import { Field, InputType } from "@nestjs/graphql"
import { IsNumber, IsNumberString } from "class-validator"


@InputType()
export class CreateRentInput {
    
    @Field()
    @IsNumber()
    user_id: number

    @Field()
    @IsNumber()
    book_id: number

}