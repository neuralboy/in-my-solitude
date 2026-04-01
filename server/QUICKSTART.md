# Quick Start: Deploy Resonance API

## 3-Minute Deployment

### 1. Install Supabase CLI (if not installed)
```bash
npm install -g supabase
```

### 2. Login
```bash
npm run supabase:login
```

### 3. Link to Your Project
```bash
# Replace with your actual project ref from Supabase dashboard
npm run supabase:link -- <your-project-ref>
```

### 4. Set API Key
```bash
# Get your key from https://www.perplexity.ai/settings/api
supabase secrets set PERPLEXITY_API_KEY=pplx-xxxxx
```

### 5. Deploy
```bash
npm run supabase:deploy
```

**Done!** Your API is now live at:
```
https://<project-ref>.supabase.co/functions/v1/resonance-api
```

---

## Update Frontend .env.local

```env
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
PERPLEXITY_API_KEY=<your-perplexity-key>
```

---

## Test It

```bash
# Health check
curl https://<project-ref>.supabase.co/functions/v1/resonance-api/health

# Or use the frontend - AI features should now work!
npm run dev
```

---

## Common Commands

```bash
# View logs
npm run supabase:logs

# Run locally
npm run supabase:serve

# Re-deploy after changes
npm run supabase:deploy
```

---

## Need Help?

- Full docs: `server/DEPLOYMENT.md`
- Supabase docs: https://supabase.com/docs/guides/functions
- Check logs: `npm run supabase:logs`
