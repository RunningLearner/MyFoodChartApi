import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * 게시판을 나타내는 엔터티 클래스입니다.
 */
@Entity()
export class Board {
  /**
   * 고유한 식별자입니다.
   */
  @PrimaryGeneratedColumn('increment')
  id: number;

  /**
   * 사용자 닉네임입니다. 고유해야 합니다.
   */
  @Column({ type: 'text', unique: true })
  nickname: string;

  /**
   * 생성 날짜입니다.
   */
  @CreateDateColumn()
  createdAt: Date;

  /**
   * 마지막으로 수정된 날짜입니다.
   */
  @UpdateDateColumn()
  updatedAt: Date;

  /**
   * 산업 또는 학교를 구분합니다.
   */
  @Column('text')
  institute: string;

  /**
   * 식수를 나타냅니다.
   */
  @Column('number')
  peopleNum: number;

  /**
   * 가격을 나타냅니다.
   */
  @Column('number')
  price: number;

  /**
   * 이미지 URL입니다.
   */
  @Column('text')
  imgUrl: string;

  /**
   * 메뉴 이름입니다.
   */
  @Column('text')
  menuName: string;

  /**
   * 제품을 사용했는지 여부입니다.
   */
  @Column('bool')
  isProductUsed: boolean;

  /**
   * 제품 이름입니다.
   */
  @Column('text')
  productName: string;

  /**
   * 제품 브랜드입니다.
   */
  @Column('text')
  productBrand: string;

  /**
   * 추가 설명입니다.
   */
  @Column('text')
  explanation: string;

  /**
   * 파일 URL입니다.
   */
  @Column('text')
  fileURL: string;

  /**
   * 게시판 타입을 나타냅니다.
   */
  @Column('text')
  boardType: string;
}
