'use client'

import { signIn, getSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SignIn() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    getSession().then(session => session && router.push('/dashboard'))
  }, [router])

  const handleSignIn = async () => {
    setLoading(true)
    const result = await signIn('google', { callbackUrl: '/dashboard', redirect: false })
    if (result?.url) router.push(result.url)
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-2xl font-bold">Sign In</h1>
        <button
          onClick={handleSignIn}
          disabled={loading}
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Sign in with Google'}
        </button>
      </div>
    </div>
  )
}