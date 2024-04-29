import { Field, InputType } from "@nestjs/graphql"
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

@InputType()
export class UpdatePatchAuthorInput {
    @Field()
    @IsOptional()
    @IsString()
    name: string;
}
