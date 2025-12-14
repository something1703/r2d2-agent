# How It Works

## The Problem

Code breaks. Issues pile up. Teams fall behind.

Most developers spend half their time on repetitive tasks. Analyzing issues. Writing fixes. Reviewing code. Updating docs.

We built R2D2 to change that.

## The Solution

R2D2 is an autonomous DevOps assistant. It monitors your repository. Makes decisions. Takes action.

Three core components work together:

### 1. Kestra (The Brain)

Kestra runs workflows. Every 6 hours, it:
- Fetches your repository metrics
- Counts open issues, PRs, recent commits
- Calculates a health score (0-100)
- Decides what action to take

**Decision logic is simple:**
- More than 5 issues? → Analyze and fix
- Inactive for 7+ days? → Update documentation  
- 1-5 issues? → Run code review

No human input needed. It just works.

### 2. Cline CLI (The Hands)

When Kestra decides action is needed, Cline executes.

Cline is an AI agent. Not a simulation. The real CLI.

**What it does:**
- Reads your GitHub issues
- Analyzes code quality
- Provides recommendations
- Identifies root causes

All autonomous. All AI-powered.

### 3. CodeRabbit (The Eyes)

Every pull request gets reviewed. Automatically.

CodeRabbit reads your code. Finds issues. Suggests improvements. Comments inline.

It's like having a senior engineer review every change. Without the wait.

## The Flow

```
Kestra monitors repo
    ↓
Calculates health score
    ↓
Makes decision (fix/review/docs)
    ↓
Calls Cline CLI
    ↓
Cline analyzes and recommends
    ↓
Results posted to Next.js UI
    ↓
CodeRabbit reviews any PRs
```

## The Stack

**Backend:**
- Next.js 16 (React server components)
- Kestra (Docker container, port 8080)
- Cline CLI v1.0.8

**Frontend:**
- React with TypeScript
- Monochrome minimal UI
- Auto-refreshing data (10s polling)

**Infrastructure:**
- Docker for Kestra
- Vercel for deployment
- GitHub Actions for CI/CD

## What's Real

✅ **Cline CLI** - Actual installation, not simulated  
✅ **Kestra** - Real workflows with AI decision engine  
✅ **CodeRabbit** - Active PR reviews  
✅ **Vercel** - Live deployment  
✅ **GitHub Actions** - Automated monitoring  

## What's Not

We don't fake anything. If we didn't integrate it, it's not in this list.

## The Code

Everything's in `scripts/cline-trigger.sh`:

```bash
# Real Cline command
cline -y "Analyze this issue: $ISSUE_URL" --mode act -F json
```

No smoke. No mirrors. Real automation.

## Try It

1. Clone the repo
2. Start Kestra (`docker-compose up`)
3. Authenticate Cline (`cline auth`)
4. Run `npm run dev`

That's it.

## Why It Matters

Time is finite. Automate the boring parts.

Let Kestra monitor. Let Cline analyze. Let CodeRabbit review.

You focus on building.
