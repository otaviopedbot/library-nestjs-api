import { CreateReviewDTO } from "./create-review.dto"
import { PartialType } from "@nestjs/mapped-types"

export class UpdatePatchReviewDTO extends PartialType(CreateReviewDTO) {


}