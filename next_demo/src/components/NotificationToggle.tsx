// src/components/NotificationToggle.tsx
'use client'

import { usePushNotifications } from '@/hooks/usePushNotifications'

export default function NotificationToggle() {
  const { isSupported, isSubscribed, isLoading, subscribeUser, unsubscribeUser } = usePushNotifications()

  if (!isSupported) {
    return (
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636" />
        </svg>
        <span>Notifications not supported</span>
      </div>
    )
  }

  const handleToggle = async () => {
    if (isSubscribed) {
      await unsubscribeUser()
    } else {
      await subscribeUser()
    }
  }

  return (
    <div className="flex items-center space-x-3">
      <div className="flex items-center space-x-2">
        <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5zM9 7H4l5-5v5zM9 17H4l5 5v-5zM15 7h5L15 2v5z" />
        </svg>
        <span className="text-sm font-medium text-gray-700">Push Notifications</span>
      </div>
      
      <button
        onClick={handleToggle}
        disabled={isLoading}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
          isSubscribed ? 'bg-blue-600' : 'bg-gray-200'
        }`}
      >
        <span className="sr-only">Toggle notifications</span>
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            isSubscribed ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
      
      {isLoading && (
        <svg className="animate-spin h-4 w-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
    </div>
  )
}