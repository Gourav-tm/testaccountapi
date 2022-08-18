import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { Client } from './client.entity';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/client-create.dto';

@Controller('client')
@UseGuards(AuthGuard())
export class ClientController {
  constructor(private readonly clientService: ClientService) { }

  @Get()
  getAllClients(@Query() pageOptionsDto: { take; skip }, @GetUser() getUser): Promise<{ data; count }> {
    return this.clientService.findAll(pageOptionsDto, getUser.accountId);
  }

  @Get('/vendor/:vendorId')
  getClientByVendorId(@Param('vendorId') vendorId:string): Promise<Client[]> {
    console.log(vendorId);
    return this.clientService.findClientByVendorId(vendorId);
  }


  @Get('/parentvendor/:parentVendorId')
  getClientByParentVendorId(@Param('parentVendorId') parentVendorId:string): Promise<Client[]> {
    console.log(parentVendorId);
    return this.clientService.findClientByParentVendorId(parentVendorId);
  }


  @Get('/:id')
  getClientById(@Param('id') id:string): Promise<Client> {
    console.log(id);
    return this.clientService.findClientById(id);
  }

  @Post()
  createClient(
    @Body() createClientDto: CreateClientDto,
    @GetUser() getUser,
  ): Promise<void> {
    createClientDto.accountId = getUser.accountId;
    createClientDto.createdBy = getUser.id;
    return this.clientService.createClient(createClientDto);
  }

  @Delete('/:id')
  deleteClient(@Param('id') id){
    return this.clientService.deleteClient(id);
  }
}
