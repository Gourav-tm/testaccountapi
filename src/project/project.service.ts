import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateProjectDto } from './dto/project-create.dto';
import { Project } from './project.entity';

@Injectable()
export class ProjectService {

    constructor(@InjectRepository(Project) private projectRepository: Repository<Project>,
        private readonly dataSource: DataSource
    ) { }


    async getAllProjects(pageOptionsDto: { take; skip }, accountId): Promise<{ data; count }> {
        const take = pageOptionsDto.take || 20;
        const skip = pageOptionsDto.skip || 0;
        console.log(take);
        const [data, count] = await this.dataSource
            .getRepository(Project)
            .createQueryBuilder('project')
            .select(['project.name',
                'project.id',
                'project.description',
                'project.startDate',
                'project.endDate',
                'project.workAddress',
                'project.zipcode',
                'project.creationTime',
                'project.updationTime',
                'vendor.name',
                'vendor.id',
                'country.id',
                'country.name',
                'state.id',
                'state.name',
                'city.id',
                'city.name',
                'client.id',
                'client.name',
                'account.id',
                'account.name',
                'user.id',
                'user.username',
                'parentVendor.id',
                'parentVendor.name'])
            .where("project.accountId=:accountId", { accountId })
            .leftJoin('project.vendor', 'vendor')
            .leftJoin('project.country', 'country')
            .leftJoin('project.state', 'state')
            .leftJoin('project.city', 'city')
            .leftJoin('project.parentVendor', 'parentVendor')
            .leftJoin('project.user', 'user')
            .leftJoin('project.account', 'account')
            .leftJoin('project.client', 'client')
            .getManyAndCount();

        return {
            data,
            count
        }
    }

    async createProject(createProjectDto: CreateProjectDto) {
        console.log(createProjectDto);
        const {
            name,
            description,
            accountId,
            accountManagerId,
            cityId,
            countryId,
            stateId,
            zipCode,
            createdBy,
            creationTime,
            clientId,
            vendorId,
            parentVendorId,
            startDate,
            endDate
        } = createProjectDto;
        try {
            const projectExist = await this.projectRepository.findOneBy({
                name
            })
            if (projectExist) {
                throw new ConflictException('Project name already exist')
            }
            const project = this.projectRepository.create({
                name,
                description,
                accountId,
                accountManagerId,
                cityId,
                stateId,
                countryId,
                zipCode,
                createdBy,
                creationTime,
                clientId,
                vendorId,
                parentVendorId,
                startDate,
                endDate
            });

            await this.projectRepository.save(project);
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
