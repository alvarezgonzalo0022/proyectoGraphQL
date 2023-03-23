import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ReclamosService } from './reclamos.service';
import { Reclamo } from './entity/reclamo.entity';
import { CreateReclamoDTO } from './dto/create-reclamo.dto';
import { UpdateReclamoDTO } from './dto/update-reclamo.dto';
import { UseGuards } from '@nestjs/common';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PaginationDTO } from 'src/common/dto/pagination.dto';

@Resolver()
export class ReclamosResolver {

    constructor(
        private readonly reclamosService: ReclamosService
    ) {}
    
    @Query((returns) => [Reclamo])
    @UseGuards(JWTAuthGuard)
    reclamos(@Args("paginationDTO") paginationDTO: PaginationDTO): Promise<Reclamo[]> {
        return this.reclamosService.findAll(paginationDTO);
    }

    @Query((returns) => Reclamo)
    @UseGuards(JWTAuthGuard)
    reclamo(@Args('nro') nro: number): Promise<Reclamo> {
        return this.reclamosService.findOne(nro);
    }

    @Query((returns) => [Reclamo])
    reclamosPorPalabra(@Args('palabra') palabra: string): Promise<Reclamo[]> {
        return this.reclamosService.findMany(palabra);
    }

    @Mutation((returns) => Reclamo)
    @UseGuards(JWTAuthGuard)
    createReclamo(@Args('createReclamoDTO') createReclamoDTO: CreateReclamoDTO): Promise<Reclamo> {                
        return this.reclamosService.create(createReclamoDTO);
    }

    @Mutation((returns) => Reclamo)
    @UseGuards(JWTAuthGuard)
    updateReclamo(@Args('nro') nro: number, @Args('updateReclamoDTO') updateReclamoDTO: UpdateReclamoDTO): Promise<Reclamo> {
        return this.reclamosService.update(nro, updateReclamoDTO);
    }

    @Mutation((returns) => Boolean)
    @UseGuards(JWTAuthGuard)
    deleteReclamo(@Args('nro') nro: number): Promise<boolean> {
        return this.reclamosService.deleteOne(nro);
    }

}