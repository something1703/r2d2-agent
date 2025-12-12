# 🚀 R2D2 Agent - Complete Setup Guide

This guide will walk you through setting up the entire R2D2 Agent system from scratch.

## 📋 Prerequisites Checklist

Before starting, ensure you have:

- [ ] Node.js 18 or higher installed (`node --version`)
- [ ] Docker and Docker Compose installed (`docker --version`)
- [ ] A GitHub account and repository
- [ ] Git installed (`git --version`)
- [ ] A terminal/command line interface
- [ ] A code editor (VS Code recommended)

## Step 1: Get Your GitHub Personal Access Token

1. Go to GitHub.com and log in
2. Click your profile picture → **Settings**
3. Scroll down to **Developer settings** (left sidebar)
4. Click **Personal access tokens** → **Tokens (classic)**
5. Click **Generate new token** → **Generate new token (classic)**
6. Give it a name: "R2D2 Agent"
7. Select scopes:
   - ✅ `repo` (all repository permissions)
   - ✅ `workflow`
   - ✅ `write:packages`
8. Click **Generate token**
9. **COPY THE TOKEN NOW** - you won't see it again!

## Step 2: Clone and Setup the Project

```bash
# Clone the repository
git clone https://github.com/something1703/r2d2-agent.git
cd r2d2-agent

# Install dependencies
npm install
```

## Step 3: Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
# Copy the example
cat > .env.local << 'EOF'
GITHUB_TOKEN=paste_your_github_token_here
KESTRA_BASE=http://127.0.0.1:8080
KES_USER=rudra@example.com
KES_PASS=Kestra123
EOF
```

**Replace** `paste_your_github_token_here` with your actual GitHub token!

## Step 4: Start Kestra with Docker

```bash
# Navigate to Kestra directory
cd infra/kestra

# Start Kestra in the background
docker-compose up -d

# Check if it's running
docker-compose ps
```

**Wait 30-60 seconds** for Kestra to fully start.

Then visit: **http://localhost:8080**

Default credentials:
- Email: `rudra@example.com`
- Password: `Kestra123`

## Step 5: Configure Kestra Flow

### Option A: Via Kestra UI (Recommended)

1. Open **http://localhost:8080** in your browser
2. Log in with the credentials above
3. Click **Flows** in the left sidebar
4. Click **Create** button (top right)
5. Paste your flow YAML from `infra/kestra/flows/agent-orchestrator.yml`
6. Click **Save**

### Option B: Via API

```bash
# From the project root directory
cd infra/kestra/flows

# Upload the flow
curl -X POST http://localhost:8080/api/v1/flows \
  -H "Content-Type: application/x-yaml" \
  -u "rudra@example.com:Kestra123" \
  --data-binary @agent-orchestrator.yml
```

## Step 6: Add GitHub Token to Kestra

1. In Kestra UI, go to **Settings** → **Secrets** (or **Namespaces** → **default** → **Secrets**)
2. Click **Add Secret**
3. Name: `SECRET_GITHUB_TOKEN`
4. Value: Your GitHub personal access token
5. Click **Save**

## Step 7: Start the Next.js Application

```bash
# Navigate back to project root
cd ../..  # or cd /path/to/r2d2-agent

# Start the development server
npm run dev
```

You should see:
```
  ▲ Next.js 16.0.8
  - Local:        http://localhost:3000
  - Ready in 2.1s
```

## Step 8: Test the System

### Test 1: Open the Dashboard

1. Visit **http://localhost:3000** in your browser
2. You should see the R2D2 Agent dashboard with:
   - 🤖 Header with gradient background
   - "Kestra AI Summaries" section (empty at first)
   - "GitHub Issues" section

### Test 2: Load GitHub Issues

1. Click the **"🔄 Load Issues"** button
2. You should see issues from your GitHub repository

### Test 3: Trigger Kestra Manually

1. Click the **"▶️ Trigger Orchestrator"** button
2. Wait 5-10 seconds
3. The page should auto-refresh and show a new summary card

### Test 4: Check Kestra Execution

1. Go to **http://localhost:8080**
2. Click **Executions** in the left sidebar
3. You should see your flow execution listed
4. Click on it to see detailed logs

## Step 9: Verify Data Flow

The complete flow should be:

1. **Kestra** fetches GitHub issues → ✅
2. **Kestra AI** generates summary → ✅
3. **Kestra** posts to `/api/kestra-summary` → ✅
4. **Next.js** stores in `data/kestra-summaries.json` → ✅
5. **Dashboard** displays the summary → ✅

Check the data file:

```bash
cat data/kestra-summaries.json
```

You should see JSON data with your summaries.

## 🎉 Success Checklist

Your R2D2 Agent is fully working if:

- [ ] Kestra is running at http://localhost:8080
- [ ] Next.js is running at http://localhost:3000
- [ ] Dashboard loads without errors
- [ ] "Trigger Orchestrator" button works
- [ ] Summaries appear on the dashboard
- [ ] GitHub issues load successfully
- [ ] Data is saved to `data/kestra-summaries.json`

## 🔧 Troubleshooting

### Problem: Kestra won't start

**Solution:**
```bash
cd infra/kestra
docker-compose down
docker-compose up -d
docker-compose logs -f
```

### Problem: "Cannot find module 'axios'"

**Solution:**
```bash
npm install
```

### Problem: GitHub API errors

**Check:**
- Is your `GITHUB_TOKEN` correct in `.env.local`?
- Does your token have the right permissions?
- Is the repository path correct in `app/api/issues/route.ts`?

### Problem: Kestra flow doesn't trigger

**Check:**
1. Is Kestra running? Visit http://localhost:8080
2. Is the flow saved correctly?
3. Does Kestra have the `SECRET_GITHUB_TOKEN` configured?
4. Check Kestra logs for errors

### Problem: Summaries not showing on dashboard

**Check:**
1. Open browser DevTools (F12) → Console
2. Look for JavaScript errors
3. Check Network tab for failed API calls
4. Verify `data/kestra-summaries.json` exists and has data

## 🚀 Next Steps

### Deploy to Vercel

1. Create a Vercel account at https://vercel.com
2. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```
3. Deploy:
   ```bash
   vercel
   ```
4. Add environment variables in Vercel Dashboard

### Enable CodeRabbit

1. Go to https://coderabbit.ai
2. Install the CodeRabbit GitHub App
3. Select your repository
4. CodeRabbit will now review all PRs automatically!

### Integrate Cline CLI

1. Install Cline VS Code extension
2. Update `scripts/cline-trigger.sh` with actual Cline commands
3. Implement automated PR creation, issue fixing, etc.

### Schedule Automatic Runs

In Kestra, edit your flow to add a trigger:

```yaml
triggers:
  - id: schedule
    type: io.kestra.core.models.triggers.types.Schedule
    cron: "0 */6 * * *"  # Run every 6 hours
```

## 📚 Additional Resources

- [Kestra Documentation](https://kestra.io/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [GitHub API Documentation](https://docs.github.com/en/rest)
- [Vercel Deployment Guide](https://vercel.com/docs)

## 💬 Need Help?

- Open an issue on GitHub
- Check the logs:
  - Next.js: Terminal where you ran `npm run dev`
  - Kestra: `docker-compose logs -f`
- Join the community Discord/Slack

---

**Congratulations! 🎉** You've successfully set up R2D2 Agent!
