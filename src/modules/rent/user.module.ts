import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entity/rent.entity";

@Module({
    imports:[
        TypeOrmModule.forFeature([User])
    ],
    controllers:[UserController],
    providers: [],
    exports: []
})
export class UserModule {}