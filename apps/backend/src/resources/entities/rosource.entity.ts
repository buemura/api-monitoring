import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Resource {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ length: '50' })
  name: string;

  @ApiProperty()
  @Column({ nullable: true })
  description: string;

  @ApiProperty()
  @Column()
  url: string;

  @ApiProperty()
  @Column({ nullable: true })
  accessToken: string;

  @ApiProperty()
  @Column()
  checkFrequency: number;

  @ApiProperty()
  @Column({ nullable: true })
  status: string;

  @ApiProperty()
  @Column({ nullable: true })
  lastCheck: Date;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
