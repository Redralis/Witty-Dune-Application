import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { Neo4jService } from '../neo/neo4j.service';
import { DeleteUserAndAllLinkedPostsAndAllRelationships } from '../neo/cypher.queries';
import { AuthUser } from '../decorators/auth.user';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly UsersService: UsersService, private readonly Neo4jService: Neo4jService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':username')
  getProfile(@Param('username') username: string) {
    return this.UsersService.profile(username);
  }
  
  @UseGuards(JwtAuthGuard)
  @Post('follow/:username')
  follow(@Param('username') username: string, @AuthUser() user: any) {
    return this.UsersService.follow(user.userId, username);
  }

  @UseGuards(JwtAuthGuard)
  @Post('unfollow/:username')
  unfollow(@Param('username') username: string, @AuthUser() user: any) {
    return this.UsersService.unfollow(user.userId, username);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() user: User) {
    return this.UsersService.update(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.Neo4jService.write(DeleteUserAndAllLinkedPostsAndAllRelationships, {
      idParam: id,
    });
    return this.UsersService.delete(id);
  }
}
