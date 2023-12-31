import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from '../../comment/entities/comment.entity';
import { PostDiet } from '../../post-diet/entities/post-diet.entity';
import { PostFree } from '../../post-free/entities/post-free.entity';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  EXUSER = 'exuser',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  userImg: string;

  @Column({ type: 'text', nullable: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  nickname: string;

  @Column({ type: 'boolean', default: false })
  isNutritionist: boolean;

  @OneToMany(() => PostDiet, (post) => post.user)
  postsDiet: PostDiet[];

  @OneToMany(() => Comment, (comment) => comment.user)
  commentsDiet: Comment[];

  @OneToMany(() => PostDiet, (post) => post.user)
  postsFree: PostFree[];

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;
}
