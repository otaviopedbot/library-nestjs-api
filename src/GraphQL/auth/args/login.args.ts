import { ArgsType, Field } from "@nestjs/graphql";
import { AuthLoginInput } from "../inputs/auth-login.input";

@ArgsType()
export class LoginArgs {

    @Field()
    data: AuthLoginInput

}