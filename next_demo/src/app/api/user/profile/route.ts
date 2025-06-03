import { prisma } from '@/lib/prisma'
import { getUserSession } from '@/lib/session'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const user = await getUserSession()
    
    if (!user || !user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userData = await prisma.user.findUnique({
      where: { id: parseInt(user.id) },
      select: {
        id: true,
        email: true,
        name: true,
        team: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(userData)
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}