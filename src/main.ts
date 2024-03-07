import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RolesGuard } from './auth/roles.guard';

const start = async () => {
	try {
		const PORT = process.env.PORT || 8040;
		const app = await NestFactory.create(AppModule);

		const config = new DocumentBuilder().setTitle('Spotify @JaredN backend').setDescription('backend').setVersion('0.2').addTag('spt').build();

		const document = SwaggerModule.createDocument(app, config);
		SwaggerModule.setup('/api/docs', app, document);

		// app.useGlobalGuards(RolesGuard);

		// app.enableCors();
		await app.listen(PORT, () => console.log('server started on PORT ' + PORT));
	} catch (error) {
		console.log(error);
	}
};

start();
