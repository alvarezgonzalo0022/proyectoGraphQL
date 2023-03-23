import { Injectable } from '@nestjs/common';
import { initialData } from './data/seed.data';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reclamo } from 'src/reclamos/entity/reclamo.entity';
import { DetalleCompra } from 'src/reclamos/entity/detalleDeCompra.entity';


@Injectable()
export class SeedService {
  
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Reclamo)
    private readonly reclamoRepository: Repository<Reclamo>,
    @InjectRepository(DetalleCompra)
    private readonly detalleCompraRepository: Repository<DetalleCompra>,
  ) {}
    
  async runSeed(): Promise<string> {
    await this.deleteDatabase();
    await this.insertSeedUsers();
    await this.insertNewReclamos();
    return "Seed executed"
  }

  private async insertSeedUsers(){

    const seedUser = initialData.user;

    const user = this.userRepository.create({
      ...seedUser[0],
    });

    return await this.userRepository.save(user);

  }

  private async insertNewReclamos(): Promise<Reclamo> {

    const seedReclamo = initialData.reclamo;

    const user = await this.userRepository.findOneBy({"username": 'test@test.com'});

    const detalleDeCompra = this.detalleCompraRepository.create({
      ...seedReclamo[0].detalleDeCompra,
      fechaCompra: new Date(),
    })
    
    const reclamo = this.reclamoRepository.create({
      ...seedReclamo[0],
      detalleDeCompra: detalleDeCompra,
      user: user,
    });    

    return await this.reclamoRepository.save(reclamo)
  }

  private async deleteDatabase() {
    await this.userRepository.delete({});
    await this.reclamoRepository.delete({});
    await this.detalleCompraRepository.delete({});
  }

}
