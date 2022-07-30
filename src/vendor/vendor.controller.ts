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
import { GetUser } from 'src/auth/get-user.decorator';
import { CreateVendorDto } from './dto/vendor-create.dto';
import { Vendor } from './vendor.entity';
import { VendorService } from './vendor.service';

@Controller('vendor')
@UseGuards(AuthGuard())
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  getVendor(
    @Query() pageOptionsDto: { take; skip },
    @GetUser() getUser,
  ): Promise<{ data; count }> {
    return this.vendorService.findAll(pageOptionsDto, getUser.id);
  }

  @Get('/parent')
  @HttpCode(HttpStatus.OK)
  getAllParentVendor(@GetUser() getUser): Promise<Vendor[]> {
    return this.vendorService.findAllParent(getUser.id);
  }

  @Get('/child/:parentId')
  @HttpCode(HttpStatus.OK)
  getChildByParent(@Param('parentId') parentId: string): Promise<Vendor[]> {
    return this.vendorService.findAllChildByParentId(parentId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createVendor(
    @Body() createVendordto: CreateVendorDto,
    @GetUser() getUser,
  ): Promise<void> {
    createVendordto.userId = getUser.id;
    return this.vendorService.createVendor(createVendordto);
  }
}
