import { Field, InputType } from "@nestjs/graphql"
import { IsNumber, IsOptional, IsString, Max, Min } from "class-validator"

@InputType()
export class CreateReviewInput {

    @Field({ nullable: true })
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