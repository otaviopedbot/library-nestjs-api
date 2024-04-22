import { CreateBookDTO } from "./create-book.dto"
import { PartialType } from "@nestjs/mapped-types"

export class UpdatePatchBookDTO extends PartialType(CreateBookDTO) {


}