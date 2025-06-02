import { getUserSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import DashboardClient from './DashboardClient'

export default async function Dashboard() {
  const user = await getUserSession()
  
  if (!user) {
    redirect('/signin')
  }

  return <DashboardClient user={user} />
}