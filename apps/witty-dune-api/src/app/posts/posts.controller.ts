import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PostsService } from './posts.service';
import { Post as ForumPost } from './schemas/post.schema';
import { Neo4jService } from '../neo/neo4j.service';
import { CreatePostQuery, DeletePostAndRelationshipQuery, LinkPostToUserQuery } from '../neo/cypher.queries';
import { AuthUser } from '../decorators/auth.user';
import fs = require('fs');

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private Neo4JService: Neo4jService
  ) {}

  @Get()
  public findAll(@Query() params: any): Promise<Array<ForumPost>> {
    return this.postsService.findAll(params.filter);
  }

  @Get(':id')
  public findOne(@Param('id') id: string): Promise<ForumPost> {
    return this.postsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  public async create(
    @Body() post: ForumPost,
    @AuthUser() user: any
  ): Promise<ForumPost> {
    const newPost = await this.postsService.create(post);
    await this.Neo4JService.write(CreatePostQuery, {
      idParam: newPost._id.toString(),
    }).then(() => {
      this.Neo4JService.write(LinkPostToUserQuery, {
        userIdParam: user.userId,
        postIdParam: newPost._id.toString(),
      });
    });
    return newPost;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  public async delete(@Param('id') id: string) {
    await this.postsService.delete(id);
    await this.Neo4JService.write(DeletePostAndRelationshipQuery, {
      idParam: id,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  public update(
    @Param('id') id: string,
    @Body() post: ForumPost
  ): Promise<ForumPost> {
    return this.postsService.update(id, post);
  }
}
