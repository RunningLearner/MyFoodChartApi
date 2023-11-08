import { CommentDiet } from '../../comment/entities/comment-diet.entity';
import { PostDiet } from '../../post/entities/post-diet.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToMany(() => PostDiet, (post) => post.user)
  posts: PostDiet[];

  @OneToMany(() => CommentDiet, (comment) => comment.user)
  commentsDiet: CommentDiet[];

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  name: string;

  @Column({ type: 'boolean', nullable: true })
  isDeleted: boolean;
}
