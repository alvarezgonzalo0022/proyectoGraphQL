import * as bcrypt from 'bcrypt';
import { DetalleCompraDTO } from 'src/reclamos/dto/create-detalle-compra.dto';
import { DetalleCompra } from 'src/reclamos/entity/detalleDeCompra.entity';

interface SeedReclamo {
    descripcion: string;
    problema: string;
    detalleDeCompra: DetalleCompraDTO;
    imgURL?: string;
    user?: SeedUser;
}

interface SeedUser {
    username: string;
    password: string;
}

interface SeedData {
    user: SeedUser[];
    reclamo: SeedReclamo[];
}

export const initialData: SeedData = {

    user: [
        {
            username: "test@test.com",
            password: bcrypt.hashSync("Abc123", 10),
        },
    ],

    reclamo: [
        {
            descripcion: "Reclamo 1",
            problema: "Problema 1",
            detalleDeCompra: {
                nroFactura: 1,
                codProd: "Codigo prod"
            },
            imgURL: "https://www.google.com",
        },
    ]


}