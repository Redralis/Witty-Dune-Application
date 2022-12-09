import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  @ApiOkResponse({ description: 'User retrieved successfully.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  async findOne(username: string): Promise<any | undefined> {
    this.logger.log(`Attempting to return user with username: ${username}.`);
    var user: any = await this.userModel.findOne({ username: username });

    if (!user) {
      this.logger.log(`No user with username: ${username} found.`);
      throw new NotFoundException('User not found.');
    }

    this.logger.log(`Returning user with username: ${username}.`);
    return user;
  }

  @ApiOkResponse({ description: 'User retrieved successfully.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  async profile(username: string): Promise<any | undefined> {
    this.logger.log(`Attempting to return user with username: ${username}.`);
    var user: any = await this.userModel.findOne({ username: username });

    if (!user) {
      this.logger.log(`No user with username: ${username} found.`);
      throw new NotFoundException('User not found.');
    }

    const newUser = {
      _id: user._id,
      username: user.username,
      __v: user.__v,
    };

    this.logger.log(`Returning user with username: ${username}.`);
    return newUser;
  }

  @ApiCreatedResponse({ description: 'User created successfully.' })
  public async create(user: User): Promise<User> {
    this.logger.log(
      `Attempting to create new user with username: ${user.username}.`
    );
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(user.password, saltOrRounds);

    const newUser: User = {
      ...user,
      password: hash,
    };

    this.logger.log(`Creating new user.`);
    this.userModel.create(newUser);

    return newUser;
  }

  @ApiOkResponse({ description: 'User deleted successfully.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  public async delete(username: string): Promise<void> {
    this.logger.log(`Attempting to delete user with username: ${username}.`);
    const res = await this.userModel.deleteOne({ username: username });
    if (res == null) throw new NotFoundException('User not found.');
    this.logger.log(`Deleting user with username: ${username}.`);
    this.userModel.remove(username);
  }
}
