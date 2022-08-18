import { IsEnum, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { USER_ROLE } from '../user.entity';

export class AuthCredentialDto {
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too week',
  })
  password: string;

  accountId:string;

  
  creationTime: Date;

  updationTime: Date;

  createdBy: string;

  updatedBy: string;

  
  role:USER_ROLE;
}
