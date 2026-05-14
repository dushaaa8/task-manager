import {
  Controller,
  Get,
  UseGuards,
  Request,
  NotFoundException,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt/jwt-auth.guard";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get("me")
  async getMe(@Request() req) {
    const user = await this.usersService.findById(req.user.userId);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const { passwordHash, ...result } = user;
    return result;
  }
}
