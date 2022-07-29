import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from './country.entity';
import {  Logger } from 'nestjs-pino'
@Injectable()
export class CountryService {

    constructor(@InjectRepository(Country) private country:Repository<Country>,
    private readonly logger: Logger){

    } 

    findAll(){
        this.logger.log("Test");
        return this.country.find({
            cache:true
        });
    }

}
