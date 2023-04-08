import { Test, TestingModule } from '@nestjs/testing';
import { ReclamosService } from './reclamos.service';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import { CreateReclamoDTO } from './dto/create-reclamo.dto';
import { Reclamo } from './entity/reclamo.entity';
import { DetalleCompra } from './entity/detalleDeCompra.entity';
import { User } from '../users/entities/user.entity';
import { BadRequestException } from '@nestjs/common';

describe('ReclamosService', () => {
  let service: ReclamosService;
  let usersService: UsersService;
  let reclamosRepository: Repository<Reclamo>;
  let detalleCompraRepository: Repository<DetalleCompra>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReclamosService,
        UsersService,
        { provide: 'ReclamoRepository', useClass: Repository<Reclamo> },
        { provide: 'DetalleCompraRepository', useClass: Repository<DetalleCompra> },
        { provide: 'UserRepository', useClass: Repository<User> },
      ],
    }).compile();
  
    service = module.get<ReclamosService>(ReclamosService);
    usersService = module.get<UsersService>(UsersService);
    reclamosRepository = module.get<Repository<Reclamo>>('ReclamoRepository');
    detalleCompraRepository = module.get<Repository<DetalleCompra>>('DetalleCompraRepository');
  });
  

  it('should create a new reclamo', async () => {
    const reclamoDTO: CreateReclamoDTO = {
      titulo: 'Falla',
      descripcion: 'Descripcion de la falla',
      problema: 'Problema detectado',
      detalleDeCompra: {
        fechaCompra: new Date(),
        nroFactura: 1234,
        codProd: 'ABCD1234',
      },
    };

    const userMock = {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'hashed_password',
      reclamos: [],
      username: 'Hola',
      role: 'USER'
    };

    const detalleCompraMock = {
      id: 1,
      ...reclamoDTO.detalleDeCompra,
    };

    const reclamoMock = {
      nro: 1,
      ...reclamoDTO,
      user: userMock,
      detalleDeCompra: detalleCompraMock,
    };

    jest.spyOn(usersService, 'findOneByID').mockImplementation(() => Promise.resolve(userMock));
    jest.spyOn(detalleCompraRepository, 'create').mockImplementation(() => detalleCompraMock);
    jest.spyOn(reclamosRepository, 'create').mockImplementation(() => reclamoMock);
    jest.spyOn(reclamosRepository, 'save').mockImplementation(() => Promise.resolve(reclamoMock));

    const result = await service.create(reclamoDTO, userMock);
    console.log(result);
    expect(result).toEqual(reclamoMock);
  });
  

});

