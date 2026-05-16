import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Task, TaskStatus, TaskPriority } from "@prisma/client";

export class TaskEntity implements Task {
  @ApiProperty({
    example: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    description: "Unique Task ID (UUID)",
  })
  id!: string;

  @ApiProperty({
    example: "Do smth",
    description: "Task title",
  })
  title!: string;

  @ApiPropertyOptional({
    example: "Do smth with my firends, i'd already promised",
    description: "Extended description what you want to do",
  })
  description!: string | null;

  @ApiProperty({
    enum: TaskStatus,
    example: TaskStatus.in_progress,
    description: "Task completing status",
  })
  status!: TaskStatus;

  @ApiProperty({
    enum: TaskPriority,
    example: TaskPriority.high,
    description: "Task priority",
  })
  priority!: TaskPriority;

  @ApiProperty({
    example: "clw1234560000abcdefrg9999",
    description: "User owner ID",
  })
  userId!: string;

  @ApiProperty({
    example: "2026-05-16T12:00:00.000Z",
    description: "Creating date",
  })
  createdAt!: Date;

  @ApiPropertyOptional({
    example: "2026-05-16T12:00:00.000Z",
    description: "When you planning to finish task",
  })
  dueDate!: Date | null;

  @ApiProperty({
    example: "2026-05-16T13:45:00.000Z",
    description: "Updating date",
  })
  updatedAt!: Date;
}
