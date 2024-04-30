import { ArgsType, Field } from "@nestjs/graphql";
import { UpdatePatchUserInput } from "../inputs/update-patch-user.input";

@ArgsType()
export class UpdateUserArgs {

    @Field()
    data: UpdatePatchUserInput

}