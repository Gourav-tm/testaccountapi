import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard())
  getHello(@Req() req): Promise<User[]> {
    console.log(req);
    return this.authService.findAll();
  }
  @Post('/user')
  createUser(@Body() authCredentialDto: AuthCredentialDto): Promise<void> {
    return this.authService.createUser(authCredentialDto);
  }
  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  signin(
    @Body() authCredentialDto: AuthCredentialDto,
  ): Promise<{ accessToken }> {
    return this.authService.signIn(authCredentialDto);
  }
}
