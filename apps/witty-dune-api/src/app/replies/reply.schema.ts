import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from "@nestjs/swagger";

export type ReplyDocument = HydratedDocument<Reply>;

@Schema()
export class Reply {
    @Prop()
    id: string;
    @Prop()
    @ApiProperty({ type: String })
    postid: string;
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

export const ReplySchema = SchemaFactory.createForClass(Reply);