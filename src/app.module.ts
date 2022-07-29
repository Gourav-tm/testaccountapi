import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';
import { ProjectModule } from './project/project.module';
import { VendorModule } from './vendor/vendor.module';
import { ClientModule } from './client/client.module';
import { Vendor } from './vendor/vendor.entity';
import { Client } from './client/client.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CountryModule } from './country/country.module';
import { Country } from './country/country.entity';
import { StateModule } from './state/state.module';
import { State } from './state/state.entity';
import { CityModule } from './city/city.module';
import { City } from './city/city.entity';
import { LoggerModule } from 'nestjs-pino';
const levels = {
  emerg: 80,
  alert: 70,
  crit: 60,
  error: 50,
  warn: 40,
  notice: 30,
  info: 20,
  debug: 10,
};
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.stage.${process.env.STAGE.trim()}.env`],
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        name: 'add some name to every JSON line',
        level: 'info',
        customLevels: levels,
        useOnlyCustomLevels: true,
        formatters: {
          level: (label) => {
            return { level: label };
          },
        },
      },
    }),
    AuthModule,
    ProjectModule,
    VendorModule,
    ClientModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<TypeOrmModuleOptions> => {
        console.log(
          'TEst',
          configService.get('DB_PASSWORD'),
          process.env.DB_HOST,
        );
        return {
          type: 'mysql',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME'),
          entities: [User, Vendor, Client, Country, State, City],
        };
      },
    }),
    CountryModule,
    StateModule,
    CityModule,
  ],
})
export class AppModule {}
