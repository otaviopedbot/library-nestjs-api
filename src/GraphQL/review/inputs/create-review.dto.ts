import { Field, InputType } from "@nestjs/graphql"
import { IsNumber, IsNumberString, IsOptional, IsString, Max, Min } from "class-validator"

@InputType()
export class CreateReviewDTO {

    @Field()
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(10)
    rating: number

    @Field()
    @IsString()
    body: string

    @Field()
    @IsNumber()
    user_id: number

    @Field()
    @IsNumber()
    book_id: number

}