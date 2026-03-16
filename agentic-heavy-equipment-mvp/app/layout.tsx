import './globals.css';
import { Nav } from '@/components/Nav';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Agentic Heavy Equipment MVP',
  description: 'DealOS + Machine trust + procurement copilot MVP'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="shell">
          <Nav />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
