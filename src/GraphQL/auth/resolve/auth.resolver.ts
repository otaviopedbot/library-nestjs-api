import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthLoginDTO } from "../inputs/auth-login.dto";
import { AuthRegisterDTO } from "../inputs/auth-register.dto";
import { UserService } from "../../user/user.service";
import { AuthService } from "../auth.service";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { User } from "../../user/entity/user.entity";


@Resolver('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) { }

    @Mutation()
    async login(@Args('data') data: AuthLoginDTO) {
        return this.authService.login(data.email, data.password);
    }

    @Mutation(() => User)
    async register(@Args('data') data: AuthRegisterDTO) {
        return this.authService.register(data)
    }

}