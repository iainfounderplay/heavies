import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Layout } from '../lib/layout'
import { supabase } from '../lib/supabaseClient'
import { money } from '../lib/format'

export default function Dashboard() {
  const [session, setSession] = useState(null)
  const [listings, setListings] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    async function init() {
      if (!supabase) return
      const { data } = await supabase.auth.getSession()
      const session = data.session || null
      setSession(session)
      if (!session) return
      const { data: listings, error } = await supabase
        .from('listings')
        .select('id,title,price,currency,status,slug,created_at')
        .eq('owner_id', session.user.id)
        .order('created_at', { ascending: false })
      if (error) setError(error.message)
      else setListings(listings || [])
    }
    init()
  }, [])

  async function signOut() {
    if (!supabase) return
    await supabase.auth.signOut()
    window.location.reload()
  }

  return (
    <Layout>
      <div className="section-head">
        <div>
          <span className="eyebrow">Seller dashboard</span>
          <h1>Your listings</h1>
        </div>
        {session ? <button className="button" onClick={signOut}>Sign out</button> : null}
      </div>
      {!session ? (
        <div className="card">
          <p>You are not logged in.</p>
          <Link className="button primary" href="/login">Go to login</Link>
        </div>
      ) : null}
      {error ? <p className="error">{error}</p> : null}
      <div className="grid cards-2">
        {listings.map((listing) => (
          <div key={listing.id} className="card stack-sm">
            <h3>{listing.title}</h3>
            <p>{money(listing.price, listing.currency)}</p>
            <p className="muted">Status: {listing.status}</p>
            <div className="actions-row">
              <Link className="button" href={`/listings/${listing.slug || listing.id}`}>View</Link>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}
