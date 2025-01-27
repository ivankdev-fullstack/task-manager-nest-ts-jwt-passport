import { User } from 'src/user/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TaskLabel } from './task-label.entity';
import { TaskStatus } from './task.types';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'text',
    nullable: false,
    default: '',
  })
  description: string;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.OPEN,
  })
  status: TaskStatus;

  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => User, (user) => user.tasks, { nullable: false })
  user: User;

  @OneToMany(() => TaskLabel, (label) => label.task, {
    cascade: true,
    orphanedRowAction: 'delete',
  })
  labels: TaskLabel[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
