import { IsEmail, IsMobilePhone, IsString, IsStrongPassword } from "class-validator"

export class CreateUserDTO {

    @IsString()
    complete_name: string

    @IsMobilePhone('pt-BR')
    phone: string

    @IsString()
    address: string

    @IsString()
    username: string

    @IsEmail()
    email: string

    @IsStrongPassword({
        minLength: 6,
        minNumbers: 0,
        minLowercase: 0,
        minUppercase: 0,
        minSymbols: 0
    })
    password: string

}