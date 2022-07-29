import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({name:"countries"})
export class Country {
    
    @PrimaryColumn()
    id: number;

    @Column()
    shortname:string;

    @Column()
    name:string;

    @Column()
    phonecode:string;
}