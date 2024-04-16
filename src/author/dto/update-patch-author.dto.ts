import { CreateAuthorDTO } from "./create-author.dto"
import { PartialType } from "@nestjs/mapped-types"

export class UpdatePatchAuthorDTO extends PartialType(CreateAuthorDTO) {


}   