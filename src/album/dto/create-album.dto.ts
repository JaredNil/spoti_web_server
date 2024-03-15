import { Track } from 'src/track/track.model';

export class CreateAlbumDto {
	readonly name: string;
	readonly description: string;
	readonly userId: number;
	readonly tracks: [];
}

export class PushTrackDto {
	readonly albumId: number;
	// readonly track: Track;
}
