import { Account } from 'src/account/account.entity';
import { User } from 'src/auth/user.entity';
import { City } from 'src/city/city.entity';
import { Country } from 'src/country/country.entity';
import { State } from 'src/state/state.entity';
import { Vendor } from 'src/vendor/vendor.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @OneToOne(() => Vendor, (vendor) => vendor.parentVendorClient, {
    cascade: true,
  })
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

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creationTime: Date;

  @Column({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP', nullable: true })
  updationTime: string;

  @Column()
  accountId: string;
  
  @Column()
  createdBy: string;

  @OneToOne(() => Country, (cli) => cli.id)
  @JoinColumn()
  country: Country;

  @OneToOne(() => State, (cli) => cli.id)
  @JoinColumn()
  state: State;

  @OneToOne(() => City, (cli) => cli.id)
  @JoinColumn()
  city: City;

  @OneToOne(() => Account, (cli) => cli.id)
  @JoinColumn()
  account: Account;

  @OneToOne(() => User, (cli) => cli.id)
  @JoinColumn({ name: 'createdBy' })
  user: User;
}
