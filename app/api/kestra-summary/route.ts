import { NextResponse } from 'next/server';
import { kestraState } from '@/lib/kestra-state';
import { ApiResponse, KestraSummaryEntry } from '@/types';

// POST endpoint - Receives summary from Kestra
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        { ok: false, error: 'Empty summary body' } as ApiResponse,
        { status: 400 }
      );
    }

    const entry = await kestraState.addSummary(body);
    
    console.log(`✅ Kestra summary received at ${entry.createdAt}`);
    
    return NextResponse.json({ 
      ok: true, 
      data: entry 
    } as ApiResponse<KestraSummaryEntry>);
  } catch (err) {
    console.error('❌ kestra-summary POST error:', err);
    return NextResponse.json(
      { ok: false, error: String(err) } as ApiResponse,
      { status: 500 }
    );
  }
}

// GET endpoint - Retrieves all summaries
export async function GET() {
  try {
    const entries = kestraState.getAllSummaries();
    
    return NextResponse.json({ 
      ok: true, 
      data: entries,
      count: entries.length
    } as ApiResponse<KestraSummaryEntry[]>);
  } catch (err) {
    console.error('❌ kestra-summary GET error:', err);
    return NextResponse.json(
      { ok: false, error: String(err) } as ApiResponse,
      { status: 500 }
    );
  }
}
