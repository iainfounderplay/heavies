import { machines } from '@/lib/mock-data';
import { badgeTone } from '@/lib/utils';

export default function MachinesPage() {
  return (
    <div className="page-stack">
      <section className="card">
        <p className="eyebrow">Machine Graph</p>
        <h1>Machine trust records</h1>
        <p className="muted">
          Each record captures serial identity, inspection history, maintenance events, known issues,
          and a simple trust score.
        </p>
      </section>

      <section className="grid-two">
        {machines.map((machine) => (
          <article key={machine.id} className="card">
            <div className="row-between">
              <div>
                <h2>{machine.assetName}</h2>
                <p className="muted">{machine.serialNumber}</p>
              </div>
              <span className={badgeTone(machine.trustScore >= 80 ? 'Low' : machine.trustScore >= 60 ? 'Medium' : 'High')}>
                Trust {machine.trustScore}
              </span>
            </div>
            <div className="detail-grid">
              <p><strong>Make:</strong> {machine.manufacturer}</p>
              <p><strong>Model:</strong> {machine.model}</p>
              <p><strong>Year:</strong> {machine.year}</p>
              <p><strong>Hours:</strong> {machine.hours}</p>
              <p><strong>Last inspection:</strong> {machine.lastInspection}</p>
              <p><strong>Location:</strong> {machine.location}</p>
            </div>
            <div className="stack-sm">
              <div>
                <h3>Known issues</h3>
                <ul>
                  {machine.knownIssues.length ? machine.knownIssues.map((issue) => <li key={issue}>{issue}</li>) : <li>No known issues logged.</li>}
                </ul>
              </div>
              <div>
                <h3>Maintenance events</h3>
                <ul>
                  {machine.maintenanceEvents.map((event) => <li key={event}>{event}</li>)}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
