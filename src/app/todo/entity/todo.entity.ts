import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'todos' })
export class TodoEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  task: string;

  @Column({ name: 'is_done', type: 'tinyint', width: 1 })
  @ApiProperty()
  isDone: number;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty()
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  @ApiProperty()
  deletedAt: Date | null;

  constructor(todo?: Partial<TodoEntity>) {
    if (todo) {
      this.id = todo.id ?? '';
      this.task = todo.task ?? '';
      this.isDone = todo.isDone ?? 0;
      this.createdAt = todo.createdAt ?? new Date();
      this.updatedAt = todo.updatedAt ?? new Date();
      this.deletedAt = todo.deletedAt ?? null;
    }
  }
}
