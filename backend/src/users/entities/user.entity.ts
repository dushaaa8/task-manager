import { ApiProperty } from "@nestjs/swagger";
import { User } from "@prisma/client";

export class UserEntity implements Omit<User, "passwordHash"> {
  @ApiProperty({
    example: "clw1234560000abcdefrg9999",
    description: "Unique user ID",
  })
  id!: string;

  @ApiProperty({
    example: "Name Surname",
    description: "User name",
  })
  name!: string;

  @ApiProperty({
    example: "developer@example.com",
    description: "User email",
  })
  email!: string;

  @ApiProperty({
    example: "2026-05-16T10:00:00.000Z",
    description: "Registration date",
  })
  createdAt!: Date;

  @ApiProperty({
    example: "2026-05-16T10:00:00.000Z",
    description: "User updating date",
  })
  updatedAt!: Date;
}
