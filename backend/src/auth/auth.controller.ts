import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { UserEntity } from "../users/entities/user.entity";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @ApiOperation({ summary: "Register a new user" })
  @ApiResponse({
    status: 201,
    description: "User successful registered",
    type: UserEntity,
  })
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Post("login")
  @ApiOperation({ summary: "Authorize existing user" })
  @ApiResponse({
    status: 200,
    description: "User successful authorized",
    type: UserEntity,
  })
  async login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }
}
