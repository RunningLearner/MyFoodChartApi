import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CommentFree } from '../../comment/entities/comment-free.entity';
import { User } from '../../user/entities/user.entity';

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

  @OneToMany(() => CommentFree, (comment) => comment.post)
  comments: CommentFree[];

  @ManyToOne(() => User, (user) => user.postsFree) // boards는 User 엔터티에서 Board 엔터티를 참조하는 필드입니다.
  user: User;
}
