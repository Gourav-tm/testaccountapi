import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateVendorDto } from './dto/vendor-create.dto';
import { Vendor } from './vendor.entity';

@Injectable()
export class VendorService {
  constructor(
    @InjectRepository(Vendor) private vendorsRepository: Repository<Vendor>,
    private readonly dataSource: DataSource,
  ) {}
  async findAll(query, accountId): Promise<{ data; count }> {
    const take = query.take || 20;
    const skip = query.skip || 0;

    const [result, total] = await this.dataSource
      .getRepository(Vendor)
      .createQueryBuilder('vendor')
      .select([
        'vendor.id',
        'vendor.name',
        'vendor.emailId',
        'vendor.websiteUrl',
        'vendor.address1',
        'vendor.address2',
        'vendor.zipCode',
        'vendor.creationTime',
        'vendor.updationTime',
        'country.id',
        'state.id',
        'city.id',
        'user.id',
        'country.name',
        'state.name',
        'city.name',
        'user.username',
      ])
      .where('vendor.accountId =:accountId', { accountId })

      .leftJoin('vendor.country', 'country')
      .leftJoin('vendor.state', 'state')
      .leftJoin('vendor.city', 'city')
      .leftJoin('vendor.user', 'user')
      .leftJoinAndSelect('vendor.parent', 'vendor as v2')
      .take(take)
      .skip(skip)
      .orderBy('vendor.name', 'ASC')
      .cache(true)
      .getManyAndCount();

    return {
      data: result,
      count: total,
    };
  }

  async findVendorByVendorId(vendorId): Promise<Vendor> {
    return await this.dataSource
      .getRepository(Vendor)
      .createQueryBuilder('vendor')
      .select([
        'vendor.id',
        'vendor.name',
        'vendor.emailId',
        'vendor.websiteUrl',
        'vendor.address1',
        'vendor.address2',
        'vendor.zipCode',
        'vendor.creationTime',
        'vendor.updationTime',
        'country.id',
        'state.id',
        'city.id',
        'user.id',
        'country.name',
        'state.name',
        'city.name',
        'user.username',
      ])
      .where('vendor.id =:vendorId', { vendorId })
      .leftJoin('vendor.country', 'country')
      .leftJoin('vendor.state', 'state')
      .leftJoin('vendor.city', 'city')
      .leftJoin('vendor.user', 'user')
      .leftJoinAndSelect('vendor.parent', 'vendor as v2')
      .getOne();
  }

  async findAllParent(accountId): Promise<Vendor[]> {
    console.log(accountId);
    return await this.dataSource
      .getRepository(Vendor)
      .createQueryBuilder('vendor')
      .select(['vendor.parentId', 'vendor.name', 'vendor.id', 'vendor.isRoot'])
      .where('vendor.parentId IS NOT NULL')
      .andWhere('vendor.accountId = :accountId', { accountId })
      .distinct(true)
      .getRawMany();
  }

  async findAllChildByParentId(parentId): Promise<Vendor[]> {
    return await this.vendorsRepository.find({
      select: ['id', 'name'],
      where: {
        parentId: parentId,
      },
    });
  }

  async createVendor(createVendorDto: CreateVendorDto): Promise<void> {
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
      accountId,
      creationTime,
    } = createVendorDto;
    try {
      const existingVendor = await this.vendorsRepository.findOne({
        where: {
          name,
        },
      });
      if (existingVendor) {
        throw new ConflictException('Vendor name is already exist');
      }
      let isRoot = true;
      const countRecords = await this.vendorsRepository.find({
        where: {
          accountId,
        },
      });
      if (countRecords.length > 0) {
        isRoot = false;
      }
      const vendor = this.vendorsRepository.create({
        name,
        parentId: parentVendorId,
        emailId,
        websiteUrl,
        address1,
        address2,
        countryId,
        stateId,
        cityId,
        zipCode,
        accountId,
        creationTime,
        isRoot,
      });
      await this.vendorsRepository.save(vendor);
      if (isRoot === true)
        await this.vendorsRepository.save({
          ...vendor,
          id: vendor.id,
          parentId: vendor.id,
        });
    } catch (e) {
      console.log(e);
      if (e.status === 409) {
        throw new ConflictException(e.response.message);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async deleteVendor(vendorId: string) {
    return this.vendorsRepository.delete({
      id: vendorId,
    });
  }
}
