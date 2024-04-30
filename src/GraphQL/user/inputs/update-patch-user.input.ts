import { IsEmail, IsMobilePhone, IsOptional, IsString, IsStrongPassword } from "class-validator"
import { Field, InputType } from "@nestjs/graphql"

@InputType()
export class UpdatePatchUserInput {

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    complete_name: string

    @Field({ nullable: true })
    @IsMobilePhone('pt-BR')
    @IsOptional()
    phone: string

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    address: string

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    username: string

    @Field({ nullable: true })
    @IsEmail()
    @IsOptional()
    email: string

    @Field({ nullable: true })
    @IsOptional()
    @IsStrongPassword({
        minLength: 6,
        minNumbers: 0,
        minLowercase: 0,
        minUppercase: 0,
        minSymbols: 0
    })
    password: string

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    details: string

}