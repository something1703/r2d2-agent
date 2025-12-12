import { NextResponse } from 'next/server';
import { ApiResponse } from '@/types';

const KESTRA_BASE = process.env.KESTRA_BASE || 'http://127.0.0.1:8080';
const KES_USER = process.env.KES_USER || 'rudra@example.com';
const KES_PASS = process.env.KES_PASS || 'Kestra123';

// Global lock and rate limiting
let EXECUTION_IN_PROGRESS = false;
let lastTriggerTime = 0;
const RATE_LIMIT_MS = 30000; // 30 seconds

export async function POST() {
  try {
    // IMMEDIATE LOCK CHECK - Reject if already running
    if (EXECUTION_IN_PROGRESS) {
      console.warn('🚫 Execution already in progress, rejecting request');
      return NextResponse.json(
        { 
          ok: false, 
          error: 'Another execution is already in progress. Please wait.' 
        } as ApiResponse,
        { status: 409 } // Conflict
      );
    }

    // Rate limiting check
    const now = Date.now();
    if (now - lastTriggerTime < RATE_LIMIT_MS && lastTriggerTime > 0) {
      const waitTime = Math.ceil((RATE_LIMIT_MS - (now - lastTriggerTime)) / 1000);
      console.warn(`⏱️ Rate limited: ${waitTime}s remaining`);
      return NextResponse.json(
        { 
          ok: false, 
          error: `Rate limit: Please wait ${waitTime} seconds before triggering again` 
        } as ApiResponse,
        { status: 429 }
      );
    }

    // SET LOCK IMMEDIATELY
    EXECUTION_IN_PROGRESS = true;
    console.log('🔒 Execution lock acquired');
    console.log('🔄 Triggering Kestra flow: agent-orchestrator-script');

    const resp = await fetch(
      `${KESTRA_BASE}/api/v1/main/executions/default/agent-orchestrator-script`,
      {
        method: 'POST',
        headers: {
          Authorization: 'Basic ' + Buffer.from(`${KES_USER}:${KES_PASS}`).toString('base64'),
        },
        body: (() => {
          const bd = new FormData();
          bd.append('execution', '{}');
          bd.append('inputs', '{}');
          return bd;
        })(),
      }
    );

    if (!resp.ok) {
      throw new Error(`Kestra API returned ${resp.status}: ${resp.statusText}`);
    }

    const text = await resp.text();
    let body;
    try {
      body = JSON.parse(text);
    } catch (e) {
      body = { raw: text };
    }

    // Update last trigger time AFTER successful trigger
    lastTriggerTime = now;
    console.log('✅ Kestra flow triggered successfully');

    return NextResponse.json({
      ok: true,
      data: body,
      triggeredAt: new Date().toISOString(),
    } as ApiResponse);
  } catch (err: any) {
    console.error('❌ trigger-kestra error:', err);
    return NextResponse.json(
      { ok: false, error: err.message || String(err) } as ApiResponse,
      { status: 500 }
    );
  } finally {
    // ALWAYS release lock after 5 seconds
    setTimeout(() => {
      EXECUTION_IN_PROGRESS = false;
      console.log('🔓 Execution lock released');
    }, 5000);
  }
}
