import { IsEmail, IsMobilePhone, IsOptional, IsString, IsStrongPassword } from "class-validator"

export class AuthLoginDTO {

    @IsEmail()
    email: string

    @IsString()
    password: string


}