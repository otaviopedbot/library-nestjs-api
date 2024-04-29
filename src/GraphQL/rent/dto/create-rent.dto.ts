import { Field, InputType } from "@nestjs/graphql"
import { IsNumber, IsNumberString } from "class-validator"


@InputType()
export class CreateRentDTO {
    
    @Field()
    @IsNumber()
    user_id: number

    @Field()
    @IsNumber()
    book_id: number

}