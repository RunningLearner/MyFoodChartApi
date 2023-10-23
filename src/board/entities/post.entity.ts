import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Menu } from './menu.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

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

  @OneToMany(() => Menu, (menu) => menu.post)
  menues: Menu[];

  @ManyToOne(() => User, (user) => user.posts) // boards는 User 엔터티에서 Board 엔터티를 참조하는 필드입니다.
  @JoinColumn({ name: 'userId' }) // DB에 저장될 컬럼 이름을 userId로 설정
  user: User;
}
