import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from './entity/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  async findAll() {
    return await this.todoRepository.find();
  }

  async findOne(id: string) {
    try {
      return await this.todoRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      const message = error?.message || 'Todo não encontrado';
      throw new NotFoundException(message);
    }
  }

  async create() {}

  async update() {}

  async deleteById() {}
}
