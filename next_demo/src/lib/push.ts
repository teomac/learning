// src/lib/push.ts
import webpush from 'web-push'
import { prisma } from './prisma'

// Set VAPID keys (you'll need to generate these)
const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY!
const VAPID_EMAIL = process.env.VAPID_EMAIL || 'mailto:your-email@example.com'

webpush.setVapidDetails(VAPID_EMAIL, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY)

export interface NotificationPayload {
  title: string
  body: string
  id?: string
}

export async function sendPushNotification(userId: number, payload: NotificationPayload) {
  try {
    // Get all push subscriptions for the user
    const subscriptions = await prisma.pushSubscription.findMany({
      where: { userId }
    })

    if (subscriptions.length === 0) {
      console.log(`No push subscriptions found for user ${userId}`)
      return
    }

    const pushPromises = subscriptions.map(async (subscription) => {
      try {
        const pushSubscription = {
          endpoint: subscription.endpoint,
          keys: {
            p256dh: subscription.p256dh,
            auth: subscription.auth
          }
        }

        await webpush.sendNotification(
          pushSubscription,
          JSON.stringify(payload)
        )
        
        console.log(`Push notification sent to user ${userId}`)
      } catch (error) {
        console.error(`Failed to send push notification to subscription ${subscription.id}:`, error)
        
        // If subscription is invalid, remove it
        if ((error as any)?.statusCode === 410) {
          await prisma.pushSubscription.delete({
            where: { id: subscription.id }
          })
          console.log(`Removed invalid subscription ${subscription.id}`)
        }
      }
    })

    await Promise.all(pushPromises)
  } catch (error) {
    console.error('Error sending push notifications:', error)
  }
}