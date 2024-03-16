import { Controller, Delete } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('app')
export class AppController {
	constructor(private appService: AppService) {}

	@ApiOperation({ summary: 'Удалить всю базу данных' })
	@Delete()
	nullUsersDatabase() {
		return this.appService.nullUsersDatabase();
	}
}
