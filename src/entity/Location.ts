import { Entity, PrimaryGeneratedColumn, Column, Index, Double } from "typeorm";
import * as moment from "moment";

@Entity()
export class Location {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: String;

    @Column()
    latitude: Double;

    @Column()
    longitude: Double;

    @Column({ type: "timestamp", default: moment().format() })
    created_at: Date;

}
