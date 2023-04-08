import { Body, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { User } from '../users/schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      return { username: user.username, objectId: user._id };
    }
    return null;
  }

  @ApiCreatedResponse({ description: 'User created successfully.' })
  public async register(credentials: User): Promise<any> {
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
  public async update(user: any): Promise<any> {
    const result = await this.usersService.update(user._id, user);
    return result;
  }

  async login(user: any) {
    const loggedInUser = await this.usersService.findOne(user.username)
    const payload = { username: user.username, sub: loggedInUser._id.toString()};
    return {
      access_token: this.jwtService.sign(payload),
      username: user.username,
    };
  }
}
