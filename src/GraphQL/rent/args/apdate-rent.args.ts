import { ArgsType, Field } from "@nestjs/graphql";
import { UpdatePatchRentInput } from "../inputs/update-patch-rent.input";


@ArgsType()
export class UpdateRentArgs {

    @Field()
    data: UpdatePatchRentInput

}