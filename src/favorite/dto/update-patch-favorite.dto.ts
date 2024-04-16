import { CreateFavoriteDTO } from "./create-favorite.dto"
import { PartialType } from "@nestjs/mapped-types"

export class UpdatePatchFavoriteDTO extends PartialType(CreateFavoriteDTO) {


}   