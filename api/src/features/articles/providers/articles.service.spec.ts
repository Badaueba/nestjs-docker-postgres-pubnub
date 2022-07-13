import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../article.entity';
import { ArticlesService } from './articles.service';

describe('ArticlesService', () => {
	let service: ArticlesService;

	let repository: Repository<Article>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ArticlesService,
				{
					provide: getRepositoryToken(Article),
					useValue: {
						count: jest.fn(),
						find: jest.fn(),
						save: jest.fn(),
						delete: jest.fn(),
						update: jest.fn(),
						remove: jest.fn(),
					},
				},
			],
		}).compile();

		service = module.get<ArticlesService>(ArticlesService);
		repository = module.get<Repository<Article>>(
			getRepositoryToken(Article),
		);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
