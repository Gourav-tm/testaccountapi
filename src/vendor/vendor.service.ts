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
  ) { }
  async findAll(query, userId): Promise<{ data; count }> {
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
      .where('vendor.userId =:userId', { userId })
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

  async findAllParent(userId): Promise<Vendor[]> {
    console.log(userId);
    return await this.dataSource
      .getRepository(Vendor)
      .createQueryBuilder('vendor')
      .select(['vendor.parentId', 'vendor.name'])
      .where('vendor.parentId IS NOT NULL')
      .orWhere('vendor.isRoot = 0')
      .andWhere('vendor.userId = :userId', { userId })
      .distinct(true)
      .printSql()
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
      userId,
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
      let isRoot = false;
      const countRecords = await this.vendorsRepository.find({
        where: {
          userId
        },
      });
      if (countRecords.length > 0) {
        isRoot = true;
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
        userId,
        creationTime,
        isRoot
      });
      await this.vendorsRepository.save(vendor);
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
