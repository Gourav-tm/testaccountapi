import { Account } from "src/account/account.entity";
import { User } from "src/auth/user.entity";
import { City } from "src/city/city.entity";
import { Client } from "src/client/client.entity";
import { Country } from "src/country/country.entity";
import { State } from "src/state/state.entity";
import { Vendor } from "src/vendor/vendor.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'project'})
export class Project {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ name: 'userId' })
    accountManagerId: string;

    @Column()
    workAddress: string;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @Column()
    vendorId: string;

    @Column()
    parentVendorId: string;

    @Column()
    clientId: string;

    @Column()
    countryId: number;

    @Column()
    stateId: number;

    @Column()
    cityId: number;

    @Column()
    zipCode: string;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    creationTime: Date;

    @Column({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP', nullable: true })
    updationTime: string;

    @Column()
    accountId: string;

    @Column()
    createdBy: string;

    @OneToOne(() => Vendor, (v) => v.id)
    @JoinColumn({ name: 'vendorId' })
    vendor: Vendor;

    @OneToOne(() => Vendor, (v) => v.id)
    @JoinColumn({ name: 'parentVendorId' })
    parentVendor: Vendor;

    @OneToOne(() => Client, (cl) => cl.id)
    @JoinColumn({ name: 'clientId' })
    client: Client;

    @OneToOne(() => Country, (co) => co.id)
    @JoinColumn({ name: 'countryId' })
    country: Country;

    @OneToOne(() => State, (s) => s.id)
    @JoinColumn({ name: 'stateId' })
    state: State;

    @OneToOne(() => City, (c) => c.id)
    @JoinColumn({ name: 'cityId' })
    city: City;

    @OneToOne(() => Account, (cli) => cli.id)
    @JoinColumn()
    account: Account;
  
    @OneToOne(() => User, (cli) => cli.id)
    @JoinColumn({ name: 'createdBy' })
    user: User;
}