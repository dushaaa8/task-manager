import { TaskStatus, TaskPriority } from "@prisma/client";
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateTaskDto {
  @IsString({ message: "Title must be string" })
  @IsNotEmpty({ message: "Title cannot be empty" })
  title!: string;

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
