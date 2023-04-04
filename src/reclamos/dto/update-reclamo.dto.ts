
import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { DetalleCompra } from "../entity/detalleDeCompra.entity";
import { DetalleCompraDTO } from "./create-detalle-compra.dto";

@InputType()
export class UpdateReclamoDTO {

    @IsString()
    @IsOptional()
    @Field({ nullable: true })
    descripcion?: string;

    @IsString()
    @IsOptional()
    @Field((type) => DetalleCompraDTO, { nullable: true })
    detalleDeCompra?: DetalleCompraDTO;

    @IsString()
    @IsOptional()
    @Field({ nullable: true })
    problema?: string;

}