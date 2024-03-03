import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TrackDocument = HydratedDocument<Track>;

@Schema()
export class Track {
	@Prop()
	id: string;

	@Prop()
	name: string;

	@Prop()
	artist: string;

	@Prop()
	track: string;

	@Prop()
	age: number;

	@Prop()
	picture: string;

	@Prop()
	audio: string;
}

export const TrackSchema = SchemaFactory.createForClass(Track);
