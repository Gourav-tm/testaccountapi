import { IsString, MaxLength, MinLength } from 'class-validator';

export class ProjectCreateDto {
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  title: string;

  @IsString()
  @MinLength(1)
  @MaxLength(512)
  description: string;

  @IsString()
  @MinLength(1)
  @MaxLength(128)
  accountManagerId: string;

  @IsString()
  @MinLength(1)
  @MaxLength(128)
  vendorId: string;
}
