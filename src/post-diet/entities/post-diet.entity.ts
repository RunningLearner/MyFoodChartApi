import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CommentDiet } from '../../comment/entities/comment-diet.entity';
import { User } from '../../user/entities/user.entity';
import { Menu } from './menu.entity';

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

  @Column({ type: 'text', nullable: true })
  recipeFile: string;

  @Column({ type: 'text', nullable: true })
  whichSchool: string;

  @Column({ type: 'boolean', nullable: true })
  isDeleted: boolean;

  @OneToMany(() => CommentDiet, (comment) => comment.post)
  comments: CommentDiet[];

  @OneToMany(() => Menu, (menu) => menu.post, { cascade: true })
  menues: Menu[];

  @ManyToOne(() => User, (user) => user.postsDiet) // boards는 User 엔터티에서 Board 엔터티를 참조하는 필드입니다.
  user: User;
}
