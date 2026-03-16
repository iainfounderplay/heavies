import { deals } from '@/lib/mock-data';
import { Deal } from '@/lib/types';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(deals);
}

export async function POST(request: Request) {
  const body = await request.json();
  const askingPrice = Number(body.askingPrice || 0);
  const riskScore = askingPrice > 100000 ? 41 : 26;

  const newDeal: Deal = {
    id: `deal-${Date.now()}`,
    assetName: body.assetName,
    category: body.category,
    askingPrice,
    seller: body.seller,
    location: body.location,
    listingUrl: body.listingUrl,
    riskScore,
    stage: 'inspection',
    status: 'active',
    notes: body.notes ? [body.notes] : [],
    missingItems: ['Service history', 'Inspection booking', 'Transport quote'],
    createdAt: new Date().toISOString().slice(0, 10)
  };

  deals.unshift(newDeal);
  return NextResponse.json(newDeal, { status: 201 });
}
