import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/client-create.dto';

@Controller('client')
@UseGuards(AuthGuard())
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  getAllClients() {
    return this.clientService.findAll();
  }

  @Post()
  createClient(
    @Body() createClientDto: CreateClientDto,
    @GetUser() getUser,
  ): Promise<void> {
    console.log(getUser);
    return this.clientService.createClient(createClientDto);
  }
}
