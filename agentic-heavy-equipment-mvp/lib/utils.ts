export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: 0
  }).format(amount);
}

export function riskLabel(score: number): string {
  if (score >= 60) return 'High';
  if (score >= 30) return 'Medium';
  return 'Low';
}

export function badgeTone(kind: string): string {
  const map: Record<string, string> = {
    active: 'badge badge-blue',
    'at-risk': 'badge badge-red',
    closed: 'badge badge-green',
    buy: 'badge badge-green',
    hold: 'badge badge-amber',
    sell: 'badge badge-red',
    high: 'badge badge-red',
    medium: 'badge badge-amber',
    low: 'badge badge-green',
    Low: 'badge badge-green',
    Medium: 'badge badge-amber',
    High: 'badge badge-red'
  };

  return map[kind] ?? 'badge badge-slate';
}
