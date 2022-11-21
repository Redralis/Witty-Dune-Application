import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RepliesService } from './replies.service';
import { RepliesController } from './replies.controller';
import { Reply, ReplySchema } from './reply.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Reply.name, schema: ReplySchema }])],
  providers: [RepliesService],
  controllers: [RepliesController],
  exports: [RepliesService],
})
export class RepliesModule {}
