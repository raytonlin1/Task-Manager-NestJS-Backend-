import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from '../../tasks/task.entity';
import { TasksService } from '../../tasks/tasks.service'
import { Repository } from 'typeorm';
import { User } from '../../auth/user.entity';
import { plainToClass } from 'class-transformer';
import { TaskStatus } from '../../tasks/task-status.enum';

const mockTask: Task = plainToClass(Task, 
  {
    title: "t",
    description: "d",
    id: "taskId",
    status: TaskStatus.OPEN
  }
);

const mockTasksRepository = {
  findOneBy: jest.fn((id, user) => Promise.resolve(mockTask)),
};

const mockUser: User = {
  username: 'user1',
  id: 'someId',
  password: 'Boltmander2?',
  tasks: [
    mockTask,
  ],
}

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository: Repository<Task>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: getRepositoryToken(Task), useValue: mockTasksRepository },
      ],
    }).compile();

    tasksService = module.get<TasksService>(TasksService);
  });

  afterEach(() => jest.clearAllMocks());
  
  describe('getTaskById', () => {
    it('should be defined', () => {
      expect(tasksService).toBeDefined();
    });

    it('calls tasksRepository.findOneBy and returns the result', async () => {
      const findOneBySpy = jest.spyOn(mockTasksRepository, 'findOneBy');
      const result = await tasksService.getTaskById('taskId', mockUser);
      expect(findOneBySpy).toHaveBeenCalledTimes(1);
      expect(findOneBySpy).toHaveBeenCalledWith({ id: mockTask.id, user: mockUser });
      expect(result).toEqual(mockTask);
    });
  });
})