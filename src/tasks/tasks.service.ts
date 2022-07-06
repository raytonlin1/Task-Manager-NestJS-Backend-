import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './DTO/create-task.dto';
import { GetTasksFilterDto } from './DTO/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository : Repository<Task>,
  ) {}
  
  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    let { status, search } = filterDto;

    if (!search) {
      search = '';
    }
    if (!status) {
      return this.tasksRepository.find({
        where: 
          [
            { title: Like(`%${search}%`) },
            { description: Like(`%${search}%`) }
          ]
      });
    } else {
      return this.tasksRepository.find({
        where: 
          [
            { status: status, title: Like(`%${search}%`) },
            { status: status, description: Like(`%${search}%`) }
          ]
      });
    }
  } 

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOneBy({ id });

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  async deleteTaskById(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id} not found`)
    }
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);

    task.status = status;
    await this.tasksRepository.save(task);

    return task;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.tasksRepository.create({
      title,
      description
    });

    await this.tasksRepository.save(task);
    return task;
  }
}
