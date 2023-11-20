import { Controller, Get, Param } from '@nestjs/common'
import { HttpQuestionPresenter } from '../presenters/http-question-presenter'
import { GetQuestionBySlugUseCase } from './../../../domain/forum/application/use-cases/get-question-by-slug'

@Controller('/questions/:slug')
export class GetQuestionBySlugController {
  constructor(private getQuestionBySlug: GetQuestionBySlugUseCase) {}

  @Get()
  async handle(@Param('slug') slug: string) {
    const result = await this.getQuestionBySlug.execute({
      slug,
    })

    if (result.isLeft()) {
      throw new Error()
    }

    return {
      question: HttpQuestionPresenter.toHTTP(result.value.question),
    }
  }
}
