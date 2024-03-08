import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface TrackCreationAttrs {
	name: string;
	artist: string;
	audio: string;
	picture: string;
}

@Table({ tableName: 'tracks' })
export class Track extends Model<Track, TrackCreationAttrs> {
	@ApiProperty({ example: '0', description: 'Уникальный индетификатор пользователя трека внутри Spotify.' })
	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	id: number;

	@ApiProperty({ example: 'Name_track', description: 'Название трека' })
	@Column({ type: DataType.STRING, unique: true, allowNull: false })
	name: string;

	@ApiProperty({ example: '***', description: 'Имя исполнителя' })
	@Column({ type: DataType.STRING, allowNull: false })
	artist: string;

	@ApiProperty({ example: 'BLOB', description: 'Объект с треком' })
	@Column({ type: DataType.BOOLEAN, defaultValue: false })
	track: string;

	@ApiProperty({ example: '...png', description: 'Ссылка на изображение логотипа.' })
	@Column({ type: DataType.STRING, allowNull: true })
	picture: string;

	@ApiProperty({ example: 'BLOB2', description: 'Объект с треком.' })
	@Column({ type: DataType.STRING, allowNull: true })
	audio: string;
}
