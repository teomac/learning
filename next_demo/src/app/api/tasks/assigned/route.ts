import { prisma } from '@/lib/prisma'
import { getUserSession } from '@/lib/session'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const user = await getUserSession()
    
    if (!user || !user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get tasks assigned to the current user
    const tasks = await prisma.task.findMany({
      where: {
        assigneeId: parseInt(user.id)
      },
      include: {
        assignee: {
          select: {
            id: true,
            name: true,
            email: true,
            team: true,
          }
        },
        requestedBy: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(tasks)
  } catch (error) {
    console.error('Error fetching assigned tasks:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}