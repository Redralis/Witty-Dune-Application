import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type CommentDocument = HydratedDocument<Comment>;

export class Comment {
  @Prop()
  id: string;
  @ApiProperty({ type: String })
  @Prop()
  postedBy: string;
  @Prop()
  @ApiProperty({ type: String })
  content: string;
  @Prop()
  @ApiProperty({ type: Number })
  likes: number;
  @Prop()
  @ApiProperty({ type: Number })
  dislikes: number;
  @Prop()
  @ApiProperty({ type: String, format: 'date-time' })
  publicationdate: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
