import { getUserSession } from '@/lib/session'
import { redirect } from 'next/navigation'

export default async function Home() {
  const user = await getUserSession()
  
  // If user is authenticated, redirect to dashboard
  if (user) {
    redirect('/dashboard')
  }
  
  // If not authenticated, redirect to sign in
  redirect('/signin')
}