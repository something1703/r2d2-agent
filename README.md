# R2D2 Agent 🤖

**Autonomous AI coding assistant powered by Cline CLI, Kestra orchestration, and Oumi RL fine-tuning**

> Marvel Avengers Hackathon 2025 - Built with ALL sponsor technologies

## 🏆 Hackathon Integration

This project demonstrates complete integration of all required sponsor technologies:

- ✅ **Cline CLI** ($5,000) - Automated code fixes, PR creation, issue resolution, and code reviews
- ✅ **Kestra** ($4,000) - AI agent orchestration with intelligent decision-making based on repo state
- ✅ **Oumi** ($3,000) - Reinforcement Learning fine-tuning for continuous code improvement
- ✅ **Vercel** ($2,000) - Live deployment at [https://your-deployment.vercel.app](https://your-deployment.vercel.app)
- ✅ **CodeRabbit** ($1,000) - Automated PR reviews and code quality enforcement

**Total Prize Eligibility: $15,000** 🎯

## 🌐 Live Demo

- **Deployment:** [https://r2d2-agent.vercel.app](https://r2d2-agent.vercel.app)
- **GitHub Repository:** [https://github.com/something1703/r2d2-agent](https://github.com/something1703/r2d2-agent)
- **Kestra Workflow:** Available in local deployment
- **CodeRabbit Activity:** Visible in Pull Requests

## 🚀 Features

### 1. Automated Issue Resolution (Cline CLI)
- Fetches open GitHub issues automatically
- Analyzes issue content and severity
- Creates automated fixes and PRs
- Runs code quality reviews

### 2. Intelligent Orchestration (Kestra AI Agent)
- Monitors repository health continuously
- Makes autonomous decisions based on repo metrics
- Triggers appropriate actions (fix issues, update docs, code review)
- Summarizes data from GitHub API

**Decision Logic:**
- `> 5 open issues` → Trigger auto-fix
- `> 7 days since update` → Update documentation
- `1-5 issues` → Run code quality review

### 3. Continuous Learning (Oumi RL)
- Fine-tunes code suggestions based on PR feedback
- Uses Reinforcement Learning to improve over time
- Trains on real codebase patterns
- Generates better fixes with each iteration

### 4. Automated Code Quality (CodeRabbit)
- Reviews every PR automatically
- Suggests improvements and best practices
- Enforces coding standards
- Provides inline code suggestions

## � Quick Start for Other Developers

Want to use R2D2 Agent on your own repository? Here's how:

### Method 1: GitHub Action (Easiest)

1. **Copy the workflow to your repo:**
   ```bash
   mkdir -p .github/workflows
   curl -o .github/workflows/r2d2-agent.yml \
     https://raw.githubusercontent.com/something1703/r2d2-agent/main/.github/workflows/r2d2-agent.yml
   ```

2. **Add required secrets:**
   - Go to your repo → Settings → Secrets and variables → Actions
   - Add `GITHUB_TOKEN` (automatically available)
   - Add `OPENAI_API_KEY` (optional, for enhanced features)

3. **Done!** The agent runs automatically every 12 hours or on new issues.

### Method 2: Clone and Self-Host

```bash
git clone https://github.com/something1703/r2d2-agent.git
cd r2d2-agent
npm install
cp .env.example .env.local
# Add your API keys to .env.local
npm run dev
```

### Method 3: Fork and Customize

1. Fork this repository
2. Enable GitHub Actions in your fork
3. Customize the workflow file for your needs
4. Deploy to Vercel for a full web UI

## �📦 Installation & Setup

### Prerequisites
```bash
# Node.js 18+
node --version

# Python 3.8+
python3 --version

# Docker & Docker Compose
docker --version

# GitHub CLI (optional, for PR creation)
gh --version
```

### Quick Start

1. **Clone and install dependencies:**
```bash
git clone https://github.com/something1703/r2d2-agent.git
cd r2d2-agent
npm install
```

2. **Install Python dependencies (Oumi):**
```bash
pip install oumi-sdk torch transformers
# Or use the simulation mode (no installation required)
```

3. **Set up environment variables:**
```bash
cp .env.example .env.local
# Add your tokens:
# - GITHUB_TOKEN
# - OPENAI_API_KEY (optional)
```

4. **Start Kestra orchestrator:**
```bash
cd infra/kestra
docker-compose up -d
```

5. **Start Next.js development server:**
```bash
npm run dev
```

6. **Access the application:**
- Frontend: http://localhost:3000
- Kestra UI: http://localhost:8080

## 🎯 How It Works

### Architecture Flow

```
GitHub Repo → Kestra Agent → Decision Logic → Cline CLI → Automated Actions → CodeRabbit Review → Oumi Learning
```

### Workflow Steps

1. **Kestra Agent** monitors GitHub repo every minute
2. **AI Decision Engine** analyzes repo metrics (issues, last update, etc.)
3. **Cline CLI** executes appropriate automation (fix-issues, create-pr, code-review)
4. **CodeRabbit** reviews generated PRs and provides feedback
5. **Oumi RL** learns from feedback to improve future suggestions

### API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/run-agent` | POST | Trigger Cline CLI automation |
| `/api/trigger-kestra` | POST | Manually trigger Kestra flow |
| `/api/kestra-summary` | POST/GET | Receive/retrieve Kestra summaries |
| `/api/oumi-train` | POST | Train Oumi model with feedback |
| `/api/issues` | GET | Fetch GitHub issues |

## 🛠️ Usage Examples

### Trigger Issue Auto-Fix
```bash
curl -X POST http://localhost:3000/api/run-agent \
  -H "Content-Type: application/json" \
  -d '{"action": "fix-issues"}'
```

### Create Automated PR
```bash
curl -X POST http://localhost:3000/api/run-agent \
  -H "Content-Type: application/json" \
  -d '{"action": "create-pr"}'
```

### Run Code Review
```bash
curl -X POST http://localhost:3000/api/run-agent \
  -H "Content-Type: application/json" \
  -d '{"action": "code-review"}'
```

### Train Oumi Model
```bash
curl -X POST http://localhost:3000/api/oumi-train \
  -H "Content-Type: application/json" \
  -d '{
    "codeSnippets": [{"code": "function foo() {}", "improvement": "Add return type"}],
    "feedback": ["Good suggestion", "Helpful"]
  }'
```

## 📊 Sponsor Technology Usage

### Cline CLI Integration
- **Location:** [`scripts/cline-trigger.sh`](scripts/cline-trigger.sh)
- **Features:** 5 automation actions (fix-issues, create-pr, update-docs, code-review, trigger-kestra)
- **Demonstration:** Complete working automation tools built through CLI

### Kestra AI Agent
- **Location:** [`infra/kestra/flows/agent-orchestrator-script.yaml`](infra/kestra/flows/agent-orchestrator-script.yaml)
- **Features:** Summarizes GitHub data AND makes autonomous decisions
- **Decision Logic:** 3 automated decision paths based on repo metrics

### Oumi RL Fine-tuning
- **Location:** [`scripts/oumi-rl-trainer.py`](scripts/oumi-rl-trainer.py), [`app/api/oumi-train/route.ts`](app/api/oumi-train/route.ts)
- **Features:** Reinforcement Learning fine-tuning on code feedback
- **Model:** microsoft/Phi-3-mini-4k-instruct

### Vercel Deployment
- **Status:** Live deployment
- **URL:** [https://r2d2-agent.vercel.app](https://r2d2-agent.vercel.app)
- **Config:** [`vercel.json`](vercel.json)

### CodeRabbit Activity
- **Status:** Active on repository
- **Visible:** Check PR reviews and comments
- **Integration:** Automatic on all PRs

## 🎬 Demo Video

📹 **[Watch 2-Minute Demo](https://your-video-link.com)**

Timestamps:
- 0:00-0:20 - Project overview and architecture
- 0:20-0:45 - Cline CLI automation in action
- 0:45-1:10 - Kestra decision-making engine
- 1:10-1:30 - Oumi training process
- 1:30-1:50 - CodeRabbit PR reviews
- 1:50-2:00 - Live deployment and wrap-up

## 📁 Project Structure

```
r2d2-agent/
├── app/                        # Next.js application
│   ├── api/
│   │   ├── run-agent/         # Cline CLI trigger
│   │   ├── trigger-kestra/    # Kestra manual trigger
│   │   ├── kestra-summary/    # Receive Kestra data
│   │   ├── oumi-train/        # Oumi RL training
│   │   └── issues/            # GitHub issues API
│   └── components/            # React components
├── infra/kestra/
│   ├── flows/
│   │   └── agent-orchestrator-script.yaml  # AI decision engine
│   └── docker-compose.yml     # Kestra setup
├── scripts/
│   ├── cline-trigger.sh       # Cline CLI automation
│   └── oumi-rl-trainer.py     # Oumi training script
└── README.md                  # This file
```

## 🧪 Testing

### Test Cline Automation
```bash
bash scripts/cline-trigger.sh
# Set ACTION env var for specific tests:
ACTION=code-review bash scripts/cline-trigger.sh
```

### Test Kestra Workflow
```bash
# Trigger via API
curl -X POST http://localhost:8080/api/v1/executions/default/agent-orchestrator-script \
  -u "rudra@example.com:Kestra123" \
  -F "execution={}" -F "inputs={}"
```

### Test Oumi Training
```bash
python3 scripts/oumi-rl-trainer.py
```

## 🏅 Hackathon Submission Checklist

- [x] Uses Cline CLI with complete working automation
- [x] Uses Kestra AI Agent with decision-making capability
- [x] Uses Oumi RL fine-tuning features
- [x] Deployed on Vercel
- [x] CodeRabbit activity visible in PRs
- [x] Public GitHub repository
- [x] README with setup instructions
- [ ] 2-minute demo video uploaded
- [x] All sponsor technologies integrated

## 🤝 Contributing

This is a hackathon project, but contributions and improvements are welcome!

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request (CodeRabbit will review it!)

## 📄 License

MIT License - See LICENSE file for details

## 🙏 Acknowledgments

- **Cline** - For the powerful CLI automation framework
- **Kestra** - For orchestration and AI agent capabilities
- **Oumi** - For open-source RL fine-tuning
- **Vercel** - For seamless deployment
- **CodeRabbit** - For automated code quality reviews
- **WeMakeDevs** - For organizing the Marvel Avengers Hackathon

---

Built with ❤️ for the Marvel Avengers Hackathon 2025

