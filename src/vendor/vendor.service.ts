import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { CreateVendorDto } from './dto/vendor-create.dto';
import { Vendor } from './vendor.entity';

@Injectable()
export class VendorService {
    constructor(@InjectRepository(Vendor) private vendorsRepository: Repository<Vendor>) {

    }
    async findAll(query): Promise<{ data, count }> {
        const take = query.take || 10;
        const skip = query.skip || 0;
        const [result, total] = await this.vendorsRepository.findAndCount({
            take,
            skip
        });
        return {
            data: result,
            count: total
        }
    }

    async findAllParent(): Promise<Vendor[]> {
        return await this.vendorsRepository.find({
            select: ['parentId', 'name'],
            where: {
                parentId: Not(IsNull())
            }
        });

    }

    async findAllChildByParentId(parentId): Promise<Vendor[]> {
        return await this.vendorsRepository.find({
            select: ['id', 'name'],
            where: {
                parentId: parentId
            }
        });

    }

    async createVendor(createVendorDto: CreateVendorDto): Promise<void> {

        const { parentVendorId, name, emailId, websiteUrl, address1, address2,
            countryId, stateId, cityId, zipCode } = createVendorDto;
        try {
            const existingVendor = await this.vendorsRepository.findOne({
                where: {
                    name
                }
            });
            if (existingVendor) {
                throw new ConflictException('Vendor name is already exist');
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
                zipCode
            });
            await this.vendorsRepository.save(vendor);
        }
        catch (e) {
            console.log(e);
            if (e.status === 409) {
                throw new ConflictException(e.response.message);
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}
