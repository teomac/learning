'use client'

import { useState } from 'react'

interface TeamSelectionProps {
  currentTeam?: string | null
  onTeamUpdate: (team: string) => void
}

const TEAMS = [
    { value: 'Sales', label: 'Sales' },
    { value: 'Vision/Algo', label: 'Vision/Algo' },
    { value: 'Design', label: 'Design' },
    { value: 'Automation', label: 'Automation'},
    { value: 'Admin', label: 'Admin'},
    { value: 'Execution', label: 'Execution'},
    { value: 'Robotics', label: 'Robotics'},
]

export default function TeamSelection({ currentTeam, onTeamUpdate }: TeamSelectionProps) {
  const [selectedTeam, setSelectedTeam] = useState(currentTeam || '')
  const [isUpdating, setIsUpdating] = useState(false)
  const [message, setMessage] = useState('')

  const handleTeamChange = (team: string) => {
    setSelectedTeam(team)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedTeam) {
      setMessage('Please select a team')
      return
    }

    if (selectedTeam === currentTeam) {
      setMessage('Team is already up to date')
      return
    }

    setIsUpdating(true)
    setMessage('')

    try {
      const response = await fetch('/api/user/team', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ team: selectedTeam }),
      })

      if (response.ok) {
        const data = await response.json()
        onTeamUpdate(data.team)
        setMessage('Team updated successfully!')
        setTimeout(() => setMessage(''), 3000)
      } else {
        const error = await response.json()
        setMessage(error.error || 'Failed to update team')
      }
    } catch (error) {
      setMessage('Network error. Please try again.')
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
          Team Selection
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-3 block">
              Choose your team:
            </label>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {TEAMS.map((team) => (
                <div key={team.value} className="relative">
                  <input
                    type="radio"
                    id={team.value}
                    name="team"
                    value={team.value}
                    checked={selectedTeam === team.value}
                    onChange={() => handleTeamChange(team.value)}
                    className="sr-only"
                  />
                  <label
                    htmlFor={team.value}
                    className={`flex items-center justify-center px-4 py-3 border rounded-lg cursor-pointer transition-all ${
                      selectedTeam === team.value
                        ? 'border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-blue-200'
                        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-medium">{team.label}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={isUpdating || !selectedTeam}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUpdating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </>
              ) : (
                'Update Team'
              )}
            </button>

            {currentTeam && (
              <span className="text-sm text-gray-500">
                Current team: <span className="font-medium capitalize">{currentTeam}</span>
              </span>
            )}
          </div>

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