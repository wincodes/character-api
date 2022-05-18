import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import * as moment from "moment";
import { Location } from "./Location";
import { Episode } from "./Episode";

export type statusType = "ACTIVE" | "DEAD" | "UNKNOWN";
export type genderType = "MALE" | "FEMALE";

@Entity()
export class Character {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({
    type: "enum",
    enum: ["ACTIVE", "DEAD", "UNKNOWN"],
    default: "UNKNOWN",
  })
  status: statusType;

  @Column({ nullable: true })
  state_of_origin: String;

  @Column({ type: "enum", enum: ["MALE", "FEMALE"] })
  gender: genderType;

  @Column({ nullable: true })
  location: Location;

  @Column({ nullable: true })
  episodes: Episode;

  @Column({ type: "timestamp", default: moment().format() })
  created_at: Date;
}
