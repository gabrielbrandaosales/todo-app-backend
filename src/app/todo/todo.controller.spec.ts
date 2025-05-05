/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TodoEntity } from './entity/todo.entity';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { UpdateTodoDTO } from './dto/update-todo.dto';

const todoEntityList: TodoEntity[] = [
  new TodoEntity({ id: '1', task: 'task-1', isDone: 0 }),
  new TodoEntity({ id: '2', task: 'task-2', isDone: 0 }),
  new TodoEntity({ id: '3', task: 'task-3', isDone: 0 }),
];

const newTodoEntity = new TodoEntity({ task: 'new-task', isDone: 0 });

const updatedTodoEntity = new TodoEntity({ task: 'task-1', isDone: 1 });

describe('TodoController', () => {
  let todoController: TodoController;
  let todoService: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        {
          provide: TodoService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(todoEntityList),
            create: jest.fn().mockResolvedValue(newTodoEntity),
            findOneOrFail: jest.fn().mockResolvedValue(todoEntityList[0]),
            update: jest.fn().mockResolvedValue(updatedTodoEntity),
            deleteById: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    todoController = module.get<TodoController>(TodoController);
    todoService = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(todoController).toBeDefined();
    expect(todoService).toBeDefined();
  });

  describe('index', () => {
    it('should return a todo list entity successfully', async () => {
      // Arrange

      //Act
      const result = await todoController.index();

      //Assert
      expect(result).toEqual(todoEntityList);
    });

    it('should throw an exception', async () => {
      //Arrange
      jest.spyOn(todoService, 'findAll').mockRejectedValueOnce(new Error());

      //Assert
      await expect(todoController.index()).rejects.toThrow('');
    });
  });

  describe('create', () => {
    it('should create a new todo item successfully', async () => {
      //Arrange
      const body: CreateTodoDTO = { task: 'new-task', isDone: 0 };

      //Act
      const result = await todoController.create(body);

      //Assert
      expect(result).toEqual(newTodoEntity);
      expect(todoService.create).toHaveBeenCalledTimes(1);
      expect(todoService.create).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', async () => {
      // Arrange
      const body: CreateTodoDTO = { task: 'new-task', isDone: 0 };
      jest.spyOn(todoService, 'create').mockRejectedValueOnce(new Error());

      //Assert
      await expect(todoController.create(body)).rejects.toThrow('');
    });
  });

  describe('show', () => {
    it('should get a todo item successfully', async () => {
      //Act
      const result = await todoController.show('1');

      //Assert
      expect(result).toEqual(todoEntityList[0]);
      expect(todoService.findOneOrFail).toHaveBeenCalledTimes(1);
      expect(todoService.findOneOrFail).toHaveBeenCalledWith('1');
    });

    it('should throw an exception', async () => {
      //Arrange
      jest
        .spyOn(todoService, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());

      //Assert
      await expect(todoController.show('1')).rejects.toThrow('');
    });
  });

  describe('update', () => {
    it('should update a todo item successfully', async () => {
      //Arrange
      const body: UpdateTodoDTO = { task: 'task-1', isDone: 1 };

      // Act
      const result = await todoController.update('1', body);

      //Assert
      expect(result).toEqual(updatedTodoEntity);
      expect(todoService.update).toHaveBeenCalledTimes(1);
      expect(todoService.update).toHaveBeenCalledWith('1', body);
    });

    it('should throw an exception', async () => {
      //Arrange
      const body: UpdateTodoDTO = { task: 'task-1', isDone: 1 };
      jest.spyOn(todoService, 'update').mockRejectedValueOnce(new Error());

      //Assert
      await expect(todoController.update('1', body)).rejects.toThrow('');
    });
  });

  describe('destroy', () => {
    it('should remove a todo item successfully', async () => {
      //Act
      const result = await todoController.destroy('1');

      //Assert
      expect(result).toBe(undefined);
    });

    it('should throw an exception', async () => {
      //Arrange
      jest.spyOn(todoService, 'deleteById').mockRejectedValueOnce(new Error());

      //Assert
      await expect(todoController.destroy('1')).rejects.toThrow('');
    });
  });
});
