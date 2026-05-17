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
  Query,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt/jwt-auth.guard";
import { TasksService } from "./tasks.service";
import { RequestWithUser } from "../request.interface";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { TaskEntity } from "./entities/task.entity";
import { GetTasksFilterDto } from "./dto/get-task-filter.dto";

@ApiTags("Tasks")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: "Create new task" })
  @ApiResponse({
    status: 201,
    description: "Task successful created",
    type: TaskEntity,
  })
  create(
    @Request() req: RequestWithUser,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.create(req.user.userId, createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: "Find all tasks owned by current user" })
  @ApiResponse({
    status: 200,
    description: "Tasks succeccful recieved",
    type: [TaskEntity],
  })
  findAll(
    @Query() filterDto: GetTasksFilterDto,
    @Request() req: RequestWithUser,
  ) {
    return this.tasksService.findAll(req.user.userId, filterDto);
  }

  @Get(":id")
  @ApiOperation({ summary: "Find task by id" })
  @ApiResponse({
    status: 200,
    description: "Task succeccful recieved",
    type: TaskEntity,
  })
  findCurrent(@Request() req: RequestWithUser, @Param("id") id: string) {
    return this.tasksService.findCurrent(req.user.userId, id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Edit task by id" })
  @ApiResponse({
    status: 200,
    description: "Tasks succeccful edited",
    type: TaskEntity,
  })
  update(
    @Request() req: RequestWithUser,
    @Body() updateTaskDto: UpdateTaskDto,
    @Param("id") id: string,
  ) {
    return this.tasksService.update(req.user.userId, id, updateTaskDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete task by id" })
  @ApiResponse({
    status: 200,
    description: "Tasks succeccful deleted",
    type: TaskEntity,
  })
  delete(@Request() req: RequestWithUser, @Param("id") id: string) {
    return this.tasksService.remove(req.user.userId, id);
  }
}
