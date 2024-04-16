import { Module } from "@nestjs/common";
import { RentController } from "./rent.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RentService } from "./rent.service";
import { Rent } from "./entity/rent.entity";
import { UserModule } from "src/user/user.module";
import { BookModule } from "src/book/book.module";

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