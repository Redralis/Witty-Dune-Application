import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Reply, ReplyDocument } from './reply.schema';

@Injectable()
export class RepliesService {
  private readonly logger = new Logger(RepliesService.name);

  constructor(@InjectModel(Reply.name) private replyModel: Model<ReplyDocument>) {}

  @ApiOkResponse({ description: 'Replies retrieved successfully.' })
  public findAll(): Promise<Reply[]> {
    this.logger.log('Returning all replies.');
    return this.replyModel.find().exec();
  }

  @ApiOkResponse({ description: 'Reply retrieved successfully.' })
  @ApiNotFoundResponse({ description: 'Reply not found.' })
  public findOne(id: string): Promise<Reply> {
    this.logger.log(`Attempting to return reply with id: ${id}.`);
    const reply = this.replyModel.findById(id).exec();

    if (!reply) {
      this.logger.log(`No reply with id: ${id} found.`);
      throw new NotFoundException('Reply not found.');
    }

    this.logger.log(`Returning reply with id: ${id}.`);
    return reply;
  }

  @ApiCreatedResponse({ description: 'Reply created successfully.' })
  public async create(reply: Reply): Promise<Reply> {
    this.logger.log(`Attempting to create new reply with title: $reply.title}.`);

    const blogReply: Reply = {
      ...reply,
    };

    this.logger.log(`Creating new reply.`);
    this.replyModel.create(blogReply);

    return blogReply;
  }

  @ApiOkResponse({ description: 'Reply deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Reply not found.' })
  public async delete(id: string): Promise<void> {
    this.logger.log(`Attempting to delete reply with id: ${id}.`);
    const res = await this.replyModel.findByIdAndDelete(id);
    if (res == null) throw new NotFoundException('Reply not found.');
    this.logger.log(`Deleting reply with id: ${id}.`);
    this.replyModel.remove(id);
  }

  @ApiOkResponse({ description: 'Reply updated successfully.' })
  @ApiNotFoundResponse({ description: 'Reply not found.' })
  public async update(id: string, reply: Reply): Promise<Reply> {
    this.logger.log(`Attempting to update reply with id: ${id}.`);
    const blogReply: Reply = {
      ...reply,
    };
    const res = await this.replyModel.findByIdAndUpdate(id, blogReply);
    if (res == null) throw new NotFoundException('Reply not found.');
    this.logger.log(`Updating reply with id: ${id}.`);

    return blogReply;
  }
}
