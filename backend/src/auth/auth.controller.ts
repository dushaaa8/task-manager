import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";

interface RegisterDto {
  email: string;
  password: string;
  name: string;
}

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body.email, body.password, body.name);
  }
}
