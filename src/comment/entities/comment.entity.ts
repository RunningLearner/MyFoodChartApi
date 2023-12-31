import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PostDiet } from '../../post-diet/entities/post-diet.entity';
import { User } from '../../user/entities/user.entity';
import { PostFree } from '../../post-free/entities/post-free.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'text' })
  type: string;

  @ManyToOne(() => PostDiet, (post) => post.comments)
  postDiet: PostDiet;

  @ManyToOne(() => PostFree, (post) => post.comments)
  postFree: PostFree;

  @ManyToOne(() => User, (user) => user.postsDiet)
  user: User;
}
