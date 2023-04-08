import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './schemas/post.schema';
import { Neo4jService } from '../neo/neo4j.service';
import {
  GetPostsLinkedWithUser,
  GetPostsOfUsersFollowedByUser,
  GetPostsOfUsersFollowedByUsersFollowedByUserExcludingUsersFollowedByUser,
} from '../neo/cypher.queries';

@Injectable()
export class PostsService {
  private readonly logger = new Logger(PostsService.name);

  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    private Neo4jService: Neo4jService
  ) {}

  @ApiOkResponse({ description: 'Posts retrieved successfully.' })
  public async findAll(filter: String, userId: String): Promise<Post[]> {
    if (!filter && userId) {
      this.logger.log(`filtering by user: ${userId}`);
      const neo4jRecords = await this.Neo4jService.read(
        GetPostsLinkedWithUser,
        {
          userIdParam: userId,
        }
      );
      const postIds = neo4jRecords.records.map(
        (record) => record.get('p').properties.objectId
      );
      return this.postModel
        .find({ _id: { $in: postIds } })
        .populate('associatedgame')
        .sort({ publicationdate: -1 })
        .exec();
    }
    if (filter == 'following') {
      this.logger.log('Filtering by following');
      const neo4jRecords = await this.Neo4jService.read(
        GetPostsOfUsersFollowedByUser,
        {
          userIdParam: userId,
        }
      );
      const postIds = neo4jRecords.records.map(
        (record) => record.get('p').properties.objectId
      );
      return this.postModel
        .find({ _id: { $in: postIds } })
        .populate('associatedgame')
        .sort({ publicationdate: -1 })
        .exec();
    } else if (filter == 'foryou') {
      this.logger.log('Filtering by foryou');
      const neo4jRecords = await this.Neo4jService.read(
        GetPostsOfUsersFollowedByUsersFollowedByUserExcludingUsersFollowedByUser,
        {
          userIdParam: userId,
        }
      );
      const postIds = neo4jRecords.records.map(
        (record) => record.get('p').properties.objectId
      );
      return this.postModel
        .find({ _id: { $in: postIds } })
        .populate('associatedgame')
        .sort({ publicationdate: -1 })
        .exec();
    } else {
      this.logger.log('Returning all posts.');
      return this.postModel
        .find()
        .populate('associatedgame')
        .sort({ publicationdate: -1 })
        .exec();
    }
  }

  @ApiOkResponse({ description: 'Post retrieved successfully.' })
  @ApiNotFoundResponse({ description: 'Post not found.' })
  public findOne(id: string): Promise<Post> {
    this.logger.log(`Attempting to return post with id: ${id}.`);
    const post = this.postModel.findById(id).populate('associatedgame').exec();
    if (!post) {
      this.logger.log(`No post with id: ${id} found.`);
      throw new NotFoundException('Post not found.');
    }
    this.logger.log(`Returning post with id: ${id}.`);
    return post;
  }

  @ApiCreatedResponse({ description: 'Post created successfully.' })
  public async create(post: Post) {
    this.logger.log(`Attempting to create new post with title: ${post.title}.`);
    const blogPost: Post = {
      ...post,
    };
    this.logger.log(`Creating new post.`);
    return await this.postModel.create(blogPost);
  }

  @ApiOkResponse({ description: 'Post deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Post not found.' })
  public async delete(id: string): Promise<void> {
    this.logger.log(`Attempting to delete post with id: ${id}.`);
    const res = await this.postModel.findByIdAndDelete(id);
    if (res == null) throw new NotFoundException('Post not found.');
    this.logger.log(`Deleting post with id: ${id}.`);
    this.postModel.remove(id);
  }

  @ApiOkResponse({ description: 'Post updated successfully.' })
  @ApiNotFoundResponse({ description: 'Post not found.' })
  public async update(id: string, post: Post): Promise<Post> {
    this.logger.log(`Attempting to update post with id: ${id}.`);
    const blogPost: Post = {
      ...post,
    };
    const res = await this.postModel.findByIdAndUpdate(id, blogPost);
    if (res == null) throw new NotFoundException('Post not found.');
    this.logger.log(`Updating post with id: ${id}.`);
    return blogPost;
  }
}
