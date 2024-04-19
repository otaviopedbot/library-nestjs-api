import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { User } from "src/user/entity/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthService } from "./auth.service";

@Module({
    imports: [
        JwtModule.register({
        secret: "segredosecretosegredosecreto0123456789"
    }),
        UserModule,
        TypeOrmModule.forFeature([User]),
    ],
    controllers: [AuthController],
    providers: [AuthService]

})
export class AuthModule { }