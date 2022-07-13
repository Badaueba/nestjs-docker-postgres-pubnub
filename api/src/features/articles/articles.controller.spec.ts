import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './providers/articles.service';
import { mockArticleList } from '../space-flight/space-flight.service.spec';
import { ArticlesImportService } from './providers/articles-import.service';

describe('ArticlesController', () => {
	let controller: ArticlesController;

	let service: ArticlesService;
	let importService: ArticlesImportService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ArticlesController],
			providers: [
				{
					provide: ArticlesService,
					useValue: {
						count: jest.fn().mockResolvedValue(100),
						list: jest.fn().mockResolvedValue(mockArticleList),
						create: jest.fn().mockResolvedValue(mockArticleList[0]),
						remove: jest.fn().mockResolvedValue(true),
						removeMany: jest.fn(),
						findById: jest
							.fn()
							.mockResolvedValue(mockArticleList[0]),
					},
				},
				{
					provide: ArticlesImportService,
					useValue: {
						import: jest.fn(),
						importJob: jest.fn(),
					},
				},
			],
		}).compile();

		controller = module.get<ArticlesController>(ArticlesController);
		service = module.get<ArticlesService>(ArticlesService);
		importService = module.get<ArticlesImportService>(
			ArticlesImportService,
		);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('should return list of articles', async () => {
		await expect(controller.getArticles({ limit: 1000 })).resolves.toEqual(
			mockArticleList,
		);
	});
});
