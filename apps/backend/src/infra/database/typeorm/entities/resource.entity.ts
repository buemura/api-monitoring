import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Resource } from '../../../../modules/resources/entities/resource';

@Entity({ name: 'resource' })
export class TypeOrmResourceEntity extends Resource {
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
  @Column({ nullable: true, name: 'access_token' })
  accessToken: string;

  @ApiProperty()
  @Column({ name: 'check_frequency' })
  checkFrequency: number;

  @ApiProperty()
  @Column({ nullable: true })
  status: string;

  @ApiProperty()
  @Column({ type: 'timestamptz', name: 'last_checked', default: new Date() })
  lastCheck: Date;

  @ApiProperty()
  @Column({ name: 'notify_to' })
  notifyTo: string;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
