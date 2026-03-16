import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Layout } from '../lib/layout'
import { supabase } from '../lib/supabaseClient'
import { fullLocation, money } from '../lib/format'

export default function Marketplace() {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      if (!supabase) {
        setError('Add Supabase env values first.')
        setLoading(false)
        return
      }
      const { data, error } = await supabase
        .from('listings')
        .select('id,title,manufacturer,model,year,price,currency,location_city,location_region,country,cover_image_url,slug,condition')
        .eq('status', 'active')
        .order('created_at', { ascending: false })

      if (error) setError(error.message)
      else setListings(data || [])
      setLoading(false)
    }
    load()
  }, [])

  return (
    <Layout>
      <div className="section-head">
        <div>
          <span className="eyebrow">Marketplace</span>
          <h1>Active listings</h1>
        </div>
        <Link className="button primary" href="/sell">Sell equipment</Link>
      </div>
      {loading ? <p>Loading…</p> : null}
      {error ? <p className="error">{error}</p> : null}
      <div className="grid cards-3">
        {listings.map((listing) => (
          <Link key={listing.id} href={`/listings/${listing.slug || listing.id}`} className="card listing-card">
            <div className="image-frame">
              {listing.cover_image_url ? (
                <img src={listing.cover_image_url} alt={listing.title} />
              ) : (
                <div className="placeholder">No image</div>
              )}
            </div>
            <div className="stack-sm">
              <h3>{listing.title}</h3>
              <p className="muted">{[listing.year, listing.manufacturer, listing.model].filter(Boolean).join(' · ')}</p>
              <p>{money(listing.price, listing.currency)}</p>
              <p className="muted">{fullLocation(listing) || 'Location pending'}</p>
            </div>
          </Link>
        ))}
      </div>
      {!loading && listings.length === 0 ? <p>No active listings yet.</p> : null}
    </Layout>
  )
}
