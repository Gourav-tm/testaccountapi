import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './country.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [TypeOrmModule.forFeature([Country]),
  PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [CountryService],
  controllers: [CountryController]
})
export class CountryModule { }
