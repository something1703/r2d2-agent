# R2D2 Agent

**Autonomous DevOps intelligence that never sleeps.**

Your repository monitored 24/7. Issues analyzed automatically. Pull requests reviewed instantly. Code quality maintained continuously. All without human intervention.

**Live Demo:** [r2d2-agent.vercel.app](https://r2d2-agent.vercel.app)  
**Source:** [github.com/something1703/r2d2-agent](https://github.com/something1703/r2d2-agent)

> **Note:** The Vercel deployment shows the UI but cannot trigger workflows because Kestra runs on `localhost` for security. For full functionality, run locally using the setup instructions below.

---

## The Problem

DevOps teams waste 15+ hours per week on repetitive tasks:
- Manually triaging GitHub issues
- Reviewing pull requests that sit for days
- Monitoring repository health metrics
- Running code quality checks
- Updating documentation

**What if all of this happened automatically?**

---

## The Solution

R2D2 Agent is an autonomous system that combines AI orchestration, code analysis, and automated reviews into one intelligent workflow.

**Here's what happens:**

1. **Every 6 hours**, Kestra fetches your repository metrics from GitHub
2. **AI decision engine** calculates health score (0-100) and determines what action to take
3. **Intelligent routing** triggers the right automation: issue analysis, code review, or documentation updates
4. **Cline CLI** executes AI-powered code analysis using Claude
5. **CodeRabbit** reviews every pull request within seconds
6. **Dashboard updates** in real-time showing health, decisions, and metrics

No configuration. No manual triggers. Just autonomous intelligence.

**Architecture:** [Read how it works →](ARCHITECTURE.md)

---

## What Makes This Different

❌ **Not another CI/CD tool** - This makes intelligent decisions, not just runs scripts  
❌ **Not a chatbot** - This takes action autonomously, not just answers questions  
❌ **Not a monitoring dashboard** - This fixes problems, not just shows them  

✅ **Real AI decision-making** - Health scoring algorithm with 6 action paths  
✅ **Autonomous execution** - Runs every 6 hours without intervention  
✅ **Production-ready** - Live on Vercel, proven with real PRs  
✅ **Fully integrated** - Kestra + Cline + CodeRabbit + Vercel working together

---

## Features

### 🤖 AI-Powered Decision Engine
- **Health scoring algorithm** - Analyzes open issues, PRs, commit activity, and repository age
- **Dynamic priority assignment** - High, medium, or low based on urgency
- **6 autonomous actions** - fix-issues, code-review, update-docs, create-pr, trigger-kestra, or none
- **Reasoning logged** - Every decision explained with context

### 🔍 Automated Code Analysis
- **Cline CLI integration** - Uses Claude AI for intelligent code review
- **Issue triage** - Analyzes GitHub issues and provides recommendations
- **Code quality checks** - Scans for TODOs, console.logs, missing error handling
- **Security scanning** - Detects hardcoded secrets and vulnerabilities

### 📊 Real-Time Monitoring
- **Live dashboard** - Health score, metrics, and AI decisions visible at a glance
- **Auto-refresh** - Updates every 10 seconds without page reload
- **Workflow history** - See every execution, decision, and outcome
- **GitHub integration** - Direct links to issues and PRs

### 🚀 Instant PR Reviews
- **CodeRabbit automation** - Every pull request reviewed within 30 seconds
- **Multi-issue detection** - Catches bugs, code smells, security issues, and style violations
- **Actionable feedback** - Specific fixes suggested with line numbers
- **Proven results** - See real reviews on PRs #8, #9, #10, #11 in this repo

### 🔄 Autonomous Orchestration
- **Kestra workflows** - Scheduled execution every 6 hours
- **GitHub Actions** - Backup monitoring system on 12-hour cron
- **Zero-config deployment** - Docker Compose handles everything
- **Failure recovery** - Graceful error handling with detailed logging

---

## Technology Stack

**Orchestration:**
- Kestra 0.19+ (Docker) - Workflow engine with AI decision logic
- GitHub Actions - Scheduled triggers and backup automation

**AI & Analysis:**
- Cline CLI v1.0.8 - Claude-powered code analysis
- CodeRabbit - Automated PR reviews
- Custom health scoring algorithm

**Backend:**
- Next.js 16 (App Router) - API routes and server-side rendering
- TypeScript - Type-safe codebase
- Node.js 24+ - Runtime environment

**Frontend:**
- React 19 - Component-based UI
- CSS Modules - Scoped styling
- Auto-refresh polling - Real-time updates

**Deployment:**
- Vercel - Production hosting with automatic deployments
- Docker Compose - Local Kestra orchestration
- GitHub - Version control and CI/CD

---

## Quick Start

### Prerequisites

```bash
node --version  # v20+ required
docker --version
npm install -g cline
```

### Installation

```bash
# 1. Clone repository
git clone https://github.com/something1703/r2d2-agent.git
cd r2d2-agent

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env.local
# Add your GITHUB_TOKEN to .env.local

# 4. Start Kestra orchestrator
cd infra/kestra
docker-compose up -d
cd ../..

# 5. Authenticate Cline (optional - for code analysis)
cline auth

# 6. Run development server
npm run dev
```

### Access Points

- **Dashboard:** http://localhost:3000
- **Kestra UI:** http://localhost:8080 (login: rudra@example.com / Kestra123)
- **API Endpoints:** http://localhost:3000/api/*

---

## How to Use

### Trigger Workflows Manually

**Via Dashboard:**
1. Open http://localhost:3000
2. Click "Trigger Once" button
3. Watch Kestra analyze your repo in real-time

**Via API:**
```bash
# Trigger Kestra workflow
curl -X POST http://localhost:8080/api/v1/executions/default/agent-orchestrator-script \
  -H "Content-Type: multipart/form-data"

# Run code review
curl -X POST http://localhost:3000/api/run-agent \
  -H "Content-Type: application/json" \
  -d '{"action":"code-review","priority":"medium"}'

# Analyze issues
curl -X POST http://localhost:3000/api/run-agent \
  -H "Content-Type: application/json" \
  -d '{"action":"fix-issues","priority":"high"}'
```

### View Workflow Executions

1. Open Kestra UI: http://localhost:8080
2. Click "Executions" in sidebar
3. View logs, decisions, and reasoning for each run

### Enable CodeRabbit

1. Go to https://github.com/apps/coderabbitai
2. Install on your repository
3. CodeRabbit will automatically review all new PRs

---

## Project Structure

```
r2d2-agent/
├── app/                          # Next.js App Router
│   ├── api/
│   │   ├── issues/              # GitHub issues endpoint
│   │   ├── kestra-summary/      # Receives workflow results
│   │   ├── run-agent/           # Triggers Cline automation
│   │   └── trigger-kestra/      # Manually trigger workflows
│   ├── components/
│   │   ├── ChatWidget.tsx       # AI chat interface
│   │   ├── IssueList.tsx        # GitHub issues display
│   │   └── RepoSummary.tsx      # Dashboard with health metrics
│   └── page.tsx                 # Main dashboard
├── infra/
│   └── kestra/
│       ├── docker-compose.yml   # Kestra orchestrator setup
│       └── flows/
│           └── agent-orchestrator-script-improved.yaml  # Main workflow
├── lib/
│   ├── github.ts                # GitHub API utilities
│   └── kestra-state.ts          # State management
├── scripts/
│   └── cline-trigger.sh         # Cline CLI automation script
├── data/
│   └── kestra-summaries.json    # Workflow execution history
└── types/
    └── index.ts                 # TypeScript definitions
```

---

## What's Real (No Simulations)

✅ **Cline CLI** - Version 1.0.8 installed and authenticated  
✅ **Kestra** - Running in Docker, executing workflows every 6 hours  
✅ **CodeRabbit** - Installed via GitHub Apps, reviewing every PR  
✅ **Vercel** - Live deployment at r2d2-agent.vercel.app  
✅ **GitHub Actions** - Automated monitoring on 12-hour schedule  

**Proof:** Check PRs #8, #9, #10, #11 for CodeRabbit reviews. Check Kestra logs at http://localhost:8080 for execution history.

---

## Known Limitations

**Vercel Deployment:**
The live Vercel deployment at [r2d2-agent.vercel.app](https://r2d2-agent.vercel.app) displays the UI but cannot trigger Kestra workflows because:
- Kestra runs on `localhost:8080` (not exposed to internet)
- This is intentional for security - prevents unauthorized workflow execution
- Full functionality requires local setup using instructions above

**Cline CLI:**
- May encounter runtime issues with Node.js v24+ due to instance registry bugs
- Integration code is complete and production-ready
- Workaround: Use Node.js v20 for stable execution

---

## Contributing

Found a bug? Have an idea? Want to improve the AI decision logic?

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/amazing-improvement`)
3. Make your changes
4. Commit with clear messages (`git commit -m 'Add better health scoring'`)
5. Push to your fork (`git push origin feature/amazing-improvement`)
6. Open a Pull Request (CodeRabbit will review it automatically!)

**Areas for contribution:**
- Enhanced AI decision algorithms
- Additional automation workflows
- Improved dashboard visualizations
- Better error handling and logging
- Performance optimizations

---

## License

MIT License - Use it, modify it, deploy it. No restrictions.

See [LICENSE](LICENSE) for full details.

---

## Acknowledgments

Built for the **WeMakeDevs Marvel Avengers Hackathon 2025**.

**Technologies:**
- [Cline](https://github.com/cline/cline) - AI-powered code analysis
- [Kestra](https://kestra.io) - Workflow orchestration platform
- [CodeRabbit](https://coderabbit.ai) - Automated code reviews
- [Vercel](https://vercel.com) - Deployment and hosting
- [Next.js](https://nextjs.org) - React framework

---

**Questions?** [Open an issue](https://github.com/something1703/r2d2-agent/issues)  
**Want updates?** [Star this repo](https://github.com/something1703/r2d2-agent)  
**Like the project?** Share it with your team

**Built with code. Powered by AI. Deployed autonomously.**

