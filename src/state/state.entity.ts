import { Country } from "src/country/country.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";

@Entity({ name: 'states' })
export class State {

    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    country_id: number;

    @OneToOne(() => Country, country => country.id)
    @JoinColumn({ name: 'country_id' })
    country: Country;
}