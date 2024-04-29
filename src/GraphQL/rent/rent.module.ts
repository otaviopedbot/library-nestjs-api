import { Module } from "@nestjs/common";
import { RentResolver } from "./resolve/rent.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RentService } from "./rent.service";
import { Rent } from "./types/rent.entity";
import { UserModule } from "../user/user.module";
import { BookModule } from "../book/book.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Rent]),
        UserModule,
        BookModule
    ],
    providers: [RentService, RentResolver],
    exports: []
})
export class RentModule { }