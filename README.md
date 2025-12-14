# R2D2 Agent

Your repository. Monitored. Analyzed. Improved. Automatically.

## What It Does

R2D2 watches your codebase. When issues pile up, it acts. When code quality drops, it reviews. When documentation falls behind, it updates.

No meetings. No manual work. Just automation.

**Live:** [r2d2-agent.vercel.app](https://r2d2-agent.vercel.app)

## How It Works

Three components. One goal.

**Kestra** monitors your repository every 6 hours. Calculates health. Makes decisions.

**Cline CLI** executes those decisions. Analyzes issues. Reviews code. Provides recommendations.

**CodeRabbit** reviews every pull request. Suggests improvements. Enforces quality.

Simple architecture. Real results.

[Read the full architecture →](ARCHITECTURE.md)

## What You Get

**Automated issue analysis**  
Real AI reads your GitHub issues. Identifies root causes. Suggests fixes.

**Code quality reviews**  
AI reviews your code. Finds problems. Recommends solutions.

**Smart orchestration**  
Workflows run automatically. No configuration needed. Just works.

**Pull request reviews**  
Every PR gets reviewed. By AI. Within minutes.

## Quick Start

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
## Installation

**Prerequisites:**
```bash
node --version  # 18+
docker --version
npm install -g cline
```

**Steps:**
```bash
# 1. Clone
git clone https://github.com/something1703/r2d2-agent.git
cd r2d2-agent

# 2. Install dependencies
npm install

# 3. Configure
cp .env.example .env.local
# Add your GITHUB_TOKEN

# 4. Start Kestra
cd infra/kestra && docker-compose up -d && cd ../..

# 5. Authenticate Cline
cline auth

# 6. Run
npm run dev
```

**Access:**
- App: http://localhost:3000
- Kestra: http://localhost:8080

Done.

## Stack

**Backend:** Next.js 16, Kestra (Docker), Cline CLI  
**Frontend:** React, TypeScript, minimal CSS  
**Deploy:** Vercel, GitHub Actions  

## What's Real

Cline CLI v1.0.8 - installed, authenticated, running  
Kestra workflows - monitoring repo every 6 hours  
CodeRabbit - reviewing every PR  
Vercel - live deployment  

No simulations. No fake integrations.

## Contributing

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
## Contributing

Fork it. Improve it. Send a PR.

We welcome:
- Bug fixes
- Performance improvements
- New automation workflows
- Better AI decision logic

## License

MIT. Use it however you want.

---

**Questions?** Open an issue.  
**Want to use this?** Fork the repo.  
**Like it?** Star it.

Simple.
  -F "execution={}" -F "inputs={}"
```

### Test Oumi Training
```bash
python3 scripts/oumi-rl-trainer.py
```
\
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

Building it for the love of the game.

