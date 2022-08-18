import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString, MaxLength, MinDate, MinLength } from 'class-validator';
import { CommonVendorProject } from 'src/shared/commonvendorproject';

export class CreateProjectDto extends CommonVendorProject {

  @IsString()
  @MinLength(1)
  @MaxLength(512)
  description: string;

  @IsString()
  @MinLength(1)
  accountManagerId: string;

  @IsString()
  @IsNotEmpty()
  clientId: string;


  @IsString()
  @IsNotEmpty()
  vendorId: string;

  parentVendorId: string;


  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  startDate: Date;


  @IsDate()
  @Type(() => Date)
  
  endDate: Date;
}
