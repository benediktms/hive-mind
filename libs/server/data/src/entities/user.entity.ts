import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn()
  updatedAt: Date = new Date();

  @Column({ unique: true })
  email!: string;

  @Column({ length: 100 })
  firstName!: string;

  @Column({ length: 100 })
  lastName!: string;

  @Column()
  passwordHash!: string;

  @Column({ default: true })
  hasConfirmedEmail!: boolean;

  @Column({ default: 0 })
  refreshTokenVersion!: number;

  @Column({ nullable: true })
  authToken!: string | null;

  @Column({ nullable: true })
  authTokenExpiresAt?: Date | null;
}
