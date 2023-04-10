import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ unique: true, required: true })
  @ApiProperty({ type: String })
  username: string;
  @Prop({ required: true})
  @ApiProperty({ type: String })
  password: string;
  @Prop({ required: true })
  @ApiProperty({ type: String })
  firstname: string;
  @Prop({ required: true })
  @ApiProperty({ type: String })
  lastname: string;
  @Prop({ required: true })
  @ApiProperty({ type: String })
  email: string;
  @Prop({ required: true })
  @ApiProperty({ type: String })
  profilepic: string;
  @ApiProperty({ type: String, format: 'date-time' })
  @Prop({ required: true })
  dateofbirth: Date;
  @Prop({ required: true })
  @ApiProperty({ type: String })
  country: string;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  @ApiProperty({ type: [User] })
  following: User;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.post('findOneAndDelete', async (doc: UserDocument) => {
  try {
    await doc.$model('Post').deleteMany({ postedBy: doc.username });
  } catch (error) {}
});
