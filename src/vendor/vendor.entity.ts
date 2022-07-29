import { Client } from "src/client/client.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Vendor {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name:string;
    
    @Column()
    parentId: string;

    @Column({ unique: true })
    emailId: string;

    @Column()
    websiteUrl: string;

    @Column()
    address1: string;

    @Column()
    address2: string;

    @Column()
    countryId: number;

    @Column()
    stateId: number;

    @Column()
    cityId: number;

    @Column()
    zipCode:string;

    @OneToOne(() => Client, (cli) => cli.vendor)
    client: Client;

    @OneToOne(() => Client, (cli) => cli.parentVendor)
    parentVendorClient: Client;
}