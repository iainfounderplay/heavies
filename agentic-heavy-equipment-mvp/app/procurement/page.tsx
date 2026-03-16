'use client';

import { recommendations } from '@/lib/mock-data';
import { badgeTone } from '@/lib/utils';
import { useState } from 'react';

export default function ProcurementPage() {
  const [context, setContext] = useState('Fleet utilization is 87%. Two excavators are aging out in six months.');
  const [output, setOutput] = useState('');

  async function runCopilot() {
    const response = await fetch('/api/procurement/recommendation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ context })
    });
    const data = await response.json();
    setOutput(data.summary);
  }

  return (
    <div className="page-stack">
      <section className="card">
        <p className="eyebrow">Fleet Copilot</p>
        <h1>Agentic procurement workspace</h1>
        <p className="muted">
          This page turns basic fleet context into a recommendation. Right now it is mocked logic,
          but the contract is ready for real telematics, utilization, and pricing feeds.
        </p>
      </section>

      <section className="grid-two">
        <div className="card form">
          <label>
            Fleet context
            <textarea rows={8} value={context} onChange={(event) => setContext(event.target.value)} />
          </label>
          <button type="button" onClick={runCopilot}>Run copilot</button>
          {output ? <p className="success">{output}</p> : null}
        </div>

        <div className="card">
          <h2>Current recommendations</h2>
          <div className="stack-sm">
            {recommendations.map((rec) => (
              <article key={rec.id} className="subcard">
                <div className="row-between">
                  <strong>{rec.assetClass}</strong>
                  <span className={badgeTone(rec.recommendation)}>{rec.recommendation}</span>
                </div>
                <p className="small">{rec.reason}</p>
                <p className="muted">Urgency: {rec.urgency}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
