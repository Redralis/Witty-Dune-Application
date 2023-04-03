import { Controller, Post, UseGuards, Get, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { User } from './users/schemas/user.schema';
import { Neo4jService } from './neo/neo4j.service';

@Controller()
@ApiTags('Auth')
export class AppController {
  constructor(
    private authService: AuthService,
    private readonly neo4jService: Neo4jService
  ) {}

  @Get('neo')
  async getHello(): Promise<any> {
    const res = await this.neo4jService.read(
      `MATCH (n) RETURN count(n) AS count`,
      {}
    );
    return `There are ${res.records[0].get('count')} nodes in the database`;
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() user) {
    return this.authService.login(user);
  }

  @Post('auth/register')
  async register(@Body() user: User) {
    return this.authService.register(user);
  }
}
