import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
@ApiTags('Auth')
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() user) {
    return this.authService.login(user);
  }

  @Post('auth/register')
  async register(@Body() user) {
    return this.authService.register(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Body() user) {
    return this.authService.profile(user.username);
  }

  @Delete('profile')
  async delete(@Body() user) {
    return this.authService.delete(user);
  }
}
