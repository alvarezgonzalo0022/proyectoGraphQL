import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ReclamosService } from './reclamos.service';
import { Reclamo } from './entity/reclamo.entity';
import { CreateReclamoDTO } from './dto/create-reclamo.dto';
import { UpdateReclamoDTO } from './dto/update-reclamo.dto';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PaginationDTO } from 'src/common/dto/pagination.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';

@Resolver()
export class ReclamosResolver {

    constructor(
        private readonly reclamosService: ReclamosService
    ) {}
    
    @Query((returns) => [Reclamo])
    @UseGuards(JWTAuthGuard)
    reclamos(@Args("paginationDTO") paginationDTO: PaginationDTO, @CurrentUser() user: User): Promise<Reclamo[]> {
        return this.reclamosService.findAll(paginationDTO, user);
    }

    @Query((returns) => Reclamo)
    @UseGuards(JWTAuthGuard)
    reclamo(@Args('nro') nro: number, @CurrentUser() user: User): Promise<Reclamo> {
        return this.reclamosService.findOne(nro, user);
    }

    @Query((returns) => [Reclamo])
    @UseGuards(JWTAuthGuard)
    reclamosPorPalabraEnTituloOProblema(@Args('palabra') palabra: string, @CurrentUser() user: User): Promise<Reclamo[]> {
        return this.reclamosService.findMany(palabra, user);
    }

    @Query((returns) => [Reclamo])
    @UseGuards(JWTAuthGuard)
    reclamosPorPalabra(@Args('palabra') palabra: string, @CurrentUser() user: User): Promise<Reclamo[]> {
        return this.reclamosService.findMany(palabra, user);
    }

    @Mutation((returns) => Reclamo)
    @UseGuards(JWTAuthGuard)
    createReclamo(@Args('createReclamoDTO') createReclamoDTO: CreateReclamoDTO, @CurrentUser() user: User): Promise<Reclamo> {                
        return this.reclamosService.create(createReclamoDTO, user);
    }

    @Mutation((returns) => Reclamo)
    @UseGuards(JWTAuthGuard)
    updateReclamo(@Args('nro', ParseIntPipe) nro: number, @Args('updateReclamoDTO') updateReclamoDTO: UpdateReclamoDTO, @CurrentUser() user: User): Promise<Reclamo> {
        return this.reclamosService.update(nro, updateReclamoDTO, user);
    }

    @Mutation((returns) => Boolean)
    @UseGuards(JWTAuthGuard)
    deleteReclamo(@Args('nro') nro: number, @CurrentUser() user: User): Promise<boolean> {
        return this.reclamosService.deleteOne(nro, user);
    }

}