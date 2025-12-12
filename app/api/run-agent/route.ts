import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import { ApiResponse } from '@/types';

const execAsync = promisify(exec);

// POST endpoint - Triggers Cline CLI automation
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action = 'default', params = {} } = body;

    console.log(`🤖 Triggering Cline automation: ${action}`);

    // Skip script execution on Vercel (serverless environment)
    if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
      console.log('⚠️  Running in serverless mode - script execution skipped');
      return NextResponse.json({
        ok: true,
        data: {
          message: 'Script execution not available in serverless mode',
          action,
          mode: 'demo',
          note: 'Use GitHub Actions or local environment for full automation'
        },
      } as ApiResponse);
    }

    const scriptPath = path.resolve(process.cwd(), 'scripts', 'cline-trigger.sh');
    
    // Run the Cline trigger script
    const { stdout, stderr } = await execAsync(`bash ${scriptPath}`, {
      env: {
        ...process.env,
        ACTION: action,
        PARAMS: JSON.stringify(params),
      },
      timeout: 30000, // 30 second timeout
    });

    console.log('✅ Cline automation completed');
    
    return NextResponse.json({
      ok: true,
      data: {
        stdout,
        stderr,
        action,
        triggeredAt: new Date().toISOString(),
      },
    } as ApiResponse);
  } catch (err: any) {
    console.error('❌ run-agent error:', err);
    return NextResponse.json(
      {
        ok: false,
        error: err.message || String(err),
        stderr: err.stderr,
      } as ApiResponse,
      { status: 500 }
    );
  }
}
