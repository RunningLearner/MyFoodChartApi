import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { Menu } from './menu.entity';
import { User } from '../../user/entities/user.entity';
import { CommentDiet } from '../../comment/entities/comment-diet.entity';

@Entity()
export class PostDiet {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'text' })
  date: string;

  @Column({ type: 'text' })
  institute: string;

  @Column({ type: 'text' })
  peopleNum: string;

  @Column({ type: 'text' })
  price: string;

  @Column({ type: 'text' })
  recipeImg: string;

  @Column({ type: 'text' })
  explanation: string;

  @Column({ type: 'text' })
  recipeFile: string;

  @Column({ type: 'text' })
  whichSchool: string;

  @Column({ type: 'boolean', nullable: true })
  isDeleted: boolean;

  @OneToMany(() => CommentDiet, (comment) => comment.post)
  comments: CommentDiet[];

  @OneToMany(() => Menu, (menu) => menu.post, { cascade: true })
  menues: Menu[];

  @ManyToOne(() => User, (user) => user.posts) // boards는 User 엔터티에서 Board 엔터티를 참조하는 필드입니다.
  user: User;
}
