/**
 * Placeholder boundary for reminders and notification permissions.
 * Delivery strategy will be defined once product flows are settled.
 */
export interface NotificationService {
  readonly name: 'notification-service'
  requestPermission(): Promise<NotificationPermission>
}

export function createNotificationService(): NotificationService {
  return {
    name: 'notification-service',
    async requestPermission() {
      throw new Error('Notification service is not implemented yet.')
    },
  }
}
