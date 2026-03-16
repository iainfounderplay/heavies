import { useMemo, useState } from 'react'
import { Layout } from '../../lib/layout'
import { supabase } from '../../lib/supabaseClient'
import { fullLocation, money } from '../../lib/format'

export async function getServerSideProps(ctx) {
  const slug = ctx.params.slug
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    return { props: { listing: null, images: [], envMissing: true } }
  }

  const { createClient } = await import('@supabase/supabase-js')
  const client = createClient(supabaseUrl, supabaseKey)

  const { data: listing } = await client
    .from('listings')
    .select('*')
    .or(`slug.eq.${slug},id.eq.${slug}`)
    .eq('status', 'active')
    .maybeSingle()

  if (!listing) {
    return { notFound: true }
  }

  const { data: images } = await client
    .from('listing_images')
    .select('*')
    .eq('listing_id', listing.id)
    .order('sort_order', { ascending: true })

  return { props: { listing, images: images || [], envMissing: false } }
}

export default function ListingPage({ listing, images, envMissing }) {
  const [lead, setLead] = useState({ buyer_name: '', buyer_email: '', buyer_phone: '', message: '' })
  const [status, setStatus] = useState('')

  const shareUrl = useMemo(() => {
    if (typeof window === 'undefined') return ''
    return `${window.location.origin}/listings/${listing.slug || listing.id}`
  }, [listing])

  async function submitLead(e) {
    e.preventDefault()
    if (!supabase) return setStatus('Add Supabase env values first.')
    const { error } = await supabase.from('leads').insert({
      listing_id: listing.id,
      ...lead
    })
    setStatus(error ? error.message : 'Inquiry sent.')
    if (!error) setLead({ buyer_name: '', buyer_email: '', buyer_phone: '', message: '' })
  }

  function shareToFacebook() {
    if (!shareUrl) return
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    window.open(url, '_blank', 'noopener,noreferrer,width=640,height=720')
  }

  if (envMissing) {
    return (
      <Layout>
        <p className="card">Add your Supabase env values first.</p>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="listing-detail">
        <section className="gallery card">
          <div className="hero-image">
            {images[0]?.public_url || listing.cover_image_url ? (
              <img src={images[0]?.public_url || listing.cover_image_url} alt={listing.title} />
            ) : (
              <div className="placeholder large">No image</div>
            )}
          </div>
          <div className="thumbs">
            {images.map((image) => (
              <img key={image.id} src={image.public_url} alt={listing.title} />
            ))}
          </div>
        </section>
        <section className="stack">
          <div className="card stack-sm">
            <span className="eyebrow">{listing.category}</span>
            <h1>{listing.title}</h1>
            <p className="price">{money(listing.price, listing.currency)}</p>
            <p className="muted">{[listing.year, listing.manufacturer, listing.model].filter(Boolean).join(' · ')}</p>
            <p className="muted">{fullLocation(listing) || 'Location pending'}</p>
            <p>{listing.description}</p>
            <div className="actions-row">
              <button className="button primary" onClick={shareToFacebook}>Share to Facebook</button>
              {shareUrl ? <button className="button" onClick={() => navigator.clipboard.writeText(shareUrl)}>Copy link</button> : null}
            </div>
          </div>
          <div className="card">
            <h2>Send inquiry</h2>
            <form className="stack" onSubmit={submitLead}>
              <input placeholder="Your name" value={lead.buyer_name} onChange={(e) => setLead({ ...lead, buyer_name: e.target.value })} required />
              <input placeholder="Email" value={lead.buyer_email} onChange={(e) => setLead({ ...lead, buyer_email: e.target.value })} required />
              <input placeholder="Phone" value={lead.buyer_phone} onChange={(e) => setLead({ ...lead, buyer_phone: e.target.value })} />
              <textarea rows="5" placeholder="Message" value={lead.message} onChange={(e) => setLead({ ...lead, message: e.target.value })} />
              <button className="button primary" type="submit">Send</button>
              {status ? <p className="muted">{status}</p> : null}
            </form>
          </div>
        </section>
      </div>
    </Layout>
  )
}
