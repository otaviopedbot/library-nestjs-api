import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./resolve/auth.resolver";
import { UserModule } from "../user/user.module";
import { User } from "../user/types/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthService } from "./auth.service";
import { BookModule } from "../book/book.module";

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET
        }),
        UserModule,
        TypeOrmModule.forFeature([User]),
    ],
    controllers: [AuthController],
    providers: [AuthService]

})
export class AuthModule { }