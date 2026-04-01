# Deploy Backend - Step by Step

## Current Status ✅

All files are ready for deployment:

```
✅ /server folder created
✅ Edge Function created: supabase/functions/resonance-api/index.ts
✅ Frontend client created: src/lib/supabase/resonance-api.ts
✅ Environment variables updated: .env.local.example
✅ NPM scripts added to package.json
✅ Documentation created
```

---

## Deployment Instructions

### Step 1: Install Supabase CLI

Open a **new terminal** (administrator mode on Windows) and run:

```bash
npm install -g supabase
```

**Windows PowerShell (Admin):**
```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
npm install -g supabase
```

Wait for installation to complete (may take 2-5 minutes).

---

### Step 2: Login to Supabase

```bash
supabase login
```

This will:
1. Open your browser automatically
2. Ask you to sign in to Supabase
3. Redirect back to terminal when complete

---

### Step 3: Get Your Project Reference

1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to **Settings** (left sidebar)
4. Click **API**
5. Copy the **Project Reference** (looks like: `abcdefghijklnopqrst`)

---

### Step 4: Link Your Project

In your terminal, navigate to the project folder:

```bash
cd "C:\Users\pmann\Documents\trae-projects\In-My-Solitude"
```

Link to your Supabase project:

```bash
supabase link --project-ref YOUR_PROJECT_REF
```

Replace `YOUR_PROJECT_REF` with the actual reference from Step 3.

---

### Step 5: Set Perplexity API Key

Get your Perplexity API key:
1. Go to https://www.perplexity.ai/settings/api
2. Copy your API key

Set it as a secret in Supabase:

```bash
supabase secrets set PERPLEXITY_API_KEY=pplx-xxxxxxxxxxxxxxxxxxxx
```

Replace `pplx-xxxxxxxxxxxxxxxxxxxx` with your actual key.

---

### Step 6: Deploy the Edge Function

```bash
supabase functions deploy resonance-api
```

You should see output like:
```
Deploying resonance-api...
Deployment complete!
Function URL: https://YOUR_PROJECT_REF.supabase.co/functions/v1/resonance-api
```

**Save this URL!** You'll need it for the next step.

---

### Step 7: Update Frontend Environment

Create or update `.env.local` in the project root:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-from-supabase-dashboard
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-from-dashboard

# Email Configuration
RESEND_API_KEY=your-resend-key
ADMIN_EMAIL=your-email@example.com

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# AI Configuration
PERPLEXITY_API_KEY=pplx-xxxxxxxxxxxxxxxxxxxx
```

**Get your Supabase keys:**
1. Go to Supabase Dashboard
2. Settings > API
3. Copy the **anon/public** key and **service_role** key

---

### Step 8: Test the Deployment

#### Option A: Test with curl

```bash
curl https://YOUR_PROJECT_REF.supabase.co/functions/v1/resonance-api/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "Resonance backend is running",
  "aiAvailable": true,
  "timestamp": "2026-03-30T..."
}
```

#### Option B: Test with Frontend

1. Start the development server:
```bash
npm run dev
```

2. Open http://localhost:3000
3. Try an AI feature (consciousness mapping, wisdom, etc.)
4. Check browser console for any errors

---

## Verify It Works

### Check Function Logs

```bash
supabase functions logs resonance-api
```

You should see incoming requests.

### Test Each Endpoint

Using the frontend client:

```typescript
import { resonanceAPI } from '@/lib/supabase/resonance-api';

// Test health
const health = await resonanceAPI.health();
console.log('Health:', health);

// Test consciousness map
const map = await resonanceAPI.consciousnessMap('Today I felt...');
console.log('Map:', map);

// Test wisdom
const wisdom = await resonanceAPI.wisdom('I am stressed about work');
console.log('Wisdom:', wisdom);
```

---

## Troubleshooting

### Installation Fails

**Error: `supabase command not found`**

Try installing with yarn:
```bash
yarn global add supabase
```

Or download from: https://github.com/supabase/cli/releases

---

### Deployment Fails

**Error: `Not logged in`**
```bash
supabase login
```

**Error: `Project not linked`**
```bash
supabase link --project-ref YOUR_PROJECT_REF
```

**Error: `Permission denied`**
- Make sure you're logged in with the correct Supabase account
- Check that you have access to the project

---

### Function Returns Errors

**"AI service not configured"**
- Check that `PERPLEXITY_API_KEY` is set: `supabase secrets list`
- Verify the key is valid at https://www.perplexity.ai/settings/api

**401 Unauthorized**
- Ensure you're using the correct anon key
- Check that the function is deployed to the right project

**CORS errors**
- Make sure you're using the Supabase client, not direct fetch
- The `resonanceAPI` client handles CORS automatically

---

## Alternative: Manual Deployment via Supabase Dashboard

If CLI doesn't work, you can deploy manually:

1. Go to Supabase Dashboard
2. Select your project
3. Go to **Edge Functions** (left sidebar)
4. Click **New Function**
5. Name it: `resonance-api`
6. Copy the contents of `supabase/functions/resonance-api/index.ts`
7. Paste into the editor
8. Click **Deploy**
9. Go to **Secrets** tab
10. Add `PERPLEXITY_API_KEY` with your key
11. Save

---

## Next Steps After Deployment

1. ✅ Test all AI endpoints
2. ✅ Update frontend components to use `resonanceAPI` client
3. ✅ Monitor logs: `supabase functions logs resonance-api`
4. ✅ Check usage in Supabase dashboard
5. ✅ Remove old `server.js` when confident (optional)

---

## Quick Reference

```bash
# Login
supabase login

# Link project
supabase link --project-ref YOUR_REF

# Set secret
supabase secrets set PERPLEXITY_API_KEY=xxx

# Deploy
supabase functions deploy resonance-api

# View logs
supabase functions logs resonance-api

# Local testing
supabase functions serve resonance-api --env-file .env.local
```

---

## Need Help?

- Documentation: `server/README.md`
- Quick Start: `server/QUICKSTART.md`
- Full Guide: `server/DEPLOYMENT.md`
- Migration Info: `server/MIGRATION.md`
- Supabase Support: https://supabase.com/docs

---

**Good luck with your deployment! 🚀**
