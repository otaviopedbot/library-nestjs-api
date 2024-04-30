import { ArgsType, Field } from "@nestjs/graphql";
import { CreateReviewInput } from "../inputs/create-review.input";


@ArgsType()
export class CreateReviewArgs {

    @Field()
    data: CreateReviewInput

}