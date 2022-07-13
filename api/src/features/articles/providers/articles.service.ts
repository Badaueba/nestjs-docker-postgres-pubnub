import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../article.entity';
import { repositoryError } from 'src/shared/handle-error';
import { CreateArticleDto, UpdateArticleDto } from '../dto/create-article.dto';
import { PageParams } from 'src/shared/dto/ParamDto';
import { GenericList } from 'src/shared/schemas/list-schemas';

@Injectable()
export class ArticlesService {
	constructor(
		@InjectRepository(Article)
		private readonly articleRepository: Repository<Article>,
	) {}

	async count(): Promise<number> {
		return this.articleRepository.count();
	}
	async list(params: PageParams): Promise<GenericList<Article>> {
		try {
			const page = params.page ? params.page : 0;
			const limit = params.limit ? params.limit : 100;

			const count = await this.count();
			const skip = page * limit;
			const articles = await this.articleRepository.find({
				take: limit,
				skip,
			});

			const list: GenericList<Article> = {
				list: articles,
				page: params.page,
				total: count,
			};

			return list;
		} catch (e) {
			repositoryError(e);
		}
	}

	async findById(id: number): Promise<Article> {
		try {
			const article = await this.articleRepository.findOne({
				where: { id },
			});
			return article;
		} catch (e) {
			repositoryError(e);
		}
	}

	async create(data: CreateArticleDto): Promise<Article> {
		try {
			const articleEntity = new Article(data);
			const article = await this.articleRepository.save(articleEntity);
			return article;
		} catch (e) {
			repositoryError(e);
		}
	}

	async update(
		id: number,
		data: Partial<UpdateArticleDto>,
	): Promise<boolean> {
		try {
			const article = await this.findById(id);
			if (!article)
				throw new HttpException(
					'Article not found',
					HttpStatus.NOT_FOUND,
				);
			await this.articleRepository.update(id, data);
			return true;
		} catch (e) {
			repositoryError(e);
		}
	}

	async remove(id: number): Promise<boolean> {
		try {
			await this.articleRepository.delete(id);
			return true;
		} catch (e) {
			repositoryError(e);
		}
	}

	async removeMany(ids: Article[]) {
		try {
			await this.articleRepository.remove(ids);
		} catch (e) {
			repositoryError(e);
		}
	}
}
