import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface AlbumCreationAttrs {
	name: string;
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
	audio: string;
}
