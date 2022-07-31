import { User } from 'src/auth/user.entity';
import { City } from 'src/city/city.entity';
import { Client } from 'src/client/client.entity';
import { Country } from 'src/country/country.entity';
import { State } from 'src/state/state.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Vendor extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

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
  zipCode: string;

  @Column()
  userId: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creationTime: Date;

  @Column({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP', nullable: true })
  updationTime: string;

  @OneToOne(() => Client, (cli) => cli.vendor)
  client: Client;

  @OneToOne(() => Client, (cli) => cli.parentVendor)
  parentVendorClient: Client;

  @OneToOne(() => Country, (cli) => cli.id)
  @JoinColumn()
  country: Country;

  @OneToOne(() => State, (cli) => cli.id)
  @JoinColumn()
  state: State;

  @OneToOne(() => City, (cli) => cli.id)
  @JoinColumn()
  city: City;

  @OneToOne(() => User, (cli) => cli.id)
  @JoinColumn()
  user: User;

  
  @OneToOne(() => Vendor, (cli) => cli.id)
  @JoinColumn()
  parentVendor: Vendor;
}
