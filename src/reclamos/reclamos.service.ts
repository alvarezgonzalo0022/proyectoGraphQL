import { BadRequestException, Injectable } from '@nestjs/common';
import { Reclamo } from './entity/reclamo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Column, Like, Repository } from 'typeorm';
import { CreateReclamoDTO } from './dto/create-reclamo.dto';
import { UpdateReclamoDTO } from './dto/update-reclamo.dto';
import { UsersService } from 'src/users/users.service';
import { PaginationDTO } from 'src/common/dto/pagination.dto';
import { DetalleCompra } from './entity/detalleDeCompra.entity';

@Injectable()
export class ReclamosService {

    constructor(
        @InjectRepository(Reclamo)
        private readonly reclamosRepository: Repository<Reclamo>,
        @InjectRepository(DetalleCompra)
        private readonly detalleCompraRepository: Repository<DetalleCompra>,
        private readonly usersService: UsersService
    ) {}

    async findAll(paginationDTO: PaginationDTO): Promise<Reclamo[]> {

        const { limit = 10, offset = 0 } = paginationDTO;

        return await this.reclamosRepository.find({
            skip: offset,
            take: limit,
        })
    }
    
    async findOne(nro: number): Promise<Reclamo> {
        return await this.reclamosRepository.findOneBy({nro});
    }

    async findManyInTituloOrProblema(term: string): Promise<Reclamo[]> {
        const reclamos = await this.reclamosRepository.find({
            where: {
                titulo: Like(`%${term}%`),
                problema: Like(`%${term}%`),
            }
        });
        return reclamos;
    }
    
    async findMany(term: string): Promise<Reclamo[]> {
        const reclamos = await this.reclamosRepository.find({
            where: {
                titulo: Like(`%${term}%`),
                descripcion: Like(`%${term}%`),
                problema: Like(`%${term}%`),
            }
        });
        return reclamos;
    }

    async create(reclamo: CreateReclamoDTO): Promise<Reclamo> {
        

        if(!reclamo.idUser && !reclamo.user) throw new BadRequestException('Debe ingresar un usuario');
        if(reclamo.idUser && reclamo.user) throw new BadRequestException('Debe ingresar un usuario o un usuario nuevo, no ambos');

        try {
            
            const reclamoAGuardar = this.reclamosRepository.create({
                ...reclamo,
                detalleDeCompra: this.detalleCompraRepository.create({
                    ...reclamo.detalleDeCompra,
                    fechaCompra: new Date(),
                }),
                user: reclamo.idUser ? await this.usersService.findOneByID(reclamo.idUser) : await this.usersService.create(reclamo.user)
            });
            
            const reclamoGuardado = await this.reclamosRepository.save(reclamoAGuardar);
            return reclamoGuardado;

        } catch (error) {
            console.log(error);
            throw new Error("Error al crear el reclamo");      
        }
    }

    async update(nro: number, reclamo: UpdateReclamoDTO): Promise<Reclamo> {

        if(reclamo.detalleDeCompra.fechaCompra) throw new BadRequestException('No se puede modificar la fecha de compra');

        const reclamoAActualizar = await this.reclamosRepository.findOneBy({nro});

        if(!reclamoAActualizar) throw new BadRequestException('No existe el reclamo');

        try {
            const reclamoAGuardar = {
                ...reclamo,
                ...reclamoAActualizar,
            }
            await this.reclamosRepository.save(reclamoAGuardar);
            return reclamoAGuardar;
        } catch (error) {
            console.log(error);
            
            throw new Error("Error al actualizar el reclamo");
            
        }
    }

    async deleteOne(nro: number): Promise<boolean> {
        const reclamoAEliminar = await this.reclamosRepository.findOneBy({nro});
        if(!reclamoAEliminar) throw new BadRequestException('No existe el reclamo');

        try {
            await this.reclamosRepository.delete(reclamoAEliminar);
            return true;
        }
        catch (error) {
            throw new Error("Error al eliminar el reclamo");
            
        }
    }

    async addImgToReclamo(nro: number, imgURL: string): Promise<Reclamo> {
        const reclamo = await this.findOne(nro);

        if(!reclamo) throw new BadRequestException('No existe el reclamo');

        const reclamoAGuardar = this.reclamosRepository.create({
            ...reclamo,
            imgURL,
        })

        try {
            const reclamoGuardado = await this.reclamosRepository.save(reclamoAGuardar);
            return reclamoGuardado
        }
        catch (error) {
            console.log(error);
            throw new Error("Error al agregar la imagen al reclamo");   
        }
    }

}
