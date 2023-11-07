import { DietPost } from '../../post/entities/diet-post.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToMany(() => DietPost, (post) => post.user)
  posts: DietPost[];

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  name: string;

  @Column({ type: 'boolean', nullable: true })
  isDeleted: boolean;
}
