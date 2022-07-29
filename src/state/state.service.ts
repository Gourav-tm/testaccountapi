import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { State } from './state.entity';

@Injectable()
export class StateService {
    constructor(@InjectRepository(State) private state: Repository<State>) {

    }

    async findAll(countryId): Promise<State[]> {
        return await this.state.find({
            where: {
                country_id: countryId
            },

            relations: ["country"]
        })
    }
}
