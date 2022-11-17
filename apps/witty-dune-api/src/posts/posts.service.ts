import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PostModel } from './posts/posts.interface';

@Injectable()
export class PostsService {
  private posts: Array<PostModel> = [];
  private readonly logger = new Logger(PostsService.name);

  public findAll(): Array<PostModel> {
    this.logger.log('Returning all posts.');
    return this.posts;
  }

  public findOne(id: number): PostModel {
    this.logger.log(`Attempting to return post with id: ${id}.`);
    const post: PostModel = this.posts.find((post) => post.id === id);

    if (!post) {
      this.logger.log(`No post with id: ${id} found.`)
      throw new NotFoundException('Post not found.');
    }

    this.logger.log(`Returning post with id: ${id}.`)
    return post;
  }

  public create(post: PostModel): PostModel {
    this.logger.log(`Attempting to create new post with title: ${post.title}.`);
    const maxId: number = Math.max(...this.posts.map((post) => post.id), 0);
    const id: number = maxId + 1;

    const blogPost: PostModel = {
      id,
      ...post,
    };

    this.logger.log(`Creating new post.`);
    this.posts.push(blogPost);

    return blogPost;
  }

  public delete(id: number): void {
    this.logger.log(`Attempting to delete post with id: ${id}.`);
    const index: number = this.posts.findIndex((post) => post.id === id);

    // -1 is returned when no findIndex() match is found
    if (index === -1) {
      this.logger.log(`No post with id: ${id} found.`)
      throw new NotFoundException('Post not found.');
    }

    this.logger.log(`Deleting post with id: ${id}.`)
    this.posts.splice(index, 1);
  }

  public update(id: number, post: PostModel): PostModel {
    this.logger.log(`Attempting to update post with id: ${id}.`);
    const index: number = this.posts.findIndex((post) => post.id === id);

    // -1 is returned when no findIndex() match is found
    if (index === -1) {
      this.logger.log(`No post with id: ${id} found.`)
      throw new NotFoundException('Post not found.');
    }

    const blogPost: PostModel = {
      id,
      ...post,
    };

    this.logger.log(`Updating post with id: ${id}.`)
    this.posts[index] = blogPost;

    return blogPost;
  }
}
