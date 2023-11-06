import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  menuName: string;

  @Column({ type: 'boolean' })
  isProductUsed: boolean;

  @Column({ type: 'text' })
  productName: string;

  @Column({ type: 'text' })
  productBrand: string;

  @ManyToOne(() => Post, (post) => post.menues, { onDelete: 'CASCADE' })
  post: Post;
}
