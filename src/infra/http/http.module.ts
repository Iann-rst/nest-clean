import { Module } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions.controller'

@Module({
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
  ],
  // Quais controllers existem dentro desse modulo

  providers: [PrismaService], // Todas as dependências que os controllers podem ter
})
export class HttpModule {}
