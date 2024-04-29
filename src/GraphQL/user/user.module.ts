import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { UserService } from "./user.service";
import { CloudinaryModule } from "../cloudinary/cloudinary.module";
import { UserResolver } from "./resolve/user.resolver";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        CloudinaryModule,
    ],
    providers: [UserService, UserResolver],
    exports: [UserService]
})
export class UserModule { }