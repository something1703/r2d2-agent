import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import { ApiResponse } from '@/types';

const execAsync = promisify(exec);

// POST endpoint - Triggers Oumi RL fine-tuning
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { codeSnippets = [], feedback = [] } = body;

    console.log('🧠 Starting Oumi RL training...');

    // Skip script execution on Vercel (serverless environment)
    if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
      console.log('⚠️  Running in serverless mode - training simulation');
      return NextResponse.json({
        ok: true,
        data: {
          message: 'Oumi training simulated in serverless mode',
          samples: codeSnippets.length,
          mode: 'demo',
          note: 'Use local environment for actual RL training'
        },
      } as ApiResponse);
    }

    const scriptPath = path.resolve(process.cwd(), 'scripts', 'oumi-rl-trainer.py');
    
    // Run the Oumi training script
    const { stdout, stderr } = await execAsync(`python3 ${scriptPath}`, {
      env: {
        ...process.env,
        TRAINING_DATA: JSON.stringify({ codeSnippets, feedback }),
      },
      timeout: 120000, // 2 minute timeout for training
    });

    console.log('✅ Oumi training completed');
    
    return NextResponse.json({
      ok: true,
      data: {
        stdout,
        stderr,
        trainedAt: new Date().toISOString(),
      },
    } as ApiResponse);
  } catch (err: any) {
    console.error('❌ oumi-train error:', err);
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

// GET endpoint - Check training status
export async function GET() {
  try {
    return NextResponse.json({
      ok: true,
      data: {
        status: 'ready',
        message: 'Oumi RL trainer is ready. POST to this endpoint with training data.',
      },
    } as ApiResponse);
  } catch (err) {
    console.error('❌ oumi-train GET error:', err);
    return NextResponse.json(
      { ok: false, error: String(err) } as ApiResponse,
      { status: 500 }
    );
  }
}
