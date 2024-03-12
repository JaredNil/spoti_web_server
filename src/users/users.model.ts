import { ApiProperty } from '@nestjs/swagger';
import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { Album } from 'src/album/album.model';
import { UserAlbums } from 'src/user-albums/user-albums.model';

interface UserCreationAttrs {
	email: string;
	password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
	@ApiProperty({ example: '1', description: 'Уникальный индетификатор пользователя приложения Spotify.' })
	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	id: number;

	@ApiProperty({ example: 'mail@gmail.com', description: 'Уникальная почта пользователя приложения Spotify.' })
	@Column({ type: DataType.STRING, unique: true, allowNull: false })
	email: string;

	@ApiProperty({ example: '***', description: 'Пароль пользователя приложения Spotify.' })
	@Column({ type: DataType.STRING, allowNull: false })
	password: string;

	@ApiProperty({ example: 'true/false', description: 'Предикат бана пользователя.' })
	@Column({ type: DataType.BOOLEAN, defaultValue: false })
	banned: boolean;

	@ApiProperty({ example: 'Lorem*10', description: 'Причина бана пользователя.' })
	@Column({ type: DataType.STRING, allowNull: true })
	banReason: string;

	@ApiProperty({ example: '[Liked, Sth...]', description: 'Объект с альбомами пользователя, первый объект выдается при регистрации.' })
	@BelongsToMany(() => Album, () => UserAlbums)
	albums: Album[];
}
