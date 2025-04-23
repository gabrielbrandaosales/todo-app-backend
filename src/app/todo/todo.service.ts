import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from './entity/todo.entity';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { UpdateTodoDTO } from './dto/update-todo.dto';

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
    } catch (error: unknown) {
      let message = 'Todo não encontrado';

      if (error instanceof Error) {
        message = error.message;
      }
      throw new NotFoundException(message);
    }
  }

  async create(data: CreateTodoDTO) {
    return await this.todoRepository.save(this.todoRepository.create(data));
  }

  async update(id: string, data: UpdateTodoDTO) {
    const todo = await this.findOneOrFail(id);

    this.todoRepository.merge(todo, data);
    return await this.todoRepository.save(todo);
  }

  async deleteById(id: string) {
    await this.findOneOrFail(id);
    await this.todoRepository.softDelete(id);
  }
}
