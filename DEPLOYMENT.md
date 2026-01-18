# 🚀 Deployment Guide - One Click Deploy to Cloudflare

This guide will help you set up automatic deployment from GitHub to Cloudflare Workers with just one click!

## ✅ Free Plan Compatible (Updated January 2026)

This application is fully compatible with Cloudflare Workers Free Plan:
- **No paid features required**
- **CPU limits removed** for free plan compatibility
- **Successfully deployed** to production
- **Zero cost** for basic usage

### 🚀 What's New (January 2026)
- **Complete System Overhaul**: Full guest chat, user dashboard, admin panel, and payment system
- **Database Integration**: KV storage with proper configuration
- **New Features**: SEO optimization, guest chat, model management, payment packages
- **Documentation**: Updated README and project structure

> 🎯 **Deployment Status**: ✅ Successfully deployed at https://ai.jasyscom-corp.workers.dev

## 📋 Prerequisites

### Required Accounts
- [GitHub Account](https://github.com/signup)
- [Cloudflare Account](https://dash.cloudflare.com/sign-up)

### Required Tools
- [Node.js](https://nodejs.org/) (v18+)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/)

## 🔧 Setup Instructions

### 1. Install Wrangler CLI
```bash
npm install -g wrangler
```

### 2. Login to Cloudflare
```bash
wrangler auth login
```

### 3. Create KV Namespace
```bash
# Create production KV namespace
wrangler kv:namespace create "JASYSAI_KV"

# Create preview KV namespace for development
wrangler kv:namespace create "JASYSAI_KV" --preview
```

### 4. Update wrangler.toml
Replace the placeholder values in `wrangler.toml`:
```toml
# Replace these with your actual values
[[kv_namespaces]]
binding = "JASYSAI_KV"
id = "your-production-kv-id"        # From step 3
preview_id = "your-preview-kv-id"   # From step 3

[env.production]
routes = [
  { pattern = "your-domain.com/*", zone_name = "your-domain.com" }
]

# ⚠️ IMPORTANT: No CPU limits for Free Plan compatibility
# The following has been removed:
# [limits]
# cpu_ms = 50000  # This is a paid feature!
```

### Free Plan Configuration Notes
- **CPU Limits**: Removed (paid feature - not needed for free plan)
- **KV Storage**: Uses free tier (1GB, 100K reads/day, 1K writes/day)
- **Workers**: 100,000 requests per day included
- **No additional costs** for basic usage

### 5. Set Environment Secrets
```bash
# Set required secrets
wrangler secret put OPENROUTER_KEY
wrangler secret put ADMIN_USER
wrangler secret put ADMIN_PASS
wrangler secret put JWT_SECRET
```

### 6. Setup GitHub Repository

#### A. Create GitHub Repository
1. Go to [GitHub](https://github.com) and create a new repository
2. Clone the repository locally
3. Copy all project files to the repository
4. Push to GitHub

#### B. Setup GitHub Secrets
1. Go to your repository on GitHub
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Add the following secrets:

| Secret Name | Value | How to Get |
|-------------|-------|------------|
| `CLOUDFLARE_API_TOKEN` | Your API token | Cloudflare Dashboard → My Profile → API Tokens |
| `CLOUDFLARE_ACCOUNT_ID` | Your account ID | Cloudflare Dashboard → Right sidebar |

#### C. Create Cloudflare API Token
1. Go to [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens)
2. Click **Create Token**
3. Use **Custom token** template with these permissions:
   - **Account**: `Cloudflare Workers:Edit`
   - **Zone**: `Zone:Read` (if using custom domain)
   - **Zone Resources**: `Include All zones` or specific zone

## 🎯 One-Click Deployment Options

### Option 1: Automatic Deploy on Push
Simply push to `main` or `master` branch:
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```
🎉 **Deployment starts automatically!**

### Option 2: Manual Deploy from GitHub
1. Go to your repository on GitHub
2. Click **Actions** tab
3. Select **Deploy to Cloudflare Workers** workflow
4. Click **Run workflow**
5. Choose environment and click **Run workflow**

### Option 3: Deploy Button (Add to README)
Add this to your `README.md`:
```markdown
[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/your-username/jasysai)
```

## 📊 Deployment Status

### Check Deployment Status
1. **GitHub Actions**: Go to Actions tab in your repository
2. **Cloudflare Dashboard**: Check Workers section
3. **Command Line**: Use `wrangler tail` to see logs

### View Deployed Application
- **Production**: `https://your-domain.com` or `https://jasysai.your-subdomain.workers.dev`
- **Staging**: `https://jasysai-staging.your-subdomain.workers.dev`

## 🔍 Troubleshooting

### Common Issues

#### 1. CPU Limits Error (Free Plan)
```
Error: CPU limits are not supported for the Free plan
```
**Solution**: Remove `[limits]` section from `wrangler.toml` - this is now fixed in the current configuration

#### 2. API Token Permissions
```
Error: API token does not have required permissions
```
**Solution**: Ensure your API token has `Cloudflare Workers:Edit` permission

#### 3. Free Plan Usage Limits
```
Error: Worker exceeded free plan request limit
```
**Solution**: Monitor usage in Cloudflare Dashboard, consider upgrading to paid plan if needed

#### 4. KV Namespace Not Found
```
Error: KV namespace not found
```
**Solution**: Check KV namespace ID in `wrangler.toml` matches your actual namespace

#### 5. Missing Secrets
```
Error: Secret OPENROUTER_KEY not found
```
**Solution**: Set all required secrets using `wrangler secret put`

#### 6. Domain Configuration
```
Error: Zone not found
```
**Solution**: Ensure your domain is added to Cloudflare and matches `wrangler.toml`

### Debug Commands
```bash
# Check deployment status
wrangler deployments list

# View logs
wrangler tail

# Test locally
wrangler dev

# Check configuration
wrangler whoami
```

## 🔄 Environment Management

### Production Environment
```bash
# Deploy to production
npm run deploy:production

# Or using wrangler directly
wrangler deploy --env production
```

### Staging Environment
```bash
# Deploy to staging
npm run deploy:staging

# Or using wrangler directly
wrangler deploy --env staging
```

### Local Development
```bash
# Start local development server
npm run dev

# Or using wrangler directly
wrangler dev
```

## 📈 Monitoring and Analytics

### View Logs
```bash
# Real-time logs
wrangler tail

# Production logs
wrangler tail --env production

# Staging logs
wrangler tail --env staging
```

### Analytics Dashboard
1. Go to Cloudflare Dashboard
2. Select your account
3. Go to **Analytics & Logs** → **Workers Analytics**

## 🛠️ Advanced Configuration

### Custom Domain Setup
1. Add domain to Cloudflare
2. Update `wrangler.toml` with your domain
3. Deploy again
4. Configure DNS records

### D1 Database (Optional)
```bash
# Create D1 database
wrangler d1 create jasysai-db

# Update wrangler.toml with database ID
# Add migrations if needed
```

### Queue Configuration (Optional)
```bash
# Create queue
wrangler queues create jasysai-queue

# Update wrangler.toml with queue configuration
```

## 📝 Best Practices

### 1. Branch Strategy
- `main/master`: Production deployments
- `develop`: Staging deployments
- Feature branches: Pull requests for testing

### 2. Environment Variables
- Use different secrets for each environment
- Keep sensitive data in secrets, not code
- Use environment-specific configurations

### 3. Monitoring
- Set up alerts for deployment failures
- Monitor error rates and performance
- Regular backup of KV data

### 4. Security
- Rotate API tokens regularly
- Use least privilege principle
- Monitor access logs

## 🆘 Support

### Get Help
1. **Documentation**: Check this guide and README.md
2. **GitHub Issues**: Create an issue in your repository
3. **Cloudflare Docs**: [Workers Documentation](https://developers.cloudflare.com/workers/)
4. **Community**: [Cloudflare Community](https://community.cloudflare.com/)

### Emergency Rollback
```bash
# Quick rollback to previous deployment
git checkout previous-commit-hash
git push origin main --force
```

---

🎉 **Congratulations! Your JasyAI application is now ready for one-click deployment to Cloudflare Workers!**

**Next Steps:**
1. Push your code to GitHub
2. Watch the automatic deployment
3. Test your deployed application
4. Set up monitoring and alerts