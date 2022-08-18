import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Client } from './client.entity';
import { CreateClientDto } from './dto/client-create.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client) private clientRepository: Repository<Client>,
    private readonly dataSource: DataSource
  ) { }

  async findAll(query, accountId): Promise<{ data; count }> {
    const take = query.take || 20;
    const skip = query.skip || 0;
    const [data, count] = await this.dataSource
      .getRepository(Client)
      .createQueryBuilder('client')
      .select(['client.id',
        'client.name',
        'client.emailId',
        'client.websiteUrl',
        'client.address1',
        'client.address2',
        'client.zipCode',
        'client.boardNumber',
        'country.id',
        'country.name',
        'state.id',
        'state.name',
        'city.id',
        'city.name',
        'user.id',
        'user.username',
        'account.id',
        'account.name',
        'vendor.id',
        'vendor.name',
        'parentVendor.id',
        'parentVendor.name',
        'client.creationTime',
        'client.updationTime'
      ])
      .where('vendor.accountId =:accountId', { accountId })
      .leftJoin('client.user', 'user')
      .leftJoin('client.country', 'country')
      .leftJoin('client.state', 'state')
      .leftJoin('client.city', 'city')
      .leftJoin('client.account', 'account')
      .leftJoin('client.vendor', 'vendor')
      .leftJoin('client.parentVendor', 'parentVendor')
      .take(take)
      .skip(skip)
      .orderBy('vendor.name', 'ASC')
      .getManyAndCount();

    return {
      data: data,
      count
    }
  }

  async findClientById(id): Promise<Client> {
    return await this.dataSource
      .getRepository(Client)
      .createQueryBuilder('client')
      .select(['client.id',
        'client.name',
        'client.emailId',
        'client.websiteUrl',
        'client.address1',
        'client.address2',
        'client.zipCode',
        'client.boardNumber',
        'country.id',
        'country.name',
        'state.id',
        'state.name',
        'city.id',
        'city.name',
        'user.id',
        'user.username',
        'account.id',
        'account.name',
        'vendor.id',
        'vendor.name',
        'parentVendor.id',
        'parentVendor.name',
        'client.creationTime',
        'client.updationTime'
      ])
      .where('client.id =:id', { id })
      .leftJoin('client.user', 'user')
      .leftJoin('client.country', 'country')
      .leftJoin('client.state', 'state')
      .leftJoin('client.city', 'city')
      .leftJoin('client.account', 'account')
      .leftJoin('client.vendor', 'vendor')
      .leftJoin('client.parentVendor', 'parentVendor')
      .getOne();
  }

  async findClientByVendorId(vendorId): Promise<Client[]> {
    return await this.dataSource
      .getRepository(Client)
      .createQueryBuilder('client')
      .select(['client.id',
        'client.name',
        'vendor.id',
        'vendor.name',
        'parentVendor.id',
        'parentVendor.name',
        'client.creationTime',
        'client.updationTime'
      ])
      .where('client.vendorId =:vendorId', { vendorId })
      .leftJoin('client.vendor', 'vendor')
      .leftJoin('client.parentVendor', 'parentVendor')
      .getMany();
  }

  async findClientByParentVendorId(parentVendorId): Promise<Client[]> {
    return await this.dataSource
      .getRepository(Client)
      .createQueryBuilder('client')
      .select(['client.id',
        'client.name',
        'vendor.id',
        'vendor.name',
        'parentVendor.id',
        'parentVendor.name',
        'client.creationTime',
        'client.updationTime'
      ])
      .where('client.parentVendorId =:parentVendorId', { parentVendorId })
      .leftJoin('client.vendor', 'vendor')
      .leftJoin('client.parentVendor', 'parentVendor')
      .getMany();
  }


  async createClient(createClientDto: CreateClientDto): Promise<void> {
    const {
      parentVendorId,
      name,
      emailId,
      websiteUrl,
      address1,
      address2,
      countryId,
      stateId,
      cityId,
      zipCode,
      boardNumber,
      vendorId,
      creationTime,
      createdBy,
      accountId
    } = createClientDto;

    try {
      const existingClient = await this.clientRepository.findOne({
        where: {
          name,
        },
      });
      if (existingClient) {
        throw new ConflictException('Client name is already exist');
      }

      const client = this.clientRepository.create({
        parentVendorId,
        name,
        emailId,
        websiteUrl,
        address1,
        address2,
        countryId,
        stateId,
        cityId,
        zipCode,
        boardNumber,
        vendorId,
        creationTime,
        createdBy,
        accountId
      });
      this.clientRepository.save(client);
    } catch (e) {
      console.log(e);
      if (e.status === 409) {
        throw new ConflictException(e.response.message);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async deleteClient(id) {
    return this.clientRepository.delete({
      id
    });
  }
}
