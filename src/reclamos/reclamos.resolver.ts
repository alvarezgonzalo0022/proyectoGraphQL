import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ReclamosService } from './reclamos.service';
import { Reclamo } from './entity/reclamo.entity';
import { CreateReclamoDTO } from './dto/create-reclamo.dto';
import { UpdateReclamoDTO } from './dto/update-reclamo.dto';
import { UseGuards } from '@nestjs/common';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver()
export class ReclamosResolver {

    constructor(
        private readonly reclamosService: ReclamosService
    ) {}
    
    @Query((returns) => [Reclamo])
    @UseGuards(JWTAuthGuard)
    reclamos(@Args('limit', { type: () => Int }) limit: number, @Args('offset', { type: () => Int }) offset: number): Promise<Reclamo[]> {
        return this.reclamosService.findAll(limit, offset);
    }

    @Query((returns) => Reclamo)
    @UseGuards(JWTAuthGuard)
    reclamo(@Args('id') id: string): Promise<Reclamo> {
        return this.reclamosService.findOne(id);
    }

    @Mutation((returns) => Reclamo)
    @UseGuards(JWTAuthGuard)
    createReclamo(@Args('createReclamoDTO') createReclamoDTO: CreateReclamoDTO): Promise<Reclamo> {
        return this.reclamosService.create(createReclamoDTO);
    }

    @Mutation((returns) => Reclamo)
    @UseGuards(JWTAuthGuard)
    updateReclamo(@Args('id') id: string, @Args('updateReclamoDTO') updateReclamoDTO: UpdateReclamoDTO): Promise<Reclamo> {
        return this.reclamosService.update(id, updateReclamoDTO);
    }

    @Mutation((returns) => Boolean)
    @UseGuards(JWTAuthGuard)
    deleteReclamo(@Args('id') id: string): Promise<boolean> {
        return this.reclamosService.deleteOne(id);
    }

}
