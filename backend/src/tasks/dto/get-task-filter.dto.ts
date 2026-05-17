import { IsEnum, IsOptional, IsString } from "class-validator";
import { TaskStatus, TaskPriority } from "@prisma/client";
import { ApiPropertyOptional } from "@nestjs/swagger";

export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}
export enum SortByField {
  CREATED_AT = "createdAt",
  UPDATED_AT = "updatedAt",
  TITLE = "title",
  PRIORITY = "priority",
  STATUS = "status",
}

export class GetTasksFilterDto {
  @ApiPropertyOptional({
    enum: TaskStatus,
    description: "Filter by status",
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @ApiPropertyOptional({
    enum: TaskPriority,
    description: "Filter by priority",
  })
  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @ApiPropertyOptional({
    description: "Field to sort by (e.g. CreateAt, Title, Priority)",
    example: "createdAt",
  })
  @IsOptional()
  @IsEnum(SortByField)
  sortBy?: SortByField = SortByField.CREATED_AT;

  @ApiPropertyOptional({
    enum: SortOrder,
    description: "Sort direction (asc - ascending, desc - descending)",
    default: SortOrder.DESC,
  })
  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder = SortOrder.DESC;

  @ApiPropertyOptional({
    description: "Search task by title",
    example: "Do smth",
  })
  @IsOptional()
  @IsString()
  search?: string;
}
