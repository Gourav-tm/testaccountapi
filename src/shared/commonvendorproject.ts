import { Type } from 'class-transformer';
import {
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  Min,
  IsEmail,
  IsNumber,
} from 'class-validator';

export class CommonVendorProject {
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  @IsNotEmpty()
  name: string;

  @IsString()
  @MinLength(3)
  @MaxLength(200)
  @IsNotEmpty()
  @IsEmail()
  emailId: string;

  @IsString()
  @MinLength(3)
  @MaxLength(200)
  @IsNotEmpty()
  websiteUrl: string;

  @IsString()
  @MinLength(10)
  @MaxLength(500)
  @IsNotEmpty()
  address1: string;

  @IsString()
  @MaxLength(500)
  address2: string;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  countryId: number;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  stateId: number;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  cityId: number;

  @IsString()
  @MinLength(1)
  @MaxLength(7)
  @IsNotEmpty()
  zipCode: string;
}
