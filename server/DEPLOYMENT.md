# Resonance API Deployment Guide

This guide walks you through deploying the Resonance backend to Supabase Edge Functions.

## Prerequisites

1. **Supabase Account** - Sign up at https://supabase.com
2. **Perplexity API Key** - Get from https://www.perplexity.ai/settings/api
3. **Supabase CLI** - Install with: `npm install -g supabase`

## Step 1: Install Supabase CLI

```bash
npm install -g supabase
```

## Step 2: Login to Supabase

```bash
supabase login
```

This will open a browser window for authentication.

## Step 3: Link to Your Project

```bash
supabase link --project-ref <your-project-ref>
```

Find your project ref in the Supabase dashboard: **Settings > API > Project Reference**

## Step 4: Set Environment Variables

Set the Perplexity API key as a secret in Supabase:

```bash
supabase secrets set PERPLEXITY_API_KEY=your-perplexity-api-key
```

## Step 5: Deploy the Edge Function

```bash
supabase functions deploy resonance-api
```

## Step 6: Test the Deployment

### Option A: Using curl

```bash
# Get your function URL from the deploy output
curl -X POST https://<project-ref>.supabase.co/functions/v1/resonance-api/health \
  -H "Authorization: Bearer <your-anon-key>"
```

### Option B: Using the frontend

The frontend will automatically use the deployed function once you update your `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
PERPLEXITY_API_KEY=<your-perplexity-key>
```

## Local Development

### Run Supabase locally

```bash
# Start Supabase services
supabase start

# Link to local project
supabase link --project-ref local

# Set secrets locally
supabase secrets set PERPLEXITY_API_KEY=your-key

# Serve function locally
supabase functions serve resonance-api --env-file .env.local
```

### Test locally

```bash
curl http://localhost:54321/functions/v1/resonance-api/health
```

## Frontend Integration

The frontend uses the `resonanceAPI` client from `src/lib/supabase/resonance-api.ts`:

```typescript
import { resonanceAPI } from '@/lib/supabase/resonance-api';

// Example usage in a React component
const handleGenerate = async () => {
  try {
    const result = await resonanceAPI.consciousnessMap(journalText);
    console.log(result);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

## Troubleshooting

### Function returns 401 Unauthorized
- Ensure you're passing the auth header with a valid JWT
- Check that your anon key is correct

### "AI service not configured" error
- Verify `PERPLEXITY_API_KEY` is set: `supabase secrets list`
- Ensure the key is valid and has remaining quota

### Deployment fails
- Check Supabase CLI version: `supabase --version`
- Update CLI: `npm install -g supabase@latest`
- Verify project link: `supabase projects list`

## Function URLs

After deployment, your function is available at:

```
https://<project-ref>.supabase.co/functions/v1/resonance-api
```

Endpoints are accessed by passing the endpoint name in the request body or as a path segment.

## Monitoring

View function logs in the Supabase dashboard:
- **Edge Functions** tab > Select `resonance-api` > **Logs**

Or use CLI:
```bash
supabase functions logs resonance-api
```

## Cost

Supabase Edge Functions pricing:
- Free tier: 500,000 invocations/month
- Pro: $0.02 per 100,000 additional invocations

Perplexity API pricing:
- Check current rates at https://www.perplexity.ai/pricing

## Security Notes

- ✅ JWT validation is enabled by default
- ✅ Rate limiting is built-in (30 req/min per IP)
- ✅ CORS headers are configured
- ⚠️ Never expose `PERPLEXITY_API_KEY` to the client
- ⚠️ Use Supabase RLS policies for database access

## Next Steps

1. Update your frontend components to use the new API
2. Test all endpoints thoroughly
3. Monitor usage and adjust rate limits if needed
4. Consider adding authentication for premium features
