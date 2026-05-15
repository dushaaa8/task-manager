import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt/jwt-auth.guard";
import { TasksService } from "./tasks.service";
import { RequestWithUser } from "../request.interface";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags("Tasks")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(
    @Request() req: RequestWithUser,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.create(req.user.userId, createTaskDto);
  }

  @Get()
  findAll(@Request() req: RequestWithUser) {
    return this.tasksService.findAll(req.user.userId);
  }

  @Get(":id")
  findCurrent(@Request() req: RequestWithUser, @Param("id") id: string) {
    return this.tasksService.findCurrent(req.user.userId, id);
  }

  @Patch(":id")
  update(
    @Request() req: RequestWithUser,
    @Body() updateTaskDto: UpdateTaskDto,
    @Param("id") id: string,
  ) {
    return this.tasksService.update(req.user.userId, id, updateTaskDto);
  }

  @Delete(":id")
  delete(@Request() req: RequestWithUser, @Param("id") id: string) {
    return this.tasksService.remove(req.user.userId, id);
  }
}
