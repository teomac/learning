'use client'

import { User } from 'next-auth'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import TeamSelection from '../dashboard/TeamSelection'

interface ProfileClientProps {
  user: User
}

interface ExtendedUser extends User {
  team?: string | null
}

export default function ProfileClient({ user }: ProfileClientProps) {
  const [currentUser, setCurrentUser] = useState<ExtendedUser>(user)
  const [isLoadingTeam, setIsLoadingTeam] = useState(true)
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

  const handleTeamUpdate = (newTeam: string) => {
    setCurrentUser(prev => ({ ...prev, team: newTeam }))
  }

  const handleBackToDashboard = () => {
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToDashboard}
                className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Back to Dashboard
              </button>
            </div>
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-gray-900">User Profile</h1>
            </div>
            <div className="w-32"></div> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* User Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Name Card */}
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
                      <dt className="text-sm font-medium text-gray-500 truncate">Name</dt>
                      <dd className="text-lg font-medium text-gray-900">{user.name || 'Not set'}</dd>
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
                      <dt className="text-sm font-medium text-gray-500 truncate">Current Team</dt>
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

          {/* Team Selection Component */}
          <div className="mb-8">
            <TeamSelection 
              currentTeam={currentUser.team}
              onTeamUpdate={handleTeamUpdate}
            />
          </div>
        </div>
      </main>
    </div>
  )
}