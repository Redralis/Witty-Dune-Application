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
import { PostsService } from './posts.service';
import { Post as ForumPost } from './post.schema';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  public findAll(): Promise<Array<ForumPost>> {
    return this.postsService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id') id: string): Promise<ForumPost> {
    return this.postsService.findOne(id);
  }

  @Post()
  public async create(@Body() post: ForumPost): Promise<ForumPost> {
    return this.postsService.create(post);
  }

  @Delete(':id')
  public delete(@Param('id') id: string): void {
    this.postsService.delete(id);
  }

  @Put(':id')
  public update(
    @Param('id') id: string,
    @Body() post: ForumPost
  ): Promise<ForumPost> {
    return this.postsService.update(id, post);
  }
}
