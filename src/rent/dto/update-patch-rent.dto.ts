import { CreateRentDTO } from "./create-rent.dto"
import { PartialType } from "@nestjs/mapped-types"

export class UpdatePatchRentDTO extends PartialType(CreateRentDTO) {


}