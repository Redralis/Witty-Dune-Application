import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  @ApiProperty({ type: String })
  username: string;
  @Prop()
  @ApiProperty({ type: String })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
