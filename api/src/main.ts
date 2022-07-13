import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const config = new DocumentBuilder()
		.setTitle('Space Flight News')
		.setDescription('Nestjs api + swagger + Heroku postgres + Pub Nub')
		.setVersion('1.0')
		.addBearerAuth(
			{ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
			'JWT',
		)
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('/docs', app, document, {
		swaggerOptions: {
			persistAuthorization: true,
		},
	});
	await app.listen(process.env.API_PORT);
	const logger = new Logger('Main');
	logger.debug('listening on ' + process.env.API_PORT);
}

bootstrap();
