import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { RepliesModule } from './replies/replies.module';

@Module({
  imports: [PostsModule, RepliesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
