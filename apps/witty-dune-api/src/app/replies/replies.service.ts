import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { ReplyModel } from './replies/replies.interface';

@Injectable()
export class RepliesService {
  private replies: Array<ReplyModel> = [];

  private readonly logger = new Logger(RepliesService.name);

  @ApiOkResponse({ description: 'Replies retrieved successfully.' })
  public findAll(): Array<ReplyModel> {
    this.logger.log('Returning all replies.');
    return this.replies;
  }

  @ApiOkResponse({ description: 'Reply retrieved successfully.' })
  @ApiNotFoundResponse({ description: 'Reply not found.' })
  public findOne(id: number): ReplyModel {
    this.logger.log(`Attempting to return reply with id: ${id}.`);
    const reply: ReplyModel = this.replies.find((reply) => reply.id === id);

    if (!reply) {
      this.logger.log(`No reply with id: ${id} found.`);
      throw new NotFoundException('Reply not found.');
    }

    this.logger.log(`Returning reply with id: ${id}.`);
    return reply;
  }

  @ApiCreatedResponse({ description: 'Reply created successfully.' })
  public create(reply: ReplyModel): ReplyModel {
    this.logger.log(`Attempting to create new reply with title: $reply.title}.`);
    const maxId: number = Math.max(...this.replies.map((reply) => reply.id), 0);
    const id: number = maxId + 1;

    const blogReply: ReplyModel = {
      id,
      ...reply,
    };

    this.logger.log(`Creating new reply.`);
    this.replies.push(blogReply);

    return blogReply;
  }

  @ApiOkResponse({ description: 'Reply deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Reply not found.' })
  public delete(id: number): void {
    this.logger.log(`Attempting to delete reply with id: ${id}.`);
    const index: number = this.replies.findIndex((reply) => reply.id === id);

    // -1 is returned when no findIndex() match is found
    if (index === -1) {
      this.logger.log(`No reply with id: ${id} found.`);
      throw new NotFoundException('Reply not found.');
    }

    this.logger.log(`Deleting reply with id: ${id}.`);
    this.replies.splice(index, 1);
  }

  @ApiOkResponse({ description: 'Reply updated successfully.' })
  @ApiNotFoundResponse({ description: 'Reply not found.' })
  public update(id: number, reply: ReplyModel): ReplyModel {
    this.logger.log(`Attempting to update reply with id: ${id}.`);
    const index: number = this.replies.findIndex((reply) => reply.id === id);

    // -1 is returned when no findIndex() match is found
    if (index === -1) {
      this.logger.log(`No reply with id: ${id} found.`);
      throw new NotFoundException('Reply not found.');
    }

    const blogReply: ReplyModel = {
      id,
      ...reply,
    };

    this.logger.log(`Updating reply with id: ${id}.`);
    this.replies[index] = blogReply;

    return blogReply;
  }
}
