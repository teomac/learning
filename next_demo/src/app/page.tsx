import { getUserSession } from "@/lib/session"
import { redirect } from 'next/navigation'

export default async function Home() {
  const user = await getUserSession()
  
  if (user) {
    redirect('/dashboard')
  }
  
  redirect('/signin')
}