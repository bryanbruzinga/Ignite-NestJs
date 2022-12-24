import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotification } from './count-recipient-notifications';

describe('Count Recipient Notification', () => {
  it('should be able to count recipient notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const countRecipientNotification = new CountRecipientNotification(
      notificationRepository,
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'example-recipient-id' }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'example-recipient-id' }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'example-recipient-id2' }),
    );

    const { count } = await countRecipientNotification.execute({
      recipientId: 'example-recipient-id',
    });

    expect(count).toEqual(2);
  });
});
