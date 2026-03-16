'use client';

import { useState } from 'react';

const initialState = {
  assetName: '',
  category: 'Excavator',
  askingPrice: '',
  seller: '',
  location: '',
  listingUrl: '',
  notes: ''
};

export default function NewDealPage() {
  const [form, setForm] = useState(initialState);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    const response = await fetch('/api/deals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    const data = await response.json();
    setLoading(false);
    setMessage(`Created ${data.assetName} with risk score ${data.riskScore} and next stage ${data.stage}.`);
    setForm(initialState);
  }

  return (
    <div className="page-stack narrow">
      <section className="card">
        <p className="eyebrow">DealOS</p>
        <h1>Open a new equipment deal</h1>
        <p className="muted">
          Paste a listing or seller packet and the system creates a first-pass deal brief,
          risk score, and missing document checklist.
        </p>
      </section>

      <form className="card form" onSubmit={handleSubmit}>
        <label>
          Asset name
          <input
            value={form.assetName}
            onChange={(event) => setForm({ ...form, assetName: event.target.value })}
            placeholder="CAT 320 Excavator"
            required
          />
        </label>

        <div className="form-grid">
          <label>
            Category
            <select
              value={form.category}
              onChange={(event) => setForm({ ...form, category: event.target.value })}
            >
              <option>Excavator</option>
              <option>Skid Steer</option>
              <option>Boom Lift</option>
              <option>Telehandler</option>
            </select>
          </label>

          <label>
            Asking price (AUD)
            <input
              type="number"
              min="0"
              value={form.askingPrice}
              onChange={(event) => setForm({ ...form, askingPrice: event.target.value })}
              placeholder="148000"
              required
            />
          </label>
        </div>

        <label>
          Seller
          <input
            value={form.seller}
            onChange={(event) => setForm({ ...form, seller: event.target.value })}
            placeholder="North Ridge Equipment"
            required
          />
        </label>

        <label>
          Location
          <input
            value={form.location}
            onChange={(event) => setForm({ ...form, location: event.target.value })}
            placeholder="Brisbane, AU"
            required
          />
        </label>

        <label>
          Listing URL
          <input
            type="url"
            value={form.listingUrl}
            onChange={(event) => setForm({ ...form, listingUrl: event.target.value })}
            placeholder="https://example.com/listing"
          />
        </label>

        <label>
          Notes
          <textarea
            rows={5}
            value={form.notes}
            onChange={(event) => setForm({ ...form, notes: event.target.value })}
            placeholder="Seller claims full service history. Needs quick financing path."
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Creating…' : 'Create deal brief'}
        </button>

        {message ? <p className="success">{message}</p> : null}
      </form>
    </div>
  );
}
