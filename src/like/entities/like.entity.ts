import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  targetId: number;

  @Column()
  targetType: string; // 'DietPost', 'DietComment', 'FreePost', 'FreeComment', 'Announcement' 등
}
