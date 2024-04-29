import { IsEmail, IsMobilePhone, IsOptional, IsString, IsStrongPassword } from "class-validator"
import { Field, InputType } from "@nestjs/graphql"

@InputType()
export class UpdatePatchUserDTO {

    @Field()
    @IsString()
    @IsOptional()
    complete_name: string

    @Field()
    @IsMobilePhone('pt-BR')
    @IsOptional()
    phone: string

    @Field()
    @IsString()
    @IsOptional()
    address: string

    @Field()
    @IsString()
    @IsOptional()
    username: string

    @Field()
    @IsEmail()
    @IsOptional()
    email: string

    @Field()
    @IsOptional()
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