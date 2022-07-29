import { Vendor } from "src/vendor/vendor.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Client {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    boardNumber: string;

    @OneToOne(() => Vendor, (vendor) => vendor.client, { cascade: true })
    @JoinColumn({ name: 'vendorId' })
    vendor: Vendor;

    @OneToOne(() => Vendor, (vendor) => vendor.parentVendorClient, { cascade: true })
    @JoinColumn({ name: 'parentVendorId' })
    parentVendor: Vendor;

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
    zipCode: string;

    @Column()
    vendorId: string;

    @Column()
    parentVendorId: string;
}