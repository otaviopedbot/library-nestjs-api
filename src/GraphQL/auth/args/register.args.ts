import { ArgsType, Field } from "@nestjs/graphql";
import { AuthRegisterInput } from "../inputs/auth-register.input";

@ArgsType()
export class RegisterArgs {

    @Field()
    data: AuthRegisterInput

}