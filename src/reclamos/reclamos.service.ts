import { BadRequestException, Injectable } from '@nestjs/common';
import { Reclamo } from './entity/reclamo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateReclamoDTO } from './dto/create-reclamo.dto';
import { UpdateReclamoDTO } from './dto/update-reclamo.dto';
import { UsersService } from '../users/users.service';
import { PaginationDTO } from 'src/common/dto/pagination.dto';
import { DetalleCompra } from './entity/detalleDeCompra.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ReclamosService {
  constructor(
    @InjectRepository(Reclamo)
    private readonly reclamosRepository: Repository<Reclamo>,
    @InjectRepository(DetalleCompra)
    private readonly detalleCompraRepository: Repository<DetalleCompra>,
    private readonly usersService: UsersService,
  ) {}

  async findAll(paginationDTO: PaginationDTO): Promise<Reclamo[]> {
    const { limit = 10, offset = 0 } = paginationDTO;

    const reclamos = await this.reclamosRepository.find({
      skip: offset,
      take: limit,
    });

    return reclamos;
  }

  async findOne(nro: number): Promise<Reclamo> {
    const reclamo = await this.reclamosRepository.findOneBy({ nro });

    return reclamo;
  }

  async findManyInTituloOrProblema(term: string): Promise<Reclamo[]> {
    const reclamos = await this.reclamosRepository.find({
      where: {
        titulo: Like(`%${term}%`),
        problema: Like(`%${term}%`),
      },
    });

    return reclamos;
  }

  async findMany(term: string): Promise<Reclamo[]> {
    const reclamos = await this.reclamosRepository.find({
      where: {
        titulo: Like(`%${term}%`),
        descripcion: Like(`%${term}%`),
        problema: Like(`%${term}%`),
      },
    });

    return reclamos;
  }

  async create(reclamo: CreateReclamoDTO, user: User): Promise<Reclamo> {

    const userSavingReclamo = await this.usersService.findOneByID(user.id);
    if (!user) throw new BadRequestException('No existe el usuario');
    const detalleDeCompra = this.detalleCompraRepository.create(
      reclamo.detalleDeCompra,
    );

    try {
      const reclamoAGuardar = this.reclamosRepository.create({
        ...reclamo,
        detalleDeCompra: detalleDeCompra,
        user: userSavingReclamo,
      });

      const reclamoGuardado = await this.reclamosRepository.save(
        reclamoAGuardar,
      );
      return reclamoGuardado;
    } catch (error) {
      console.log(error);
      throw new Error('Error al crear el reclamo');
    }
  }

  async update(nro: number, reclamo: UpdateReclamoDTO): Promise<Reclamo> {

    const reclamoAActualizar = await this.findOne(nro);
    const detalleDeCompraAActualizar = reclamo.detalleDeCompra ? await this.detalleCompraRepository.findOneBy({ id: reclamoAActualizar.detalleDeCompra.id }) : null;

    if (!reclamoAActualizar)
      throw new BadRequestException('No existe el reclamo');

    try {

      const detalleDeCompraAGuardar = detalleDeCompraAActualizar !== null ? this.detalleCompraRepository.create({ ...detalleDeCompraAActualizar, ...reclamo.detalleDeCompra }) : reclamoAActualizar.detalleDeCompra;
      
      const reclamoAGuardar = this.reclamosRepository.create({
        ...reclamoAActualizar,
        ...reclamo,
        detalleDeCompra: detalleDeCompraAGuardar
      })
      

      return await this.reclamosRepository.save(reclamoAGuardar)
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Error al actualizar el reclamo');  
    }

  }

  async deleteOne(nro: number): Promise<boolean> {
    const reclamoAEliminar = await this.findOne(nro);
    if (!reclamoAEliminar)
      throw new BadRequestException('No existe el reclamo');

    try {
      await this.reclamosRepository.delete(reclamoAEliminar);
      await this.detalleCompraRepository.delete(reclamoAEliminar.nro);
      return true;
    } catch (error) {
      throw new Error('Error al eliminar el reclamo');
    }
  }

  async addImgToReclamo(nro: number, imgURL: string): Promise<Reclamo> {
    const reclamo = await this.findOne(nro);

    if (!reclamo) throw new BadRequestException('No existe el reclamo');

    const reclamoAGuardar = this.reclamosRepository.create({
      ...reclamo,
      imgURL,
    });

    try {
      const reclamoGuardado = await this.reclamosRepository.save(
        reclamoAGuardar,
      );
      return reclamoGuardado;
    } catch (error) {
      console.log(error);
      throw new Error('Error al agregar la imagen al reclamo');
    }
  }
}
