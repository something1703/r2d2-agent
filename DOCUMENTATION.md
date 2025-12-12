# R2D2 Agent 🤖

> Autonomous DevOps Assistant powered by Kestra AI, Cline, GitHub, and Next.js

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?logo=next.js)](https://nextjs.org/)
[![Kestra](https://img.shields.io/badge/Kestra-AI%20Orchestrator-blue)](https://kestra.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)

## 🎯 Project Overview

R2D2-Agent is an autonomous DevOps assistant that integrates multiple AI-powered tools to monitor, analyze, and act on GitHub repositories automatically.

**Built for**: DevOps AI Hackathon (Kestra + Cline + Oumi + Vercel + CodeRabbit)

### Architecture Flow

```
GitHub API → Kestra AI → Next.js API → React UI
                ↓
          Cline CLI Agent
```

1. **Kestra** fetches GitHub activity (issues, PRs, commits)
2. **Kestra AI Agent** summarizes and analyzes the data
3. **Next.js API** receives and stores summaries
4. **React Dashboard** displays insights in real-time
5. **Cline CLI** performs automated actions (PR creation, fixes, etc.)

## ✨ Features

- 📊 **Real-time GitHub Activity Monitoring**
- 🤖 **AI-Powered Repository Summaries** via Kestra
- 📋 **Issue Tracking & Management**
- ⚡ **Automated Actions** via Cline CLI
- 🎨 **Beautiful Modern Dashboard**
- 🔄 **Auto-refresh** (every 10 seconds)
- 📈 **Historical Data** (last 50 summaries)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- Docker & Docker Compose
- GitHub Personal Access Token
- Kestra running locally

### 1. Clone & Install

```bash
git clone https://github.com/something1703/r2d2-agent.git
cd r2d2-agent
npm install
```

### 2. Environment Setup

Create `.env.local`:

```env
GITHUB_TOKEN=your_github_token_here
KESTRA_BASE=http://127.0.0.1:8080
KES_USER=rudra@example.com
KES_PASS=Kestra123
```

### 3. Start Kestra (Docker)

```bash
cd infra/kestra
docker-compose up -d
```

Visit `http://localhost:8080` to access Kestra UI.

### 4. Deploy Kestra Flow

The main orchestrator flow is located at `infra/kestra/flows/agent-orchestrator.yml`.

Upload it to Kestra via:
- Kestra UI: Flows → Create → Copy/paste YAML
- Or via API

### 5. Start Next.js Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the dashboard.

## 📁 Project Structure

```
r2d2-agent/
├── app/
│   ├── api/
│   │   ├── issues/route.ts          # Fetch GitHub issues
│   │   ├── kestra-summary/route.ts  # Receive Kestra summaries
│   │   ├── run-agent/route.ts       # Trigger Cline automation
│   │   └── trigger-kestra/route.ts  # Manually trigger Kestra
│   ├── components/
│   │   ├── RepoSummary.tsx          # Summary cards display
│   │   ├── IssueList.tsx            # GitHub issues grid
│   │   └── *.module.css             # Component styles
│   ├── page.tsx                     # Main dashboard
│   └── layout.tsx                   # App layout
├── lib/
│   ├── github.ts                    # GitHub API client
│   └── kestra-state.ts              # State management
├── scripts/
│   └── cline-trigger.sh             # Cline automation script
├── types/
│   └── index.ts                     # TypeScript definitions
├── infra/
│   └── kestra/
│       ├── docker-compose.yml       # Kestra Docker setup
│       └── flows/
│           └── agent-orchestrator.yml  # Main flow
└── data/
    └── kestra-summaries.json        # Stored summaries
```

## 🔧 API Endpoints

### `POST /api/kestra-summary`
Receives AI summaries from Kestra.

**Request Body**:
```json
{
  "repositoryName": "something1703/r2d2-agent",
  "totalIssues": 5,
  "openIssues": 3,
  "closedIssues": 2,
  "aiSummary": "Repository has moderate activity...",
  "recommendations": ["Fix issue #123", "Update docs"]
}
```

### `GET /api/kestra-summary`
Retrieves all stored summaries.

**Response**:
```json
{
  "ok": true,
  "data": [...],
  "count": 10
}
```

### `POST /api/trigger-kestra`
Manually triggers the Kestra orchestrator flow.

### `POST /api/run-agent`
Triggers Cline CLI automation.

**Request Body**:
```json
{
  "action": "create-pr" | "fix-issues" | "update-docs" | "code-review",
  "params": {}
}
```

### `GET /api/issues`
Fetches GitHub issues for the repository.

## 🤖 Kestra Integration

### Flow Structure

The `agent-orchestrator` flow:
1. Fetches issues from GitHub API
2. Summarizes using Kestra AI Agent
3. Posts summary to Next.js `/api/kestra-summary`
4. Optionally triggers `/api/run-agent` based on conditions

### Manual Trigger via API

```bash
curl -u "rudra@example.com:Kestra123" \
  -X POST "http://127.0.0.1:8080/api/v1/main/executions/default/agent-orchestrator-script" \
  -F "execution={}" -F "inputs={}"
```

## 🛠️ Cline Automation

The Cline automation script (`scripts/cline-trigger.sh`) supports multiple actions:

- `trigger-kestra` - Trigger Kestra flow
- `create-pr` - Create automated PR (TODO)
- `fix-issues` - Auto-fix GitHub issues (TODO)
- `update-docs` - Update documentation (TODO)
- `code-review` - Automated code review (TODO)

## 🚢 Deployment

### Vercel Deployment

1. Push to GitHub:
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. Deploy to Vercel:
```bash
npm i -g vercel
vercel
```

3. Set environment variables in Vercel Dashboard:
   - `GITHUB_TOKEN`
   - `KESTRA_BASE` (your public Kestra URL)
   - `KES_USER`
   - `KES_PASS`

### Docker Deployment

```bash
docker build -t r2d2-agent .
docker run -p 3000:3000 --env-file .env.local r2d2-agent
```

## 🎨 UI Features

- **Modern Dashboard** with gradient headers
- **Auto-refreshing** summaries (10s interval)
- **GitHub Issues Grid** with state badges
- **Loading States** with spinners
- **Error Handling** with user-friendly messages
- **Responsive Design** for mobile/desktop

## 🔐 Security Notes

⚠️ **Important**:
- Never commit `.env.local` to version control
- Use environment variables for all secrets
- Rotate GitHub tokens regularly
- Keep Kestra credentials secure

## 📊 Monitoring

Check application health:
- Next.js: `http://localhost:3000`
- Kestra UI: `http://localhost:8080`
- API logs: Check terminal output

## 🧪 Development

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
npm start
```

### Lint Code
```bash
npm run lint
```

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

MIT License - feel free to use this project however you'd like!

## 🏆 Hackathon Submission

This project demonstrates:
- ✅ **Kestra** - AI-powered orchestration & summarization
- ✅ **Cline** - Autonomous coding agent (integration ready)
- ✅ **Vercel** - Deployment platform
- ✅ **CodeRabbit** - PR review integration
- 🔄 **Oumi** - RLHF integration (planned)

## 📧 Contact

Questions? Reach out or open an issue!

---

Made with ❤️ for the DevOps AI Hackathon
