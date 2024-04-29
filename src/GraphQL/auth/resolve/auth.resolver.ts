import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthLoginDTO } from "../dto/auth-login.dto";
import { AuthRegisterDTO } from "../dto/auth-register.dto";
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
    async login(@Args() { email, password }: AuthLoginDTO) {
        return this.authService.login(email, password);
    }

    @Mutation(() => User)
    async register(@Args() data: AuthRegisterDTO) {
        return this.authService.register(data)
    }

}