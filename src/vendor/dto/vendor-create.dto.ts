import { IsString } from "class-validator";
import { CommonVendorProject } from "src/shared/commonvendorproject";

export class CreateVendorDto extends CommonVendorProject {


    @IsString()
    parentVendorId: string;

}