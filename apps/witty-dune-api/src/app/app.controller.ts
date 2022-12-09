import {
  Controller,
  Request,
  Post,
  Put,
  UseGuards,
  Get,
  Body,
  Delete,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { User } from './users/schemas/user.schema';

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
  async register(@Body() user: User) {
    return this.authService.register(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth/:username')
  getProfile(@Param('username') username: string) {
    return this.authService.profile(username);
  }

  @UseGuards(JwtAuthGuard)
  @Put('auth/')
  async update(@Body() user: User) {
    return this.authService.update(user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('auth/:id')
  async delete(@Param('id') id: string) {
    return this.authService.delete(id);
  }
}
