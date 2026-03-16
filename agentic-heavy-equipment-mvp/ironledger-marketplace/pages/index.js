import Link from 'next/link'
import { Layout } from '../lib/layout'

export default function Home() {
  return (
    <Layout>
      <section className="hero">
        <div>
          <span className="eyebrow">Heavy equipment marketplace</span>
          <h1>Buy, sell, and share machines online.</h1>
          <p>
            IronLedger is the seller-side and buyer-side MVP for used heavy equipment.
            Post listings, upload photos, capture leads, and share each machine to Facebook.
          </p>
          <div className="actions">
            <Link className="button primary" href="/sell">Create listing</Link>
            <Link className="button" href="/marketplace">Browse machines</Link>
          </div>
        </div>
        <div className="card stat-grid">
          <div><strong>Photos</strong><span>Supabase Storage uploads</span></div>
          <div><strong>Leads</strong><span>Buyer inquiries per listing</span></div>
          <div><strong>Share</strong><span>Facebook share links built in</span></div>
          <div><strong>RLS</strong><span>Supabase row-level security</span></div>
        </div>
      </section>
      <section className="plan card">
        <h2>Build order</h2>
        <ol>
          <li>Schema + auth + storage</li>
          <li>Seller listing flow + images</li>
          <li>Public marketplace + detail pages</li>
          <li>Lead capture + dashboard</li>
          <li>Later: inspections, transport, escrow, finance</li>
        </ol>
      </section>
    </Layout>
  )
}
