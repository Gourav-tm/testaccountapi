import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { State } from './state.entity';

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(State) private state: Repository<State>,
    private dataSource: DataSource,
  ) {}

  async findAll(countryId): Promise<State[]> {
    return await this.dataSource
      .getRepository(State)
      .createQueryBuilder('states')
      .select(['states.id', 'states.name'])
      .where('states.country_id = :country_id', { country_id: countryId })
      .getMany();
  }
}
