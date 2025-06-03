import { getUserSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import ProfileClient from './ProfileClient'

export default async function ProfilePage() {
  const user = await getUserSession()
  
  if (!user) {
    redirect('/signin')
  }

  return <ProfileClient user={user} />
}