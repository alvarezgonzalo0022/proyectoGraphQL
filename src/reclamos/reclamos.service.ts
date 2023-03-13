import { BadRequestException, Injectable } from '@nestjs/common';
import { Reclamo } from './entity/reclamo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReclamoDTO } from './dto/create-reclamo.dto';
import { UpdateReclamoDTO } from './dto/update-reclamo.dto';

@Injectable()
export class ReclamosService {

    constructor(
        @InjectRepository(Reclamo)
        private readonly reclamosRepository: Repository<Reclamo>
    ) {}

    async findAll(limit: number, offset: number): Promise<Reclamo[]> {

        return await this.reclamosRepository.find({
            skip: offset,
            take: limit,
        })
    }

    async findOne(id: string): Promise<Reclamo> {
        return await this.reclamosRepository.findOneBy({id});
    }

    async create(reclamo: CreateReclamoDTO): Promise<Reclamo> {
        const reclamoAGuardar = await this.reclamosRepository.create(reclamo);
        return await this.reclamosRepository.save(reclamoAGuardar);
    }

    async update(id: string, reclamo: UpdateReclamoDTO): Promise<Reclamo> {
        const reclamoAActualizar = await this.reclamosRepository.findOneBy({id});

        if(!reclamoAActualizar) throw new BadRequestException('No existe el reclamo');

        try {
            const reclamoAGuardar = {
                ...reclamoAActualizar,
                ...reclamo,
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
