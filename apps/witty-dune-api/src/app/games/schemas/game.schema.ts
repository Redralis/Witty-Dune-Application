import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type GameDocument = HydratedDocument<Game>;

@Schema()
export class Game {
  @Prop()
  id: string;
  @Prop()
  @ApiProperty({ type: String })
  name: string;
  @Prop()
  @ApiProperty({ type: String })
  description: string;
  @Prop()
  @ApiProperty({ type: String, format: 'date-time' })
  publicationdate: Date;
}

export const GameSchema = SchemaFactory.createForClass(Game);
