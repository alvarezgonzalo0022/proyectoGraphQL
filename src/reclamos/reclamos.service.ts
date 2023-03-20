import { BadRequestException, Injectable } from '@nestjs/common';
import { Reclamo } from './entity/reclamo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Column, Like, Repository } from 'typeorm';
import { CreateReclamoDTO } from './dto/create-reclamo.dto';
import { UpdateReclamoDTO } from './dto/update-reclamo.dto';
import { UsersService } from 'src/users/users.service';
import { PaginationDTO } from 'src/common/dto/pagination.dto';

@Injectable()
export class ReclamosService {

    constructor(
        @InjectRepository(Reclamo)
        private readonly reclamosRepository: Repository<Reclamo>,
        private readonly usersService: UsersService
    ) {}

    async findAll(paginationDTO: PaginationDTO): Promise<Reclamo[]> {

        const { limit = 10, offset = 0 } = paginationDTO;

        return await this.reclamosRepository.find({
            skip: offset,
            take: limit,
        })
    }
    
    async findOne(id: string): Promise<Reclamo> {
        return await this.reclamosRepository.findOneBy({id});
    }
    
    async findMany(term: string): Promise<Reclamo[]> {
        const reclamos = await this.reclamosRepository.find({
            where: {
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
            
            const reclamoAGuardar = await this.reclamosRepository.create({
                ...reclamo,
                user: reclamo.idUser ? await this.usersService.findOneByID(reclamo.idUser) : await this.usersService.create(reclamo.user)
            });
            return await this.reclamosRepository.save(reclamoAGuardar);

        } catch (error) {
            console.log(error);
            throw new Error("Error al crear el reclamo");      
        }
    }

    async update(id: string, reclamo: UpdateReclamoDTO): Promise<Reclamo> {
        const reclamoAActualizar = await this.reclamosRepository.findOneBy({id});

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

    async deleteOne(id: string): Promise<boolean> {
        const reclamoAEliminar = await this.reclamosRepository.findOneBy({id});
        if(!reclamoAEliminar) throw new BadRequestException('No existe el reclamo');

        try {
            await this.reclamosRepository.delete(reclamoAEliminar);
            return true;
        }
        catch (error) {
            throw new Error("Error al eliminar el reclamo");
            
        }
    }

}
