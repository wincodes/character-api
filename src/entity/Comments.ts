import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import * as moment from "moment";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @Column()
  ip_address_location: String;

  @Column({ type: "timestamp", default: moment().format() })
  created_at: Date;
}
