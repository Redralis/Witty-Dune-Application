import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ReplyDocument = HydratedDocument<Reply>;

@Schema()
export class Reply {
    @Prop()
    id: number;
    @Prop()
    content: string;
    @Prop()
    likes: number;
    @Prop()
    dislikes: number;
    @Prop()
    publicationdate: Date;
}

export const ReplySchema = SchemaFactory.createForClass(Reply);