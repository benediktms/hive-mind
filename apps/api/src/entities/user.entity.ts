import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export default class User {
  @PrimaryColumn()
  id!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({ unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 100 })
  firstName!: string;

  @Column({ type: 'varchar', length: 100 })
  lastName!: string;

  @Column({ type: 'text' })
  passwordHash!: string;

  @Column(() => Number)
  refreshTokenVersion!: number;

  @Column({ unique: true, nullable: true })
  authToken!: string | null;

  @Column({ nullable: true, type: 'date' })
  authTokenExpiresAt!: Date;

  @Column({ type: 'boolean' })
  hasConfirmedEmail!: boolean;
}
