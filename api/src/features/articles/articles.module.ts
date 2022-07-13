import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PubNubModule } from 'src/config/notification/pubnub.module';
import { SpaceFlightModule } from '../space-flight/space-flight.module';
import { Article } from './article.entity';
import { ArticlesController } from './articles.controller';
import { ArticlesImportService } from './providers/articles-import.service';
import { ArticlesService } from './providers/articles.service';

@Module({
	controllers: [ArticlesController],
	providers: [ArticlesService, ArticlesImportService],
	imports: [
		PubNubModule,
		SpaceFlightModule,
		TypeOrmModule.forFeature([Article]),
	],
	exports: [ArticlesService, ArticlesImportService],
})
export class ArticlesModule {}
