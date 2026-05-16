import {
  Controller,
  Get,
  UseGuards,
  Request,
  NotFoundException,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt/jwt-auth.guard";
import { UsersService } from "./users.service";
import { RequestWithUser } from "../request.interface";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { UserEntity } from "./entities/user.entity";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get("me")
  @ApiOperation({ summary: "Get current authorized user data" })
  @ApiResponse({
    status: 200,
    description: "User data successful received",
    type: UserEntity,
  })
  async getMe(@Request() req: RequestWithUser) {
    const user = await this.usersService.findById(req.user.userId);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const { passwordHash, ...result } = user;
    return result;
  }
}
