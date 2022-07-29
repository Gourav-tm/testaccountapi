import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './client.entity';
import { CreateClientDto } from './dto/client-create.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client) private clientRepository: Repository<Client>,
  ) {}

  async findAll(): Promise<Client[]> {
    return this.clientRepository.find({
      relations: ['vendor', 'parentVendor'],
    });
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
        parentVendorId: parentVendorId,
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
}
