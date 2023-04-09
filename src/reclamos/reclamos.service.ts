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

  async findAll(paginationDTO: PaginationDTO, user: User): Promise<Reclamo[]> {
    
    const { limit = 10, offset = 0 } = paginationDTO;

    const userInDB = await this.usersService.findOneByUsername(user.username);

    if(user.role === "ADMIN") return await this.reclamosRepository.find({
      skip: offset,
      take: limit,
    });

    if(user.role === "USER") return await this.reclamosRepository.find({
        skip: offset,
        take: limit,
        where: {
          user: userInDB
        }
      });
  }

  async findOne(nro: number, user: User): Promise<Reclamo> {

    const userInDB = await this.usersService.findOneByUsername(user.username);

    try {
      if(user.role === "USER") return await this.reclamosRepository.findOneBy({ nro, user: userInDB });
      if(user.role === "ADMIN") return await this.reclamosRepository.findOneBy({ nro });
    } catch (error) {
      throw new BadRequestException('No existe reclamo con ese nro asociado al usuario provisto');
    }
    
  }

  async findManyInTituloOrProblema(term: string, user: User): Promise<Reclamo[]> {

    const userInDB = await this.usersService.findOneByUsername(user.username);

    if(user.role === "USER") return await this.reclamosRepository.find({
      where: {
        titulo: Like(`%${term}%`),
        problema: Like(`%${term}%`),
        user: userInDB
      },
    })

    if(user.role === "ADMIN") return await this.reclamosRepository.find({
      where: {
        titulo: Like(`%${term}%`),
        problema: Like(`%${term}%`),
      },
    });

  }

  async findMany(term: string, user: User): Promise<Reclamo[]> {

    const userInDB = await this.usersService.findOneByUsername(user.username);

    if(user.role === "USER") return await this.reclamosRepository.find({
      where: {
        titulo: Like(`%${term}%`),
        descripcion: Like(`%${term}%`),
        problema: Like(`%${term}%`),
        user: userInDB
      },
    });

    if(user.role === "ADMIN") return await this.reclamosRepository.find({
      where: {
        titulo: Like(`%${term}%`),
        descripcion: Like(`%${term}%`),
        problema: Like(`%${term}%`),
      },
    });
  }

  async create(reclamo: CreateReclamoDTO, user: User): Promise<Reclamo> {
    
    const detalleDeCompra = this.detalleCompraRepository.create(reclamo.detalleDeCompra);

    try {
      const reclamoAGuardar = this.reclamosRepository.create({
        ...reclamo,
        detalleDeCompra: detalleDeCompra,
        user: await this.usersService.findOneByUsername(user.username),
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

  async update(nro: number, reclamo: UpdateReclamoDTO, user: User): Promise<Reclamo> {

    const reclamoAActualizar = await this.findOne(nro, user);
    if (!reclamoAActualizar) throw new BadRequestException('No existe el reclamo');

    const detalleDeCompraAActualizar = reclamo.detalleDeCompra ? await this.detalleCompraRepository.findOneBy({ id: reclamoAActualizar.detalleDeCompra.id }) : null;


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

  async deleteOne(nro: number, user: User): Promise<boolean> {
    const reclamoAEliminar = await this.findOne(nro, user);
    if (!reclamoAEliminar) throw new BadRequestException('No existe el reclamo');

    try {
      await this.reclamosRepository.delete(reclamoAEliminar);
      await this.detalleCompraRepository.delete(reclamoAEliminar.nro);
      return true;
    } catch (error) {
      throw new Error('Error al eliminar el reclamo');
    }
  }

  async addImgToReclamo(nro: number, imgURL: string, user: User): Promise<Reclamo> {
    const reclamo = await this.findOne(nro, user);

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
