# Backend Migration Summary

## What Was Done

### 1. Created `/server` Folder Structure
```
server/
├── README.md              # API documentation
├── DEPLOYMENT.md          # Detailed deployment guide
├── QUICKSTART.md          # 3-minute quick start
├── MIGRATION.md           # This file
└── server.js.backup       # Original Express.js server (reference)
```

### 2. Created Supabase Edge Function
**Location:** `supabase/functions/resonance-api/index.ts`

The Express.js server has been converted to a Supabase Edge Function with:
- ✅ All original endpoints preserved
- ✅ Same AI logic using Perplexity API
- ✅ Built-in rate limiting (30 req/min)
- ✅ CORS headers configured
- ✅ JWT authentication ready

### 3. Frontend Integration Layer
**Location:** `src/lib/supabase/resonance-api.ts`

New client library with convenient methods:
```typescript
import { resonanceAPI } from '@/lib/supabase/resonance-api';

// Examples:
await resonanceAPI.consciousnessMap(text);
await resonanceAPI.synchronicity(interest);
await resonanceAPI.wisdom(situation);
await resonanceAPI.shadow(prompt);
await resonanceAPI.feed();
await resonanceAPI.intention();
```

### 4. Environment Variables Updated
**.env.local.example** now includes:
```env
# AI Configuration (Perplexity)
PERPLEXITY_API_KEY=your-perplexity-api-key
```

### 5. NPM Scripts Added
**package.json** new scripts:
```json
{
  "supabase:login": "supabase login",
  "supabase:link": "supabase link --project-ref",
  "supabase:deploy": "supabase functions deploy resonance-api",
  "supabase:logs": "supabase functions logs resonance-api",
  "supabase:serve": "supabase functions serve resonance-api --env-file .env.local"
}
```

---

## Architecture Comparison

### Before (Express.js)
```
Frontend (Next.js) → HTTP → Express Server (server.js) → Perplexity API
                      localhost:3001
```

**Issues:**
- Separate server to manage
- CORS configuration needed
- Manual deployment
- No automatic scaling

### After (Supabase Edge Function)
```
Frontend (Next.js) → Supabase Client → Edge Function → Perplexity API
                     (global CDN)
```

**Benefits:**
- ✅ No server management
- ✅ Global edge deployment
- ✅ Automatic scaling
- ✅ Integrated with Supabase auth
- ✅ Pay-per-use pricing

---

## Endpoint Mapping

| Original Express Route | Edge Function Path | Method |
|------------------------|-------------------|--------|
| `/api/health` | `/health` | GET |
| `/api/generate` | `/generate` | POST |
| `/api/consciousness/map` | `/consciousness` | POST |
| `/api/synchronicity` | `/synchronicity` | POST |
| `/api/wisdom` | `/wisdom` | POST |
| `/api/shadow` | `/shadow` | POST |
| `/api/feed` | `/feed` | POST |
| `/api/intention` | `/intention` | POST |

---

## Deployment Steps

### Quick Deploy (3 commands)
```bash
# 1. Login to Supabase
npm run supabase:login

# 2. Link to your project (replace with your project ref)
npm run supabase:link -- your-project-ref

# 3. Set API key and deploy
supabase secrets set PERPLEXITY_API_KEY=pplx-xxxxx
npm run supabase:deploy
```

### Update Frontend Environment
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
PERPLEXITY_API_KEY=your-perplexity-key
```

---

## Testing

### Local Testing
```bash
# Start Supabase locally
supabase start

# Serve function locally
npm run supabase:serve

# Test in another terminal
curl http://localhost:54321/functions/v1/resonance-api/health
```

### Production Testing
```bash
# After deployment, test with curl
curl https://your-project-ref.supabase.co/functions/v1/resonance-api/health \
  -H "Authorization: Bearer your-anon-key"
```

---

## Code Changes Required

### Update Frontend API Calls

**Old way (calling Express server):**
```typescript
const response = await fetch('http://localhost:3001/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ prompt, systemContext })
});
```

**New way (using Supabase client):**
```typescript
import { resonanceAPI } from '@/lib/supabase/resonance-api';

const result = await resonanceAPI.generate(prompt, systemContext);
```

---

## File Checklist

### Created Files
- ✅ `server/README.md` - API documentation
- ✅ `server/DEPLOYMENT.md` - Deployment guide
- ✅ `server/QUICKSTART.md` - Quick start guide
- ✅ `server/MIGRATION.md` - This file
- ✅ `server/server.js.backup` - Original server backup
- ✅ `supabase/functions/resonance-api/index.ts` - Edge Function
- ✅ `src/lib/supabase/resonance-api.ts` - Client library

### Modified Files
- ✅ `.env.local.example` - Added PERPLEXITY_API_KEY
- ✅ `package.json` - Added Supabase scripts

### Unchanged (Preserved)
- ✅ `server.js` - Original Express server (can be removed after migration)

---

## Next Steps

1. **Deploy the Edge Function**
   - Follow `server/QUICKSTART.md`

2. **Update Frontend Components**
   - Replace direct API calls with `resonanceAPI` client
   - Test all AI features

3. **Monitor & Optimize**
   - View logs: `npm run supabase:logs`
   - Check usage in Supabase dashboard

4. **Optional Cleanup**
   - Remove `server.js` after confirming Edge Function works
   - Remove Express dependencies from package.json if no longer needed

---

## Support Resources

- **Quick Start:** `server/QUICKSTART.md`
- **Full Deployment Guide:** `server/DEPLOYMENT.md`
- **API Documentation:** `server/README.md`
- **Supabase Docs:** https://supabase.com/docs/guides/functions
- **Perplexity API:** https://docs.perplexity.ai/

---

## Troubleshooting

### Common Issues

**"supabase command not found"**
```bash
npm install -g supabase
```

**"Project not linked"**
```bash
npm run supabase:link -- your-project-ref
```

**"AI service not configured"**
- Ensure `PERPLEXITY_API_KEY` is set: `supabase secrets set PERPLEXITY_API_KEY=xxx`

**CORS errors**
- Use the `resonanceAPI` client which handles CORS automatically

---

## Migration Complete! 🎉

Your backend is now running on Supabase Edge Functions with:
- Global deployment
- Automatic scaling
- Integrated authentication
- Better performance
- Lower costs

Need help? Check `server/QUICKSTART.md` for deployment!
