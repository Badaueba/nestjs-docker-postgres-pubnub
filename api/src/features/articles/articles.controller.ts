import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
	UseFilters,
	UseGuards,
	UsePipes,
} from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';
import { PageParams } from 'src/shared/dto/ParamDto';
import { HttpExceptionFilter } from 'src/shared/filters/http-exception.filter';
import { CustomValidationPipe } from 'src/shared/pipes/custom-validator.pipe';
import { JwtGuard } from '../auth/guards/auth-jwt.guard';

import { Article } from './article.entity';
import { CreateArticleDto, UpdateArticleDto } from './dto/create-article.dto';
import { ArticlesImportService } from './providers/articles-import.service';
import { ArticlesService } from './providers/articles.service';

@Controller('articles')
@ApiTags('Articles')
@UseFilters(HttpExceptionFilter)
@ApiBearerAuth('JWT')
@UseGuards(JwtGuard)
export class ArticlesController {
	constructor(
		private articlesService: ArticlesService,
		private articlesImportService: ArticlesImportService,
	) {}

	@Post('/import')
	@ApiOperation({
		summary: 'Articles Manual import',
	})
	@ApiOkResponse({
		type: String,
	})
	public importArticles() {
		this.articlesImportService.import();
		return 'Import initialized';
	}

	@Get('/')
	@ApiOperation({
		summary: 'Get All articles',
	})
	@ApiOkResponse({
		type: [Article],
	})
	@UsePipes(CustomValidationPipe)
	public getArticles(@Query() params: PageParams) {
		return this.articlesService.list(params);
	}

	@Get('/:id')
	@ApiOperation({
		summary: 'Get One article',
	})
	@ApiOkResponse({
		type: Article,
	})
	public getArticle(@Param('id') id: number) {
		return this.articlesService.findById(id);
	}

	@Post('/')
	@ApiOperation({
		summary: 'Creates One article',
	})
	@ApiOkResponse({
		type: Article,
	})
	public createArticle(@Body(CustomValidationPipe) data: CreateArticleDto) {
		return this.articlesService.create(data);
	}

	@Put('/:id')
	@ApiOperation({
		summary: 'Updates One article',
	})
	@ApiOkResponse({
		type: Boolean,
	})
	public updateArticle(
		@Param('id') id: number,
		@Body(CustomValidationPipe) data: UpdateArticleDto,
	) {
		return this.articlesService.update(id, data);
	}

	@Delete('/:id')
	@ApiOperation({
		summary: 'Removes One article',
	})
	@ApiOkResponse({
		type: Boolean,
	})
	public removeArticle(@Param('id') id: number) {
		return this.articlesService.remove(id);
	}
}
