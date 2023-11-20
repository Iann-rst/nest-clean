import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { Prisma, Answer as PrismaAnswer } from '@prisma/client'

export class PrismaAnswerMapper {
  static toDomain(raw: PrismaAnswer): Answer {
    return Answer.create(
      {
        authorId: new UniqueEntityId(raw.authorId),
        content: raw.content,
        questionId: new UniqueEntityId(raw.questionId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(answer: Answer): Prisma.AnswerUncheckedCreateInput {
    return {
      id: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: answer.content,
      questionId: answer.questionId.toString(),
      createdAt: answer.createdAt,
      updatedAt: answer.updatedAt,
    }
  }
}
