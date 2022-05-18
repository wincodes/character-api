import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import * as moment from "moment";
import { Character } from "./Character";
import { Comment } from "./Comments";

@Entity()
export class Episode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  release_date: Date;

  @Column()
  episode_code: string;

  @Column({ nullable: true })
  characters: Character;
  
  @Column({ nullable: true })
  episode_comments: Comment;
  
  @Column({ type: "timestamp", default: moment().format() })
  created_at: Date;
}
