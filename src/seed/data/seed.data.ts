import * as bcrypt from 'bcrypt';
import { DetalleCompraDTO } from 'src/reclamos/dto/create-detalle-compra.dto';

interface SeedReclamo {
    titulo: string;
    descripcion: string;
    problema: string;
    detalleDeCompra: DetalleCompraDTO;
    imgURL?: string;
}

interface SeedUser {
    username: string;
    password: string;
}

interface SeedData {
    users: SeedUser[];
    reclamos: SeedReclamo[];
}

export const initialData: SeedData = {

    users: [
        {
            username: "test@test.com",
            password: bcrypt.hashSync("Abc123", 10),
        },
        {
            username: "test2@test.com",
            password: bcrypt.hashSync("123Abc", 10),
        },
        {
            username: "test3@test.com",
            password: bcrypt.hashSync("A2c1b3", 10),
        },
    ],

    reclamos: [
        {
            titulo: "Falla",
            descripcion: "Reclamo 1",
            problema: "Problema 1",
            detalleDeCompra: {
                fechaCompra: new Date(),
                nroFactura: 1,
                codProd: "Codigo prod"
            },
            imgURL: "https://www.google.com",
        },
        {
            titulo: "Consulta",
            descripcion: "Reclamo 2",
            problema: "Problema 2",
            detalleDeCompra: {
                fechaCompra: new Date(),
                nroFactura: 2,
                codProd: "Codigo prod 2"
            },
            imgURL: "https://www.google.com",
        },
        {
            titulo: "Reclamo",
            descripcion: "Reclamo 3",
            problema: "Problema 3",
            detalleDeCompra: {
                fechaCompra: new Date(),
                nroFactura: 3,
                codProd: "Codigo prod 3"
            },
            imgURL: "https://www.google.com",
        },
    ]


}