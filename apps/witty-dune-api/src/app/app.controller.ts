import { Controller, Post, UseGuards, Get, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { User } from './users/schemas/user.schema';
import { Neo4jService } from './neo/neo4j.service';
import { CreateUserQuery } from './neo/cypher.queries';

@Controller()
@ApiTags('Auth')
export class AppController {
  constructor(
    private authService: AuthService,
    private readonly neo4jService: Neo4jService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() user) {
    return this.authService.login(user);
  }

  @Post('auth/register')
  async register(@Body() user: User) {
    const newUser = await this.authService.register(user);
    return newUser;
  }
}
