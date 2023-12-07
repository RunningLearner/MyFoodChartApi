import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommentDiet } from '../../comment/entities/comment-diet.entity';
import { PostDiet } from '../../post/entities/post-diet.entity';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  name: string;

  @Column({ type: 'boolean', default: false })
  isNutritionist: boolean;

  @OneToMany(() => PostDiet, (post) => post.user)
  postsDiet: PostDiet[];

  @OneToMany(() => CommentDiet, (comment) => comment.user)
  commentsDiet: CommentDiet[];

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({ type: 'boolean', nullable: true })
  isDeleted: boolean;
}
