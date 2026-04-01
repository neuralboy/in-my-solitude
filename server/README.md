# Resonance API Server

This folder contains the backend API for the Resonance consciousness features, deployed as a Supabase Edge Function.

## Architecture

The backend has been migrated from an Express.js server (`server.js`) to a Supabase Edge Function for:
- **Better integration** with Supabase authentication and database
- **Global edge deployment** for lower latency
- **Automatic scaling** without server management
- **Cost efficiency** - pay only for actual usage

## Features

- 🧠 **Consciousness Mapping** - Analyze journal entries with AI
- 🔄 **Synchronicity Engine** - Generate meaningful coincidences
- 📚 **Ancient Wisdom** - Bridge ancient teachings with modern life
- 🌑 **Shadow Integration** - Trauma-informed shadow work guidance
- 📰 **Consciousness Feed** - Curated consciousness news
- 🎯 **Daily Intentions** - Personalized daily practices
- 💬 **General Generate** - Custom AI prompts

## API Endpoints

All endpoints are accessed via Supabase Edge Functions at:
```
https://<your-project-ref>.supabase.co/functions/v1/resonance-api
```

### Health Check
```
GET /health
```

### Generate (General AI)
```
POST /generate
Body: { prompt, systemContext?, feature? }
```

### Consciousness Mapping
```
POST /consciousness
Body: { journalText }
```

### Synchronicity Engine
```
POST /synchronicity
Body: { interest }
```

### Ancient Wisdom
```
POST /wisdom
Body: { situation }
```

### Shadow Integration
```
POST /shadow
Body: { shadowPrompt }
```

### Consciousness Feed
```
POST /feed
Body: {}
```

### Daily Intention
```
POST /intention
Body: {}
```

## Frontend Integration

Use the provided client library in `src/lib/supabase/resonance-api.ts`:

```typescript
import { resonanceAPI } from '@/lib/supabase/resonance-api';

// Example: Generate consciousness map
const result = await resonanceAPI.consciousnessMap(journalText);

// Example: Get daily intention
const intention = await resonanceAPI.intention();

// Example: Custom prompt
const response = await resonanceAPI.generate<{ data: string }>(
  'Your prompt here',
  'Optional system context'
);
```

## Deployment

### Prerequisites
1. Supabase project with Edge Functions enabled
2. Perplexity API key from https://www.perplexity.ai/settings/api

### Setup

1. **Set environment variables in Supabase:**
```bash
# Link to your Supabase project
supabase link --project-ref <your-project-ref>

# Set the Perplexity API key as a secret
supabase secrets set PERPLEXITY_API_KEY=your-api-key-here
```

2. **Deploy the Edge Function:**
```bash
# From project root
supabase functions deploy resonance-api
```

3. **Verify deployment:**
```bash
supabase functions list
```

### Testing Locally

```bash
# Start Supabase functions locally
supabase functions serve resonance-api --env-file .env.local

# Test health endpoint
curl http://localhost:54321/functions/v1/resonance-api/health
```

## Rate Limiting

The API includes built-in rate limiting:
- **30 requests per minute** per IP address
- Returns `429` status when exceeded

## Error Handling

All endpoints return consistent error formats:
```json
{
  "error": "Error message",
  "details": "Optional details (development only)"
}
```

Success responses:
```json
{
  "success": true,
  "data": { ... }
}
```

## Migration from Express.js

The original `server.js` has been preserved in this folder for reference. The Edge Function version:
- Uses Deno runtime instead of Node.js
- Removes Express.js middleware (CORS handled by Supabase)
- Uses Supabase's `Deno.serve()` instead of `app.listen()`
- Maintains all original functionality and endpoints

## Troubleshooting

### "AI service not configured" error
- Ensure `PERPLEXITY_API_KEY` is set in Supabase secrets
- Check that the key is valid and has quota remaining

### Rate limit errors
- Reduce request frequency
- Implement client-side caching where appropriate

### CORS errors
- Supabase Edge Functions handle CORS automatically
- Ensure you're using the correct function URL

## Resources

- [Supabase Edge Functions Docs](https://supabase.com/docs/guides/functions)
- [Perplexity API Documentation](https://docs.perplexity.ai/)
- [Deno Runtime Docs](https://deno.land/manual)
