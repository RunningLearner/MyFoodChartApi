import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PostFree } from '../../post-free/entities/post-free.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class CommentFree {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => PostFree, (post) => post.comments)
  post: PostFree;

  @ManyToOne(() => User, (user) => user.postsDiet)
  user: User;
}
