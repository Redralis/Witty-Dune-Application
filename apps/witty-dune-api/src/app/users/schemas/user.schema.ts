import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Game } from '../../games/schemas/game.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  @ApiProperty({ type: String })
  username: string;
  @Prop()
  @ApiProperty({ type: String })
  password: string;
  @Prop()
  @ApiProperty({ type: String })
  firstname: string;
  @Prop()
  @ApiProperty({ type: String })
  lastname: string;
  @Prop()
  @ApiProperty({ type: String })
  email: string;
  @Prop()
  @ApiProperty({ type: Boolean })
  iseighteen: boolean;
  @Prop()
  @ApiProperty({ type: String })
  profilepic: string;
  @ApiProperty({ type: String, format: 'date-time' })
  @Prop()
  dateofbirth: Date;
  @Prop()
  @ApiProperty({ type: String })
  country: string;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] })
  @ApiProperty({ type: [User] })
  following: User;
}

export const UserSchema = SchemaFactory.createForClass(User);
