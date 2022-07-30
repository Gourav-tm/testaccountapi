import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateVendorDto } from './dto/vendor-create.dto';
import { Vendor } from './vendor.entity';
import { VendorService } from './vendor.service';

@Controller('vendor')
@UseGuards(AuthGuard())
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  getVendor(@Query() pageOptionsDto: { take; skip }): Promise<{ data; count }> {
    return this.vendorService.findAll(pageOptionsDto);
  }

  @Get('/parent')
  @HttpCode(HttpStatus.OK)
  getAllParentVendor(): Promise<Vendor[]> {
    console.log('Parent');
    return this.vendorService.findAllParent();
  }

  @Get('/child/:parentId')
  @HttpCode(HttpStatus.OK)
  getChildByParent(@Param('parentId') parentId: string): Promise<Vendor[]> {
    console.log('Parent');
    return this.vendorService.findAllChildByParentId(parentId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createVendor(@Body() createVendordto: CreateVendorDto): Promise<void> {
    return this.vendorService.createVendor(createVendordto);
  }
}
