import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredentialDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { sendMail } from './email';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async signIn(authCredentialDto: AuthCredentialDto): Promise<{ accessToken }> {
    const { username, password } = authCredentialDto;
    try {
      const user = await this.usersRepository.findOne({
        where: {
          username,
        },
      });
      if (user) {
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (isValidPassword) {
          const payload: JwtPayload = { username };
          const accessToken: string = this.jwtService.sign(payload);
          return {
            accessToken,
          };
        } else {
          throw new UnauthorizedException('Invalid Password');
        }
      } else {
        throw new NotFoundException('User not found');
      }
    } catch (e) {
      console.log(e);
      if (e.status === 401) {
        throw new UnauthorizedException(e.response.message);
      } else if (e.status === 404) {
        throw new NotFoundException(e.response.message);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
    const { username, password, accountId,updationTime,
      creationTime,role } = authCredentialDto;
    try {
      const existingUser = await this.usersRepository.findOne({
        where: [{ username: username }],
      });

      if (existingUser) {
        throw new ConflictException('username is already exist');
      }

      // Hash the password
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);
      const user = this.usersRepository.create({
        username,
        password: hashPassword,
        accountId,
        updationTime,
        creationTime,
        role
      });

      await this.usersRepository.save(user);
      await sendMail({
        email: 'gourav.jhangikhel@gmail.com',
        subject: 'Created',
        message: 'Test',
      });
    } catch (e) {
      console.log(e);
      if (e.status === 409) {
        throw new ConflictException(e.response.message);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
