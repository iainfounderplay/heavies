import Link from 'next/link'

export function Layout({ children }) {
  return (
    <div className="shell">
      <header className="topbar">
        <div className="brand"><Link href="/">IronLedger</Link></div>
        <nav>
          <Link href="/marketplace">Marketplace</Link>
          <Link href="/sell">Sell</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/login">Login</Link>
        </nav>
      </header>
      <main className="container">{children}</main>
    </div>
  )
}
