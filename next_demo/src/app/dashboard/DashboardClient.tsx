'use client'

import { signOut } from 'next-auth/react'
import { User } from 'next-auth'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import TaskCreation from './TaskCreation'
import AssignedTasks from './AssignedTasks'
import NotificationToggle from '@/components/NotificationToggle'


interface DashboardClientProps {
  user: User
}

interface ExtendedUser extends User {
  team?: string | null
}

export default function DashboardClient({ user }: DashboardClientProps) {
  const [isSigningOut, setIsSigningOut] = useState(false)
  const [currentUser, setCurrentUser] = useState<ExtendedUser>(user)
  const [isLoadingTeam, setIsLoadingTeam] = useState(true)
  const [taskRefreshTrigger, setTaskRefreshTrigger] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const fetchUserTeam = async () => {
      try {
        const response = await fetch('/api/user/profile')
        if (response.ok) {
          const userData = await response.json()
          setCurrentUser(prev => ({ ...prev, team: userData.team }))
        }
      } catch (error) {
        console.error('Error fetching user team:', error)
      } finally {
        setIsLoadingTeam(false)
      }
    }

    fetchUserTeam()
  }, [])

  const handleSignOut = async () => {
    setIsSigningOut(true)
    await signOut({ callbackUrl: '/signin' })
  }

  const handleTaskCreated = () => {
    // TODO: add here logic for push notifications
    setTaskRefreshTrigger(prev => prev + 1)
    console.log('Task created successfully!')
  }

  const handleProfileClick = () => {
    router.push('/profile')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-6">
              {/* Notification Toggle */}
              <NotificationToggle />
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleProfileClick}
                  className="flex items-center space-x-3 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <span className="hover:text-blue-600 transition-colors duration-200">{user.name || user.email}</span>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
                {currentUser.team && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                    {currentUser.team}
                  </span>
                )}
              </div>
              <button
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSigningOut ? 'Signing out...' : 'Sign out'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Welcome Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Welcome back</dt>
                      <dd className="text-lg font-medium text-gray-900">{user.name || 'User'}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Email</dt>
                      <dd className="text-lg font-medium text-gray-900">{user.email}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Team</dt>
                      <dd className="text-lg font-medium text-gray-900 capitalize">
                        {isLoadingTeam ? (
                          <span className="text-gray-400">Loading...</span>
                        ) : (
                          currentUser.team || 'Not assigned'
                        )}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Task Creation Form */}
          <div className="mb-8">
            <TaskCreation onTaskCreated={handleTaskCreated} />
          </div>

          {/* Assigned Tasks */}
          <div className="mb-8">
            <AssignedTasks 
              userId={user.id || ''}
              refreshTrigger={taskRefreshTrigger}
            />
          </div>
        </div>
      </main>
    </div>
  )
}