import { KpiCard } from '@/components/KpiCard';
import { SectionHeader } from '@/components/SectionHeader';
import { deals, machines, recommendations } from '@/lib/mock-data';
import { badgeTone, formatCurrency, riskLabel } from '@/lib/utils';

export default function HomePage() {
  const activeDeals = deals.filter((deal) => deal.status !== 'closed').length;
  const avgTrust = Math.round(
    machines.reduce((sum, machine) => sum + machine.trustScore, 0) / machines.length
  );
  const buySignals = recommendations.filter((rec) => rec.recommendation === 'buy').length;

  return (
    <div className="page-stack">
      <section className="hero card">
        <div>
          <p className="eyebrow">Transaction infrastructure for expensive machines</p>
          <h1>Close equipment deals faster. Build trust data while you do it.</h1>
          <p className="muted max-width">
            This MVP merges three ideas into one workflow: a deal room, a machine trust layer,
            and an agentic procurement copilot.
          </p>
        </div>
      </section>

      <section className="kpi-grid">
        <KpiCard label="Active deals" value={String(activeDeals)} subtext="Inspection to escrow" />
        <KpiCard label="Average trust score" value={`${avgTrust}/100`} subtext="Machine identity layer" />
        <KpiCard label="Buy signals" value={String(buySignals)} subtext="Fleet procurement copilot" />
      </section>

      <section className="grid-two">
        <div className="card">
          <SectionHeader
            title="Deal pipeline"
            description="The first wedge: not a broad marketplace, but a system that gets a real deal closed."
          />
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Asset</th>
                  <th>Stage</th>
                  <th>Risk</th>
                  <th>Status</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {deals.map((deal) => (
                  <tr key={deal.id}>
                    <td>
                      <strong>{deal.assetName}</strong>
                      <div className="small">{deal.location}</div>
                    </td>
                    <td>{deal.stage}</td>
                    <td>
                      <span className={badgeTone(riskLabel(deal.riskScore))}>{riskLabel(deal.riskScore)}</span>
                    </td>
                    <td>
                      <span className={badgeTone(deal.status)}>{deal.status}</span>
                    </td>
                    <td>{formatCurrency(deal.askingPrice)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <SectionHeader
            title="Procurement signals"
            description="The second wedge: tell fleets what to buy, hold, or dispose of next."
          />
          <div className="stack-sm">
            {recommendations.map((rec) => (
              <article key={rec.id} className="subcard">
                <div className="row-between">
                  <h3>{rec.assetClass}</h3>
                  <span className={badgeTone(rec.recommendation)}>{rec.recommendation}</span>
                </div>
                <p className="small">{rec.reason}</p>
                <p className="muted">Target band: {rec.targetBand}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="card">
        <SectionHeader
          title="Why this merged architecture matters"
          description="Every closed deal creates new machine history, better trust data, and better procurement decisions."
        />
        <div className="three-col">
          <article className="subcard">
            <h3>1. DealOS</h3>
            <p className="small">Ingest listing, collect docs, order inspection, quote transport, manage escrow.</p>
          </article>
          <article className="subcard">
            <h3>2. Machine Graph</h3>
            <p className="small">Store inspection packets, maintenance history, known issues, and trust scores.</p>
          </article>
          <article className="subcard">
            <h3>3. Fleet Copilot</h3>
            <p className="small">Turn market activity and fleet signals into buy, hold, and sell recommendations.</p>
          </article>
        </div>
      </section>
    </div>
  );
}
