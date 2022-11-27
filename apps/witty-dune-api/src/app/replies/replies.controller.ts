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
import { Reply } from './reply.schema';

@Controller('replies')
@ApiTags('Replies')
export class RepliesController {
  constructor(private readonly repliesService: RepliesService) {}

  @Get()
  public findAll(): Promise<Array<Reply>> {
    return this.repliesService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id') id: string): Promise<Reply> {
    return this.repliesService.findOne(id);
  }

  @Post()
  public async create(@Body() reply: Reply): Promise<Reply> {
    return this.repliesService.create(reply);
  }

  @Delete(':id')
  public delete(@Param('id') id: string): void {
    this.repliesService.delete(id);
  }

  @Put(':id')
  public update(@Param('id') id: string, @Body() reply: Reply): Promise<Reply> {
    return this.repliesService.update(id, reply);
  }
}
