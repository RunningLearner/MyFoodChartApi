import { User } from '../../user/entities/user.entity';
import { PostDiet } from '../../post-diet/entities/post-diet.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'number' })
  userId: number;

  @ManyToOne(() => PostDiet, (post) => post.comments)
  postDiet: PostDiet;
}
