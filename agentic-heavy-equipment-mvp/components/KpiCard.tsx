interface KpiCardProps {
  label: string;
  value: string;
  subtext: string;
}

export function KpiCard({ label, value, subtext }: KpiCardProps) {
  return (
    <section className="card kpi-card">
      <p className="muted">{label}</p>
      <h3>{value}</h3>
      <p className="small">{subtext}</p>
    </section>
  );
}
