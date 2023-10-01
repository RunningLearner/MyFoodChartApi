import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Board {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text', unique: true })
  nickname: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // 산업, 학교 구분
  @Column('text')
  institute: string;

  // 식수
  @Column('number')
  peopleNum: number;

  @Column('number')
  price: number;

  @Column('text')
  imgUrl: string;

  @Column('text')
  menuName: string;

  @Column('bool')
  isProductUsed: boolean;

  @Column('text')
  productName: string;

  @Column('text')
  productBrand: string;

  @Column('text')
  explanation: string;

  @Column('text')
  fileURL: string;
}
