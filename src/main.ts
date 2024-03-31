import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

const start = async () => {
	try {
		const PORT = process.env.PORT || 8040;
		const app = await NestFactory.create(AppModule);

		const config = new DocumentBuilder().setTitle('Spotify @JaredN backend').setDescription('backend').setVersion('0.2').addTag('spt').build();

		const document = SwaggerModule.createDocument(app, config);
		SwaggerModule.setup('/api/docs', app, document);

		// app.useGlobalGuards(RolesGuard);

		app.useGlobalPipes(new ValidationPipe());

		app.use(cookieParser());

		// app.enableCors({ credentials: true, origin: 'http://localhost:3000', methods: ['POST', 'GET'] });
		app.enableCors({ credentials: true, origin: 'https://spoti-web.vercel.app', methods: ['POST', 'GET'] });

		await app.listen(PORT, () => console.log('server started on PORT ' + PORT));
	} catch (error) {
		console.log(error);
	}
};

start();
