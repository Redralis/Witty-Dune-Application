import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':username')
  getProfile(@Param('username') username: string) {
    return this.UsersService.profile(username);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() user: User) {
    return this.UsersService.update(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.UsersService.delete(id);
  }
}
