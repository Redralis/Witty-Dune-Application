import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type GameDocument = HydratedDocument<Game>;

@Schema()
export class Game {
  @Prop({ required: true, unique: true })
  @ApiProperty({ type: String })
  name: string;
  @Prop({ required: true })
  @ApiProperty({ type: String })
  description: string;
  @Prop({ required: true })
  @ApiProperty({ type: String, format: 'date-time' })
  releasedate: Date;
  @Prop({ required: true })
  @ApiProperty({ type: String })
  logo: string;
}

export const GameSchema = SchemaFactory.createForClass(Game);
