import { prisma } from '@/lib/prisma'
import { getUserSession } from '@/lib/session'
import { NextRequest, NextResponse } from 'next/server'

// return users from the requested team (excluding current user)
export async function GET(request: NextRequest) {
  try {
    const user = await getUserSession()
    
    if (!user || !user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const team = searchParams.get('team')

    if (!team) {
      return NextResponse.json({ error: 'Team parameter is required' }, { status: 400 })
    }

    const validTeams = ['Sales', 'Vision/Algo', 'Design', 'Automation', 'Admin', 'Execution', 'Robotics']
    if (!validTeams.includes(team)) {
      return NextResponse.json({ error: 'Invalid team' }, { status: 400 })
    }

    const users = await prisma.user.findMany({
      where: {
        team: team,
        //id: { not: parseInt(user.id) } filter to exclude current user
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
      orderBy: [
        { name: 'asc' },
        { email: 'asc' }
      ],
    })

    return NextResponse.json(users)
  } catch (error) {
    console.error('Error fetching users by team:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}