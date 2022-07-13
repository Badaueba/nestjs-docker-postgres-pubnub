import { Injectable } from '@nestjs/common';
import { ArticlesImportService } from 'src/features/articles/providers/articles-import.service';
import { User } from 'src/features/user/user.entity';
import { UserService } from 'src/features/user/user.service';

@Injectable()
export class SeedService {
	constructor(
		private userService: UserService,
		private articleImportService: ArticlesImportService,
	) {}

	async seed() {
		await this.userService.create({
			email: 'admin@test.com',
			name: 'admin',
			password: 'admintest',
		});

		await this.articleImportService.importJob();
	}
}
