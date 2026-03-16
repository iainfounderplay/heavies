import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const context = String(body.context || '').toLowerCase();

  let summary = 'Recommendation: hold. The fleet context does not show strong buy or sell pressure yet.';

  if (context.includes('aging') || context.includes('utilization') || context.includes('replace')) {
    summary = 'Recommendation: buy. High utilization plus aging units suggests replacement demand is rising.';
  }

  if (context.includes('underutilized') || context.includes('idle') || context.includes('excess')) {
    summary = 'Recommendation: sell. Underutilized equipment is tying up capital that can be recycled.';
  }

  return NextResponse.json({ summary });
}
