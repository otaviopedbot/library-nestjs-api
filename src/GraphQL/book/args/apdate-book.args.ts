import { ArgsType, Field } from "@nestjs/graphql";
import { UpdatePatchBookInput } from "../inputs/update-patch-book.input";

@ArgsType()
export class UpdateBookArgs {

    @Field()
    data: UpdatePatchBookInput

}