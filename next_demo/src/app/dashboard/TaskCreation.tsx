'use client'

import { useState, useEffect } from 'react'

interface User {
  id: number
  name: string | null
  email: string
}

interface TaskCreationProps {
  onTaskCreated?: () => void
}

const TEAMS = [
  { value: 'Sales', label: 'Sales' },
  { value: 'Vision/Algo', label: 'Vision/Algo' },
  { value: 'Design', label: 'Design' },
  { value: 'Automation', label: 'Automation' },
  { value: 'Admin', label: 'Admin' },
  { value: 'Execution', label: 'Execution' },
  { value: 'Robotics', label: 'Robotics' },
]

export default function TaskCreation({ onTaskCreated }: TaskCreationProps) {
  const [selectedTeam, setSelectedTeam] = useState('')
  const [selectedUserId, setSelectedUserId] = useState('')
  const [description, setDescription] = useState('')
  const [teamUsers, setTeamUsers] = useState<User[]>([])
  const [isLoadingUsers, setIsLoadingUsers] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [message, setMessage] = useState('')

  // Fetch users when team is selected
  useEffect(() => {
    if (selectedTeam) {
      fetchTeamUsers(selectedTeam)
    } else {
      setTeamUsers([])
      setSelectedUserId('')
    }
  }, [selectedTeam])

  const fetchTeamUsers = async (team: string) => {
    setIsLoadingUsers(true)
    try {
      const response = await fetch(`/api/user/by-team?team=${encodeURIComponent(team)}`)
      if (response.ok) {
        const users = await response.json()
        setTeamUsers(users)
      } else {
        console.error('Failed to fetch team users')
        setTeamUsers([])
      }
    } catch (error) {
      console.error('Error fetching team users:', error)
      setTeamUsers([])
    } finally {
      setIsLoadingUsers(false)
    }
  }

  const handleTeamChange = (team: string) => {
    setSelectedTeam(team)
    setSelectedUserId('')
    setMessage('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedTeam) {
      setMessage('Please select a team')
      return
    }
    
    if (!selectedUserId) {
      setMessage('Please select a user')
      return
    }
    
    if (!description.trim()) {
      setMessage('Please enter a task description')
      return
    }

    setIsCreating(true)
    setMessage('')

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assigneeId: parseInt(selectedUserId),
          description: description.trim(),
        }),
      })

      if (response.ok) {
        setMessage('Task created successfully!')
        // Reset form
        setSelectedTeam('')
        setSelectedUserId('')
        setDescription('')
        setTeamUsers([])
        
        // Call callback if provided
        onTaskCreated?.()
        
        // Clear success message after 3 seconds
        setTimeout(() => setMessage(''), 3000)
      } else {
        const error = await response.json()
        setMessage(error.error || 'Failed to create task')
      }
    } catch (error) {
      setMessage('Network error. Please try again.')
    } finally {
      setIsCreating(false)
    }
  }

  const handleReset = () => {
    setSelectedTeam('')
    setSelectedUserId('')
    setDescription('')
    setTeamUsers([])
    setMessage('')
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
          Create New Task
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Team Selection */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-3 block">
              Select Team:
            </label>
            <select
              value={selectedTeam}
              onChange={(e) => handleTeamChange(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="">Choose a team...</option>
              {TEAMS.map((team) => (
                <option key={team.value} value={team.value}>
                  {team.label}
                </option>
              ))}
            </select>
          </div>

          {/* User Selection */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-3 block">
              Assign to:
            </label>
            <select
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              disabled={!selectedTeam || isLoadingUsers}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <option value="">
                {!selectedTeam 
                  ? 'Select a team first...' 
                  : isLoadingUsers 
                    ? 'Loading users...' 
                    : teamUsers.length === 0
                      ? 'No users found in this team'
                      : 'Choose a user...'
                }
              </option>
              {teamUsers.map((user) => (
                <option key={user.id} value={user.id.toString()}>
                  {user.name || user.email}
                </option>
              ))}
            </select>
          </div>

          {/* Task Description */}
          <div>
            <label htmlFor="description" className="text-sm font-medium text-gray-700 mb-3 block">
              Task Description:
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Enter task description..."
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={isCreating || !selectedTeam || !selectedUserId || !description.trim()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCreating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating...
                  </>
                ) : (
                  'Create Task'
                )}
              </button>

              <button
                type="button"
                onClick={handleReset}
                disabled={isCreating}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Reset
              </button>
            </div>

            {selectedTeam && teamUsers.length > 0 && (
              <span className="text-sm text-gray-500">
                {teamUsers.length} user{teamUsers.length !== 1 ? 's' : ''} in {selectedTeam}
              </span>
            )}
          </div>

          {/* Message Display */}
          {message && (
            <div className={`p-3 rounded-md text-sm ${
              message.includes('success') 
                ? 'bg-green-50 text-green-700 border border-green-200' 
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}