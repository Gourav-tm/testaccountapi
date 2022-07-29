import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './city.entity';

@Injectable()
export class CityService {

    constructor(@InjectRepository(City) private city: Repository<City>) {

    }
    async findCityByStateId(stateid): Promise<City[]> {
        console.log(stateid);
        return await this.city.find({
            where: {
                state_id: stateid
            }
        })
    }


}
