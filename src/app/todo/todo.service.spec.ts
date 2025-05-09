/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TodoEntity } from './entity/todo.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateTodoDTO } from './dto/create-todo.dto';

const todoEntityList: TodoEntity[] = [
  new TodoEntity({ task: 'task-1', isDone: 0 }),
  new TodoEntity({ task: 'task-2', isDone: 0 }),
  new TodoEntity({ task: 'task-3', isDone: 0 }),
];

const newTodoItem = new TodoEntity({
  task: 'new-task',
  isDone: 0,
});

describe('TodoService', () => {
  let todoService: TodoService;
  let todoRepository: Repository<TodoEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: getRepositoryToken(TodoEntity),
          useValue: {
            find: jest.fn().mockResolvedValue(todoEntityList),
            findOneOrFail: jest.fn().mockResolvedValue(todoEntityList[0]),
            create: jest.fn().mockResolvedValue(newTodoItem),
            merge: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    todoService = module.get<TodoService>(TodoService);
    todoRepository = module.get<Repository<TodoEntity>>(
      getRepositoryToken(TodoEntity),
    );
  });

  it('should be defined', () => {
    expect(todoService).toBeDefined();
    expect(todoRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a todo entity list entity successfully', async () => {
      // Act
      const result = await todoService.findAll();

      // Assert
      expect(result).toEqual(todoEntityList);
      expect(todoRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(todoRepository, 'find').mockRejectedValueOnce(new Error());

      // Assert
      expect(todoService.findAll()).rejects.toThrow('');
    });
  });

  describe('findOneOrFail', () => {
    it('should return a todo item entity successfully', async () => {
      // Act
      const result = await todoService.findOneOrFail('1');

      // Assert
      expect(result).toEqual(todoEntityList[0]);
      expect(todoRepository.findOneOrFail).toHaveBeenCalledTimes(1);
    });

    it('should throw a not found exception', () => {
      // Arrange
      jest
        .spyOn(todoRepository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());

      //Assert
      expect(todoService.findOneOrFail('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should return a todo entity item successfully', async () => {
      // Arrange
      const body: CreateTodoDTO = { task: 'new-task', isDone: 0 };
      jest.spyOn(todoRepository, 'create').mockReturnValue(body as TodoEntity);
      jest.spyOn(todoRepository, 'save').mockResolvedValue(newTodoItem);

      // Act
      const result = await todoService.create(body);

      // Assert
      expect(result).toEqual(newTodoItem);
      expect(todoRepository.create).toHaveBeenCalledTimes(1);
    });

    it('should throw an exeception', () => {
      // Arrange
      const body: CreateTodoDTO = { task: 'new-task', isDone: 0 };
      jest.spyOn(todoService, 'create').mockRejectedValueOnce(new Error());

      // Assert
      expect(todoService.create(body)).rejects.toThrow('');
    });
  });

  describe('update', () => {
    it('should update and return the updated todo entity successfully', async () => {
      // Arrange
      const id = '1';
      const updateData = { task: 'updated-task', isDone: 1 };
      const existingEntity = new TodoEntity({
        id: '1',
        task: 'old-task',
        isDone: 0,
        createdAt: '',
        updatedAt: '',
        deletedAt: '',
      });
      const updatedEntity = {
        ...existingEntity,
        ...updateData,
        updatedAt: String(new Date()),
      };

      // Mocking the repository methods
      jest
        .spyOn(todoRepository, 'findOneOrFail')
        .mockResolvedValue(existingEntity);
      jest.spyOn(todoRepository, 'merge').mockReturnValue(updatedEntity);
      jest.spyOn(todoRepository, 'save').mockResolvedValue(updatedEntity);

      // Act
      const result = await todoService.update(id, updateData);

      // Assert
      expect(todoRepository.findOneOrFail).toHaveBeenCalledWith({
        where: { id },
      });
      expect(todoRepository.merge).toHaveBeenCalledWith(
        existingEntity,
        updateData,
      );
      expect(todoRepository.save).toHaveBeenCalledWith(updatedEntity);
      expect(result).toEqual(updatedEntity);
    });
  });
});
