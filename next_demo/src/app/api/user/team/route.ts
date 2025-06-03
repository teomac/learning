import { prisma } from '@/lib/prisma'
import { getUserSession } from '@/lib/session'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(request: NextRequest) {
  try {
    const user = await getUserSession()
    
    if (!user || !user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { team } = await request.json()
    
    const validTeams = ['Sales', 'Vision/Algo', 'Design', 'Automation', 'Admin', 'Execution', 'Robotics']
    if (!validTeams.includes(team)) {
      return NextResponse.json({ error: 'Invalid team selection' }, { status: 400 })
    }

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(user.id) },
      data: { team },
    })

    return NextResponse.json({ 
      success: true, 
      team: updatedUser.team 
    })
  } catch (error) {
    console.error('Error updating team:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}