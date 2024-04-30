import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthResolver } from "./resolve/auth.resolver";
import { UserModule } from "../user/user.module";
import { User } from "../user/entity/user.entity";
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
    providers: [AuthService, AuthResolver]

})
export class AuthModule { }