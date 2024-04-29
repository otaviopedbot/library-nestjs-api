import { ArgsType, Field } from "@nestjs/graphql";
import { UpdatePatchAuthorInput } from "../inputs/update-patch-author.input";

@ArgsType()
export class UpdateAuthorArgs {

    @Field()
    data: UpdatePatchAuthorInput

}