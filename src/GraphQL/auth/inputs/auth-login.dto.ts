import { Field, InputType } from "@nestjs/graphql"
import { IsEmail, IsMobilePhone, IsOptional, IsString, IsStrongPassword } from "class-validator"

@InputType()
export class AuthLoginDTO {

    @IsEmail()
    @Field()
    email: string

    @IsString({
    })
    @Field()
    password: string


}