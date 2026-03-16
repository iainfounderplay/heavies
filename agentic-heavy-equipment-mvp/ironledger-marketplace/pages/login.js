import { useState } from 'react'
import { Layout } from '../lib/layout'
import { supabase } from '../lib/supabaseClient'

export default function Login() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  async function signIn(e) {
    e.preventDefault()
    if (!supabase) return setMessage('Add your Supabase env values first.')

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000/dashboard'
      }
    })

    setMessage(error ? error.message : 'Magic link sent. Check your email.')
  }

  return (
    <Layout>
      <div className="card narrow">
        <h1>Login</h1>
        <p>Use Supabase magic links for seller access.</p>
        <form onSubmit={signIn} className="stack">
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" />
          <button className="button primary" type="submit">Send magic link</button>
          {message && <p className="muted">{message}</p>}
        </form>
      </div>
    </Layout>
  )
}
