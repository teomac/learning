'use client'

import { useState, useEffect } from 'react'

interface User {
  id: number
  name: string | null
  email: string
  team?: string | null
}

interface Task {
  id: number
  description: string
  createdAt: string
  assignee: User
  requestedBy: User
}

interface AssignedTasksProps {
  userId: string
  refreshTrigger?: number // trigger for task list auto update
}

export default function AssignedTasks({ userId, refreshTrigger }: AssignedTasksProps) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchAssignedTasks = async () => {
    setIsLoading(true)
    setError('')
    
    try {
      const response = await fetch('/api/tasks/assigned')
      if (response.ok) {
        const data = await response.json()
        setTasks(data)
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Failed to fetch tasks')
      }
    } catch (error) {
      console.error('Error fetching assigned tasks:', error)
      setError('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAssignedTasks()
  }, [userId])

  // Refresh when refreshTrigger changes (when new tasks are created)
  useEffect(() => {
    if (refreshTrigger && refreshTrigger > 0) {
      fetchAssignedTasks()
    }
  }, [refreshTrigger])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleRefresh = () => {
    fetchAssignedTasks()
  }

  if (isLoading) {
    return (
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-center py-8">
            <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="ml-2 text-gray-600">Loading your tasks...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            My Assigned Tasks
          </h3>
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {tasks.length} task{tasks.length !== 1 ? 's' : ''}
            </span>
            <button
              onClick={handleRefresh}
              className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              title="Refresh tasks"
            >
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-md text-sm bg-red-50 text-red-700 border border-red-200">
            {error}
          </div>
        )}

        {tasks.length === 0 ? (
          <div className="text-center py-8">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No tasks assigned</h3>
            <p className="mt-1 text-sm text-gray-500">
              You don't have any tasks assigned to you yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 mb-2">
                      {task.description}
                    </p>
                    <div className="flex items-center text-xs text-gray-500 space-x-4">
                      <div className="flex items-center">
                        <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>
                          Requested by: {task.requestedBy.name || task.requestedBy.email}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{formatDate(task.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Pending
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}