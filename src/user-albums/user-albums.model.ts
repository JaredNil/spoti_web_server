import { BelongsToMany, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.model';
import { Album } from 'src/album/album.model';

@Table({ tableName: 'user_albums', createdAt: false, updatedAt: false })
export class UserAlbums extends Model<UserAlbums> {
	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	id: number;

	@ForeignKey(() => Album)
	@Column({ type: DataType.INTEGER })
	albumId: number;

	@ForeignKey(() => User)
	@Column({ type: DataType.INTEGER })
	userId: number;
}
