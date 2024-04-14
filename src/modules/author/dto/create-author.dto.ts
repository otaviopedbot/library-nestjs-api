import { IsString } from "class-validator"

export class CreateAuthorDTO {

    @IsString()
    name: string

}