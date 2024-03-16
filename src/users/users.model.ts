import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Album } from 'src/album/album.model';

interface UserCreationAttrs {
	username: string;
	hash: string;
	salt: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
	@ApiProperty({ example: '1', description: 'Уникальный индетификатор пользователя приложения Spotify.' })
	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	id: number;

	@ApiProperty({ example: 'mail@gmail.com', description: 'Уникальная почта пользователя приложения Spotify.' })
	@Column({ type: DataType.STRING, unique: true, allowNull: false })
	username: string;

	@ApiProperty({ example: 'hash of password', description: 'Хэш пароля пользователя приложения Spotify.' })
	@Column({ type: DataType.STRING, allowNull: false })
	hash: string;

	@ApiProperty({ example: '***', description: 'Уникальная соль для пароля пользователя приложения Spotify.' })
	@Column({ type: DataType.STRING, allowNull: false })
	salt: string;

	@ApiProperty({ example: '[Liked, Sth...]', description: 'Объект с альбомами пользователя, первый объект выдается при регистрации.' })
	@HasMany(() => Album)
	albums: Album[];
}
