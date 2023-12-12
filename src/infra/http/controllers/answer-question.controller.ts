import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answer-question'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'

const answerQuestionBodySchema = z.object({
  content: z.string(),
  attachments: z.array(z.string().uuid()),
})

type CreateQuestionBodySchema = z.infer<typeof answerQuestionBodySchema>

const bodyValidationPipe = new ZodValidationPipe(answerQuestionBodySchema)

@Controller('/questions/:questionId/answers')
export class AnswerQuestionController {
  constructor(private answerQuestion: AnswerQuestionUseCase) {}

  @Post()
  async handle(
    @CurrentUser() user: UserPayload,
    @Body(bodyValidationPipe) body: CreateQuestionBodySchema,
    @Param('questionId') questionId: string,
  ) {
    const userID = user.sub
    const { content, attachments } = body

    const response = await this.answerQuestion.execute({
      attachmentsIds: attachments,
      instructorId: userID,
      questionId,
      content,
    })

    if (response.isLeft()) {
      throw new BadRequestException()
    }
  }
}
