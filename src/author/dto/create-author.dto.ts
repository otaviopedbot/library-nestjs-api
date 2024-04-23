import { IsNotEmpty, IsString } from "class-validator"

export class CreateAuthorDTO {

    @IsNotEmpty()
    @IsString()
    name: string

}