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

    const seedUsers = initialData.users;
    const usersToSave = []

    seedUsers.forEach((user) => {
      const userToSave = this.userRepository.create(user);
      usersToSave.push(userToSave);
    })
    await this.userRepository.save(usersToSave);
  }

  private async insertNewReclamos() {

    const seedReclamos = initialData.reclamos;

    const users = await this.userRepository.find()    

    seedReclamos.forEach(async (reclamo, index) => {
      const detalleDeCompra = this.detalleCompraRepository.create({
        ...reclamo.detalleDeCompra,
        fechaCompra: new Date(),
      })
      const reclamoToSave = this.reclamoRepository.create({
        ...reclamo,
        detalleDeCompra: detalleDeCompra,
        user: users[index],
      })
      await this.reclamoRepository.save(reclamoToSave);
    })
  }

  private async deleteDatabase() {
    await this.userRepository.delete({});
    await this.reclamoRepository.delete({});
    await this.detalleCompraRepository.delete({});
  }

}
