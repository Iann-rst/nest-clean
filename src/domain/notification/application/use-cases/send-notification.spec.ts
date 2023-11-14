import { InMemoryNotificationRepository } from 'test/repositories/in-memory-notification-repository'
import { SendNotificationUseCase } from './send-notification'

let inMemoryNotificationRepository: InMemoryNotificationRepository
let sut: SendNotificationUseCase

describe('Send Notification', () => {
  beforeEach(() => {
    inMemoryNotificationRepository = new InMemoryNotificationRepository()
    sut = new SendNotificationUseCase(inMemoryNotificationRepository)
  })

  it('Should be able to create a notification', async () => {
    const notification = await sut.execute({
      content: 'Conteúdo da notificação',
      title: 'Titulo da notificação',
      recipientId: '1',
    })

    expect(notification.isRight()).toBe(true)
    expect(inMemoryNotificationRepository.items[0]).toEqual(
      notification.value?.notification,
    )
  })
})
