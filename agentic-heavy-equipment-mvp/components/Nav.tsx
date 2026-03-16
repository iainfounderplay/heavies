import Link from 'next/link';

const links = [
  { href: '/', label: 'Dashboard' },
  { href: '/deals/new', label: 'New Deal' },
  { href: '/machines', label: 'Machine Trust' },
  { href: '/procurement', label: 'Procurement' }
];

export function Nav() {
  return (
    <nav className="nav">
      <div>
        <div className="eyebrow">Merged idea</div>
        <Link href="/" className="brand">
          DealOS + MachineGraph + Fleet Copilot
        </Link>
      </div>
      <div className="nav-links">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="nav-link">
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
