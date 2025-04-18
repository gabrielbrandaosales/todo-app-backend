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

  async findOneOrFail(id: string) {
    try {
      return await this.todoRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      const message = error?.message || 'Todo não encontrado';
      throw new NotFoundException(message);
    }
  }

  async create(data) {
    return await this.todoRepository.save(this.todoRepository.create(data));
  }

  async update(id: string, data) {
    const todo = await this.findOneOrFail(id);

    this.todoRepository.merge(todo, data);
    return await this.todoRepository.save(todo);
  }

  async deleteById(id) {
    await this.findOneOrFail(id);
    await this.todoRepository.softDelete(id);
  }
}
