
import { Field, InputType, Int } from "@nestjs/graphql";
import { IsIn, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { DetalleCompra } from "../entity/detalleDeCompra.entity";
import { DetalleCompraDTO } from "./create-detalle-compra.dto";
import { UpdateDetalleCompraDTO } from "./update-detalle-compra.dto";

@InputType()
export class UpdateReclamoDTO {

    @IsString()
    @IsIn(["Falla", "Consulta", "Reclamo"])
    @Field()
    @IsOptional()
    titulo?: string;

    @IsString()
    @IsOptional()
    @Field({ nullable: true })
    descripcion?: string;

    @IsOptional()
    @Field((type) => UpdateDetalleCompraDTO, { nullable: true })
    detalleDeCompra?: UpdateDetalleCompraDTO;

    @IsString()
    @IsOptional()
    @Field({ nullable: true })
    problema?: string;

}