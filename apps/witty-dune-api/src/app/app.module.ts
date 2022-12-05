import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config'
import { GamesModule } from './games/games.module';

@Module({
  imports: [ConfigModule.forRoot(), MongooseModule.forRoot(process.env.DATABASE_CONNECTION), PostsModule, GamesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
