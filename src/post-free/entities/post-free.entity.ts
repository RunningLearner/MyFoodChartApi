import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Comment } from '../../comment/entities/comment.entity';

@Entity()
export class PostFree {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'boolean', nullable: true })
  isDeleted: boolean;

  @OneToMany(() => Comment, (comment) => comment.postFree)
  comments: Comment[];

  @ManyToOne(() => User, (user) => user.postsFree) // boards는 User 엔터티에서 Board 엔터티를 참조하는 필드입니다.
  user: User;
}
