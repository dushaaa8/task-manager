import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        ...dto,
        userId,
      },
    });
  }
  async findAll(userId: string) {
    return this.prisma.task.findMany({ where: { userId } });
  }
  async findCurrent(userId: string, taskId: string) {
    const task = await this.prisma.task.findUnique({ where: { id: taskId } });
    if (!task) {
      throw new NotFoundException("Task is not found");
    }
    if (task.userId !== userId) {
      throw new ForbiddenException("You have no rights for reading this task");
    }
    return task;
  }

  async remove(userId: string, taskId: string) {
    const task = await this.prisma.task.findUnique({ where: { id: taskId } });

    if (!task) {
      throw new NotFoundException("Task is not found");
    }
    if (task.userId !== userId) {
      throw new ForbiddenException("You have no rights for deleting this task");
    }
    return this.prisma.task.delete({ where: { id: taskId } });
  }

  async update(userId: string, taskId: string, dto: UpdateTaskDto) {
    const task = await this.prisma.task.findUnique({ where: { id: taskId } });

    if (!task) {
      throw new NotFoundException("Task is not found");
    }
    if (task.userId !== userId) {
      throw new ForbiddenException("You have no rights for updating this task");
    }
    return this.prisma.task.update({ where: { id: taskId }, data: dto });
  }
}
