import { Module } from '@nestjs/common';
import { UserModule } from './features/user/user.module';
import { AuthModule } from './features/auth/auth.module';
import { DatabaseModule } from './config/database/database.module';
import { ArticlesModule } from './features/articles/articles.module';
import { AppController } from './app.controller';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
	imports: [
		DatabaseModule,
		AuthModule,
		UserModule,
		ArticlesModule,
		ScheduleModule.forRoot(),
	],
	controllers: [AppController],
	providers: [],
})
export class AppModule {}
