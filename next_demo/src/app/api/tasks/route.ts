import { prisma } from '@/lib/prisma'
import { getUserSession } from '@/lib/session'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const user = await getUserSession()
    
    if (!user || !user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { assigneeId, description } = await request.json()

    // Validate input
    if (!assigneeId || !description) {
      return NextResponse.json({ error: 'Assignee ID and description are required' }, { status: 400 })
    }

    if (typeof assigneeId !== 'number' || typeof description !== 'string') {
      return NextResponse.json({ error: 'Invalid data types' }, { status: 400 })
    }

    if (description.trim().length === 0) {
      return NextResponse.json({ error: 'Description cannot be empty' }, { status: 400 })
    }

    // Verify assignee exists
    const assignee = await prisma.user.findUnique({
      where: { id: assigneeId },
      select: { id: true, name: true, email: true, team: true }
    })

    if (!assignee) {
      return NextResponse.json({ error: 'Assignee not found' }, { status: 404 })
    }

    // Create the task
    const task = await prisma.task.create({
      data: {
        description: description.trim(),
        assigneeId: assigneeId,
        requestedById: parseInt(user.id),
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
      }
    })

    return NextResponse.json({
      success: true,
      task: task
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating task:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const user = await getUserSession()
    
    if (!user || !user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get tasks assigned to or requested by the current user
    const tasks = await prisma.task.findMany({
      where: {
        OR: [
          { assigneeId: parseInt(user.id) },
          { requestedById: parseInt(user.id) }
        ]
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
    console.error('Error fetching tasks:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}