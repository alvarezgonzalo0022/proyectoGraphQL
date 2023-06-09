import { Field, InputType } from "@nestjs/graphql";
import { IsIn, IsOptional, IsString } from "class-validator";
import { DetalleCompraDTO } from "./create-detalle-compra.dto";

@InputType()
export class CreateReclamoDTO {

    @IsString()
    @IsIn(["Falla", "Consulta", "Reclamo"])
    @Field()
    titulo: string;

    @IsString()
    @Field()
    descripcion: string;

    @Field((type) => DetalleCompraDTO)
    detalleDeCompra: DetalleCompraDTO;

    @IsString()
    @IsOptional()
    @Field({ nullable: true })
    imgURL?: string;

    @IsString()
    @Field()
    problema: string;


}