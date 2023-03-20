import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";

@InputType()
export class PaginationDTO {

    @IsNumber()
    @IsPositive()
    @IsOptional()
    @Field((type) => Int, { nullable: true })
    limit?: number;

    @IsNumber()
    @Min(0)
    @IsOptional()
    @Field((type) => Int, { nullable: true })
    offset?: number;


}