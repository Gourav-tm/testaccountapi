
import { Column,  Entity,  PrimaryColumn } from "typeorm";

@Entity({name:"cities"})
export class City{
    @PrimaryColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    state_id:number;
}