import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RepliesService } from './replies.service';
import { ReplyModel } from './replies/replies.interface';

@Controller('replies')
@ApiTags('Replies')
export class RepliesController {
  constructor(private readonly repliesService: RepliesService) {}

  @Get()
  public findAll(): Array<ReplyModel> {
    return this.repliesService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id', ParseIntPipe) id: number): ReplyModel {
    return this.repliesService.findOne(id);
  }

  @Post()
  public create(@Body() reply: ReplyModel): ReplyModel {
    return this.repliesService.create(reply);
  }

  @Delete(':id')
  public delete(@Param('id', ParseIntPipe) id: number): void {
    this.repliesService.delete(id);
  }

  @Put(':id')
  public update(
    @Param('id', ParseIntPipe) id: number,
    @Body() reply: ReplyModel
  ): ReplyModel {
    return this.repliesService.update(id, reply);
  }
}
