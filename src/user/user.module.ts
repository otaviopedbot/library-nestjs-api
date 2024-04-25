import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { UserService } from "./user.service";
import { CloudinaryModule } from "../cloudinary/cloudinary.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        CloudinaryModule,
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule { }