import { Module } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { VendorController } from './vendor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vendor } from './vendor.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vendor]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [VendorService],
  controllers: [VendorController],
})
export class VendorModule {}
