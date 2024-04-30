import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { UserService } from "../../../user/user.service";
import { AuthService } from "../../../auth/auth.service";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { User } from "../../../user/entity/user.entity";
import { LoginArgs } from "../args/login.args";
import { RegisterArgs } from "../args/register.args";
import { RegisterUserType, UserType } from "../../user/types/user.type";


@Resolver('auth')
export class AuthResolver {

    constructor(
        private readonly authService: AuthService,
    ) { }

    @Mutation(() => RegisterUserType)
    async login(@Args() args: LoginArgs): Promise<RegisterUserType> {
        return this.authService.login(args.data.email, args.data.password);
    }

    @Mutation(() => RegisterUserType)
    async registerUser(@Args() args: RegisterArgs): Promise<RegisterUserType> {
        return this.authService.register(args.data)
    }

}