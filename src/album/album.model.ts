import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Track } from './../track/track.model';
import { User } from 'src/users/users.model';

interface AlbumCreationAttrs {
	name: string;
	userId: number;
}

@Table({ tableName: 'album' })
export class Album extends Model<Album, AlbumCreationAttrs> {
	@ApiProperty({ example: '0', description: 'Уникальный индетификатор пользователя трека внутри Spotify.' })
	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	id: number;

	@ApiProperty({ example: 'Name_track', description: 'Название альбома' })
	@Column({ type: DataType.STRING, unique: false, allowNull: false })
	name: string;

	@ApiProperty({ example: '...png', description: 'Ссылка на изображение логотипа.' })
	@Column({ type: DataType.STRING, allowNull: true })
	picture: string;

	@ApiProperty({ example: 'BLOB2', description: 'Объект с треком.' })
	@Column({ type: DataType.STRING, allowNull: true })
	tracks: Track[];

	@ForeignKey(() => User)
	@Column({ type: DataType.INTEGER })
	userId: number;

	@ApiProperty({ example: 'Username123', description: 'Автор плейлиста' })
	@BelongsTo(() => User)
	author: User;
}
