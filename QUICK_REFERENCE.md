# R2D2 Agent - Quick Reference Card

## 🚀 Quick Commands

### Start Everything
```bash
# Terminal 1: Start Kestra
cd infra/kestra && docker-compose up -d

# Terminal 2: Start Next.js
npm run dev
```

### Access Points
- **Dashboard**: http://localhost:3000
- **Kestra UI**: http://localhost:8080

### Deploy to Vercel
```bash
vercel
```

## 📁 Important Files

| File | Purpose |
|------|---------|
| `app/api/kestra-summary/route.ts` | Receives summaries from Kestra |
| `app/api/run-agent/route.ts` | Triggers Cline automation |
| `app/api/trigger-kestra/route.ts` | Manually triggers Kestra |
| `app/components/RepoSummary.tsx` | Summary display UI |
| `app/components/IssueList.tsx` | GitHub issues UI |
| `lib/kestra-state.ts` | State management |
| `lib/github.ts` | GitHub API client |
| `scripts/cline-trigger.sh` | Cline automation |
| `.env.local` | Environment variables |

## 🔑 Environment Variables

```env
GITHUB_TOKEN=your_token_here
KESTRA_BASE=http://127.0.0.1:8080
KES_USER=rudra@example.com
KES_PASS=Kestra123
```

## 🛠️ Troubleshooting

| Problem | Solution |
|---------|----------|
| Port 3000 in use | `killall node` or change port |
| Kestra not responding | `cd infra/kestra && docker-compose restart` |
| Build errors | `rm -rf .next && npm install` |
| CSS not loading | Restart dev server |

## 📊 API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/kestra-summary` | POST | Receive summary from Kestra |
| `/api/kestra-summary` | GET | Get all summaries |
| `/api/trigger-kestra` | POST | Trigger Kestra flow |
| `/api/run-agent` | POST | Run Cline automation |
| `/api/issues` | GET | Get GitHub issues |

## 🎯 Key Features

✅ Auto-refresh (10s)  
✅ Beautiful gradient UI  
✅ TypeScript types  
✅ Error handling  
✅ Loading states  
✅ Responsive design  
✅ Kestra integration  
✅ GitHub integration  
✅ Cline ready  

## 📚 Documentation

- [`PROJECT_COMPLETE.md`](PROJECT_COMPLETE.md) - Status overview
- [`SETUP_GUIDE.md`](SETUP_GUIDE.md) - Installation guide
- [`DOCUMENTATION.md`](DOCUMENTATION.md) - Full docs
- [`NEXT_STEPS.md`](NEXT_STEPS.md) - Action plan

## 🎬 Demo Script

1. Show dashboard at http://localhost:3000
2. Click "Trigger Orchestrator"
3. Show summary appearing
4. Click "Load Issues"
5. Show GitHub issues grid
6. Explain automation potential

## 🏆 Hackathon Submission

**Integrations:**
- ✅ Kestra (AI orchestration)
- ✅ Next.js (UI)
- ✅ GitHub (data source)
- 🔄 Cline (ready for automation)
- 📝 CodeRabbit (install separately)
- 📝 Oumi (optional)

**Deploy:** `vercel`  
**Demo:** 2-3 minutes  
**Repo:** https://github.com/something1703/r2d2-agent

---

**Status: ✅ READY TO SUBMIT**
