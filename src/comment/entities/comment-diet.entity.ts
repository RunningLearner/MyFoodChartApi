import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PostDiet } from '../../post/entities/post-diet.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class CommentDiet {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => PostDiet, (post) => post.comments)
  post: PostDiet;

  @ManyToOne(() => User, (user) => user.postsDiet)
  user: User;
}
