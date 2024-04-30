import { ArgsType, Field } from "@nestjs/graphql";
import { CreateFavoriteInput } from "../inputs/create-favorite.input";


@ArgsType()
export class CreateFavoriteArgs {

    @Field()
    data: CreateFavoriteInput

}