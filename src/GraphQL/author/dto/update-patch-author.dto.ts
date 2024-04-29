import { Field, InputType } from "@nestjs/graphql"
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

@InputType()
export class UpdatePatchAuthorDTO {
    @Field()
    @IsOptional()
    @IsString()
    name: string;
}
