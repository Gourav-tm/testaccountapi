import { IsNotEmpty, IsString } from 'class-validator';
import { CommonVendorProject } from 'src/shared/commonvendorproject';

export class CreateClientDto extends CommonVendorProject {
  @IsString()
  @IsNotEmpty()
  boardNumber: string;

  @IsString()
  @IsNotEmpty()
  vendorId: string;

  @IsString()
  parentVendorId: string;
}
