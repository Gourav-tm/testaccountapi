import {
  Body,
  Controller,
  Delete,
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
import { RolesGuard } from 'src/auth/roles.guard';
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
    return this.vendorService.findAll(pageOptionsDto, getUser.accountId);
  }

  @Get('/parent')
  @HttpCode(HttpStatus.OK)
  getAllParentVendor(@GetUser() getUser): Promise<Vendor[]> {
    return this.vendorService.findAllParent(getUser.id);
  }

  @Get('/:vendorId')
  @HttpCode(HttpStatus.OK)
  getVendorById(@Param('vendorId') vendorId: string): Promise<Vendor> {
    return this.vendorService.findVendorByVendorId(vendorId);
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
    createVendordto.accountId = getUser.accountId;
    createVendordto.createdBy = getUser.id;
    return this.vendorService.createVendor(createVendordto);
  }

  @Delete('/:vendorId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  deleteVendor(@Param('vendorId') vendorId) {
    return this.vendorService.deleteVendor(vendorId);
  }
}
