import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Comment } from './comment.schema';
import { Game } from '../../games/schemas/game.schema';
import { ApiProperty } from '@nestjs/swagger';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop()
  id: string;
  @ApiProperty({ type: String })
  @Prop()
  title: string;
  @ApiProperty({ type: String })
  @Prop()
  content: string;
  @Prop()
  @ApiProperty({ type: Number })
  likes: number;
  @ApiProperty({ type: Number })
  @Prop()
  dislikes: number;
  @ApiProperty({ type: String, format: 'date-time' })
  @Prop()
  publicationdate: Date;
  @Prop({ type: [{ type: mongoose.Schema.Types.Array }] })
  @ApiProperty({ type: [Comment] })
  comments: Comment;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Game" }] })
  @ApiProperty({ type: Game })
  associatedgame: Game;
}

export const PostSchema = SchemaFactory.createForClass(Post);
