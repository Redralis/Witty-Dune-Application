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
import { Neo4jService } from '../neo/neo4j.service';
import {
  FollowOtherUserByName,
  GetFollowedUsers,
  UnfollowOtherUserByName,
} from '../neo/cypher.queries';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private neo4jService: Neo4jService
  ) {}

  @ApiOkResponse({ description: 'User retrieved successfully.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  async findOne(username: string) {
    this.logger.log(`Attempting to return user with username: ${username}.`);
    var user: any = await this.userModel.findOne({ username: username });
    const neo4jRecords = await this.neo4jService.read(GetFollowedUsers, {
      userIdParam: user._id.toString(),
    });
    user.following = neo4jRecords.records.map(record => record.get('f').properties.username);
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
    const neo4jRecords = await this.neo4jService.read(GetFollowedUsers, {
      userIdParam: user._id.toString(),
    });
    const usernames = neo4jRecords.records.map(record => record.get('f').properties.username);
    if (!user) {
      this.logger.log(`No user with username: ${username} found.`);
      throw new NotFoundException('User not found.');
    }
    const newUser = {
      _id: user._id,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      dateofbirth: user.dateofbirth,
      country: user.country,
      following: usernames,
      profilepic: user.profilepic,
      __v: user.__v,
    };
    this.logger.log(`Returning user with username: ${username}.`);
    return newUser;
  }

  @ApiOkResponse({ description: 'User followed successfully.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  async follow(currentUserId: String, username: string) {
    this.logger.log(`Attempting to follow user with username: ${username}.`);
    await this.neo4jService.write(FollowOtherUserByName, {
      userIdParam: currentUserId,
      usernameParam: username,
    });
  }

  @ApiOkResponse({ description: 'User followed successfully.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  async unfollow(currentUserId: String, username: string) {
    this.logger.log(`Attempting to unfollow user with username: ${username}.`);
    await this.neo4jService.write(UnfollowOtherUserByName, {
      userIdParam: currentUserId,
      usernameParam: username,
    });
  }

  @ApiCreatedResponse({ description: 'User created successfully.' })
  public async create(user: User) {
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
    return await this.userModel.create(newUser);
  }

  @ApiOkResponse({ description: 'User updated successfully.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  public async update(id: string, user: User): Promise<User> {
    this.logger.log(`Attempting to update user with id: ${id}.`);
    const newUser: User = {
      ...user,
    };
    const res = await this.userModel.findByIdAndUpdate(id, newUser);
    if (res == null) throw new NotFoundException('User not found.');
    this.logger.log(`Updating user with id: ${id}.`);
    return newUser;
  }

  @ApiOkResponse({ description: 'User deleted successfully.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  public async delete(id: string): Promise<void> {
    this.logger.log(`Attempting to delete user with id: ${id}.`);
    const res = await this.userModel.findByIdAndDelete(id);
    if (res == null) throw new NotFoundException('User not found.');
    this.logger.log(`Deleting user with id: ${id}.`);
    this.userModel.remove(id);
  }
}
