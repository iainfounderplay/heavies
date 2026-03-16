import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { Layout } from '../lib/layout'
import { supabase } from '../lib/supabaseClient'

const emptyForm = {
  title: '',
  description: '',
  category: 'Excavator',
  manufacturer: '',
  model: '',
  year: '',
  hours: '',
  price: '',
  currency: 'USD',
  location_city: '',
  location_region: '',
  country: '',
  condition: 'used',
  serial_number: ''
}

export default function Sell() {
  const router = useRouter()
  const [session, setSession] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [files, setFiles] = useState([])
  const [status, setStatus] = useState('')

  useEffect(() => {
    if (!supabase) return
    supabase.auth.getSession().then(({ data }) => setSession(data.session || null))
    const { data: sub } = supabase.auth.onAuthStateChange((_evt, session) => setSession(session || null))
    return () => sub.subscription.unsubscribe()
  }, [])

  const disabled = useMemo(() => !session, [session])

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!supabase) return setStatus('Add Supabase env values first.')
    if (!session) return setStatus('Login first.')

    setStatus('Creating listing…')

    const ownerId = session.user.id
    const payload = {
      ...form,
      owner_id: ownerId,
      year: form.year ? Number(form.year) : null,
      hours: form.hours ? Number(form.hours) : null,
      price: Number(form.price || 0),
      status: 'active'
    }

    const { data: listing, error: listingError } = await supabase
      .from('listings')
      .insert(payload)
      .select('*')
      .single()

    if (listingError) {
      setStatus(listingError.message)
      return
    }

    let firstImage = ''

    for (let index = 0; index < files.length; index += 1) {
      const file = files[index]
      const ext = (file.name.split('.').pop() || 'jpg').toLowerCase()
      const path = `${ownerId}/${listing.id}/${Date.now()}-${index}.${ext}`
      const { error: uploadError } = await supabase.storage.from('listing-images').upload(path, file)
      if (uploadError) {
        setStatus(uploadError.message)
        return
      }

      const { data: publicUrlData } = supabase.storage.from('listing-images').getPublicUrl(path)
      const publicUrl = publicUrlData.publicUrl
      if (!firstImage) firstImage = publicUrl

      const { error: imageError } = await supabase.from('listing_images').insert({
        listing_id: listing.id,
        owner_id: ownerId,
        storage_path: path,
        public_url: publicUrl,
        sort_order: index
      })

      if (imageError) {
        setStatus(imageError.message)
        return
      }
    }

    if (firstImage) {
      await supabase.from('listings').update({ cover_image_url: firstImage }).eq('id', listing.id)
    }

    setStatus('Listing created.')
    router.push(`/listings/${listing.slug || listing.id}`)
  }

  return (
    <Layout>
      <div className="section-head">
        <div>
          <span className="eyebrow">Seller portal</span>
          <h1>Create a listing</h1>
        </div>
      </div>
      {!session ? <p className="card">Login first on the Login page, then come back here.</p> : null}
      <form className="card form-grid" onSubmit={handleSubmit}>
        <label>
          Title
          <input value={form.title} onChange={(e) => update('title', e.target.value)} required disabled={disabled} />
        </label>
        <label>
          Category
          <select value={form.category} onChange={(e) => update('category', e.target.value)} disabled={disabled}>
            <option>Excavator</option>
            <option>Skid Steer</option>
            <option>Wheel Loader</option>
            <option>Dozer</option>
            <option>Telehandler</option>
            <option>Boom Lift</option>
            <option>Concrete Pump</option>
          </select>
        </label>
        <label>
          Manufacturer
          <input value={form.manufacturer} onChange={(e) => update('manufacturer', e.target.value)} disabled={disabled} />
        </label>
        <label>
          Model
          <input value={form.model} onChange={(e) => update('model', e.target.value)} disabled={disabled} />
        </label>
        <label>
          Year
          <input type="number" value={form.year} onChange={(e) => update('year', e.target.value)} disabled={disabled} />
        </label>
        <label>
          Hours
          <input type="number" value={form.hours} onChange={(e) => update('hours', e.target.value)} disabled={disabled} />
        </label>
        <label>
          Price
          <input type="number" value={form.price} onChange={(e) => update('price', e.target.value)} required disabled={disabled} />
        </label>
        <label>
          Currency
          <select value={form.currency} onChange={(e) => update('currency', e.target.value)} disabled={disabled}>
            <option>USD</option>
            <option>GBP</option>
            <option>AUD</option>
            <option>EUR</option>
          </select>
        </label>
        <label>
          City
          <input value={form.location_city} onChange={(e) => update('location_city', e.target.value)} disabled={disabled} />
        </label>
        <label>
          Region / State
          <input value={form.location_region} onChange={(e) => update('location_region', e.target.value)} disabled={disabled} />
        </label>
        <label>
          Country
          <input value={form.country} onChange={(e) => update('country', e.target.value)} disabled={disabled} />
        </label>
        <label>
          Condition
          <select value={form.condition} onChange={(e) => update('condition', e.target.value)} disabled={disabled}>
            <option value="used">Used</option>
            <option value="new">New</option>
            <option value="refurbished">Refurbished</option>
          </select>
        </label>
        <label className="full">
          Serial number
          <input value={form.serial_number} onChange={(e) => update('serial_number', e.target.value)} disabled={disabled} />
        </label>
        <label className="full">
          Description
          <textarea rows="7" value={form.description} onChange={(e) => update('description', e.target.value)} disabled={disabled} />
        </label>
        <label className="full">
          Photos
          <input type="file" multiple accept="image/png,image/jpeg,image/webp" onChange={(e) => setFiles(Array.from(e.target.files || []))} disabled={disabled} />
        </label>
        <div className="full actions-row">
          <button className="button primary" type="submit" disabled={disabled}>Publish listing</button>
          <span className="muted">{status}</span>
        </div>
      </form>
    </Layout>
  )
}
