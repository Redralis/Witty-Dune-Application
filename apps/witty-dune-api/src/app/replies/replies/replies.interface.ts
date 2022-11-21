import { ApiProperty } from "@nestjs/swagger";

export class ReplyModel {
    @ApiProperty({ type: Number })
    id: number;
    @ApiProperty({ type: String })
    content: string;
    @ApiProperty({ type: Number })
    likes: number;
    @ApiProperty({ type: Number })
    dislikes: number;
    @ApiProperty({ type: String, format: 'date-time' })
    publicationdate: Date;
}