import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { DietPost } from 'src/post/entities/diet-post.entity';

@Entity()
export class DietComment {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => DietPost, (post) => post.comments)
  post: DietPost;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
