import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { PostDiet } from '../../post/entities/post-diet.entity';

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

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
