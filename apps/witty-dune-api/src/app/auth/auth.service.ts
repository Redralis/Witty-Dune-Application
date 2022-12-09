import { Body, Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { User } from '../users/schemas/user.schema';
import { UsersModule } from '../users/users.module';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  @ApiCreatedResponse({ description: 'User created successfully.' })
  public async register(credentials: any): Promise<any> {
    const user = await this.usersService.create(credentials);
    return user;
  }

  @ApiCreatedResponse({ description: 'User retrieved successfully.' })
  public async findOne(username: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    return user;
  }

  @ApiCreatedResponse({ description: 'User retrieved successfully.' })
  public async profile(username: string): Promise<any> {
    const user = await this.usersService.profile(username);
    return user;
  }

  @ApiCreatedResponse({ description: 'User created successfully.' })
  public async delete(body: any): Promise<any> {
    const user = await this.usersService.delete(body.username);
    return user;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
      username: user.username,
    };
  }
}
