import { TaskStatus, TaskPriority } from "@prisma/client";
import { IsDateString, IsEnum, IsOptional, IsString } from "class-validator";

export class UpdateTaskDto {
  @IsOptional()
  @IsString({ message: "Title must be string" })
  title?: string;

  @IsOptional()
  @IsString({ message: "Description must be stirng" })
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus, { message: "Incorrect format status" })
  status?: TaskStatus;

  @IsOptional()
  @IsEnum(TaskPriority, { message: "Incorrect format priority" })
  priority?: TaskPriority;

  @IsOptional()
  @IsDateString({}, { message: "Due date must be valid Date format" })
  dueDate?: string;
}
