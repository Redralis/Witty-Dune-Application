import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { GamesModule } from './games/games.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { Neo4jModule } from './neo/neo4j.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_CONNECTION),
    PostsModule,
    GamesModule,
    AuthModule,
    UsersModule,
    Neo4jModule.forRootAsync({
      scheme: 'neo4j+s',
      host: process.env.NEO4J_HOST,
      username: process.env.NEO4J_USR,
      password: process.env.NEO4J_PWD,
      database: process.env.NEO4J_DATABASE,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
