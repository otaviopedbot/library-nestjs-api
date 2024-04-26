import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthLoginDTO } from "./dto/auth-login.dto";
import { AuthRegisterDTO } from "./dto/auth-register.dto.ts";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";


@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) { }

    @Post('login')
    async login(@Body() { email, password }: AuthLoginDTO) {
        return this.authService.login(email, password);
    }

    @Post('register')
    async register(@Body() data: AuthRegisterDTO) {
        return this.authService.register(data)
    }

    // @Post('forget')
    // async forget(@Body() { email }: AuthForgetDTO) {
    //     return this.authService.forget(email);
    // }

    // @Post('reset')
    // async reset(@Body() { password, token }: AuthResetDTO) {
    //     return this.authService.reset(password, token);
    // }

}