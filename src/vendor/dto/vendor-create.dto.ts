import { CommonVendorProject } from 'src/shared/commonvendorproject';

export class CreateVendorDto extends CommonVendorProject {
  parentVendorId: string;
}
