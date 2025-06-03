// src/hooks/usePushNotifications.ts
'use client'

import { useState, useEffect } from 'react'

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export function usePushNotifications() {
  const [isSupported, setIsSupported] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null)

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true)
      registerServiceWorker()
    }
  }, [])

  const registerServiceWorker = async () => {
    try {
      const swRegistration = await navigator.serviceWorker.register('/sw.js')
      setRegistration(swRegistration)
      
      // Check if already subscribed
      const subscription = await swRegistration.pushManager.getSubscription()
      setIsSubscribed(!!subscription)
    } catch (error) {
      console.error('Service worker registration failed:', error)
    }
  }

  const subscribeUser = async () => {
    if (!registration) return false

    setIsLoading(true)
    try {
      const applicationServerKey = urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey
      })

      // Send subscription to server
      const response = await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscription)
      })

      if (response.ok) {
        setIsSubscribed(true)
        return true
      } else {
        console.error('Failed to save subscription on server')
        return false
      }
    } catch (error) {
      console.error('Failed to subscribe user:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const unsubscribeUser = async () => {
    if (!registration) return false

    setIsLoading(true)
    try {
      const subscription = await registration.pushManager.getSubscription()
      if (subscription) {
        // Unsubscribe from browser
        await subscription.unsubscribe()
        
        // Remove from server
        await fetch('/api/push/subscribe', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ endpoint: subscription.endpoint })
        })
      }
      setIsSubscribed(false)
      return true
    } catch (error) {
      console.error('Failed to unsubscribe user:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isSupported,
    isSubscribed,
    isLoading,
    subscribeUser,
    unsubscribeUser
  }
}