import { Module } from "@nestjs/common";
import { RentController } from "./rent.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RentService } from "./rent.service";
import { Rent } from "./entity/rent.entity";
import { UserModule } from "../user/user.module";
import { BookModule } from "../book/book.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Rent]),
        UserModule,
        BookModule
    ],
    controllers: [RentController],
    providers: [RentService],
    exports: []
})
export class RentModule { }