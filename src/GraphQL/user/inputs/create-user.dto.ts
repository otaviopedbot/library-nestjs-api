import { Field, InputType } from "@nestjs/graphql"
import { IsEmail, IsMobilePhone, IsOptional, IsString, IsStrongPassword } from "class-validator"

@InputType()
export class CreateUserDTO {

    @Field()
    @IsString()
    complete_name: string

    @Field()
    @IsMobilePhone('pt-BR')
    phone: string

    @Field()
    @IsString()
    address: string

    @Field()
    @IsString()
    username: string

    @Field()
    @IsEmail()
    email: string

    @Field()
    @IsStrongPassword({
        minLength: 6,
        minNumbers: 0,
        minLowercase: 0,
        minUppercase: 0,
        minSymbols: 0
    })
    password: string

    @Field()
    @IsOptional()
    @IsString()
    image: string

    @Field()
    @IsOptional()
    @IsString()
    details: string

}