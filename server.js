import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Initialize Perplexity AI
const apiKey = process.env.PERPLEXITY_API_KEY;

if (!apiKey) {
  console.warn('⚠️  PERPLEXITY_API_KEY not found in environment variables. AI features will not work.');
}

const openai = apiKey ? new OpenAI({
  apiKey: apiKey,
  baseURL: 'https://api.perplexity.ai'
}) : null;

// Model name - using perplexity-sonar-small
const MODEL_NAME = 'sonar';

// Rate limiting simple implementation
const rateLimitStore = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX = 30; // 30 requests per minute

const rateLimit = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();

  if (!rateLimitStore.has(ip)) {
    rateLimitStore.set(ip, []);
  }

  const requests = rateLimitStore.get(ip).filter(time => now - time < RATE_LIMIT_WINDOW);

  if (requests.length >= RATE_LIMIT_MAX) {
    return res.status(429).json({
      error: 'Rate limit exceeded. Please slow down and take a breath. 🌬️'
    });
  }

  requests.push(now);
  rateLimitStore.set(ip, requests);
  next();
};

// Apply rate limiting to API routes
app.use('/api', rateLimit);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Resonance backend is running',
    aiAvailable: !!openai,
    timestamp: new Date().toISOString()
  });
});

// Main AI endpoint for all consciousness features
app.post('/api/generate', async (req, res) => {
  try {
    const { prompt, systemContext, feature } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    if (!openai) {
      return res.status(503).json({
        error: 'AI service not configured. Please add PERPLEXITY_API_KEY to your .env file.'
      });
    }

    // Construct the full prompt with system context
    const systemMessage = systemContext
      ? `${systemContext}\n\nRESPOND ONLY WITH VALID JSON. NO OTHER TEXT. NO MARKDOWN FORMATTING.`
      : 'RESPOND ONLY WITH VALID JSON. NO OTHER TEXT. NO MARKDOWN FORMATTING.';

    // Generate response using Perplexity
    const completion = await openai.chat.completions.create({
      model: MODEL_NAME,
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: prompt }
      ]
    });

    let responseText = completion.choices[0].message.content;

    // Clean up response - remove markdown code blocks and extra whitespace
    responseText = responseText
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .replace(/```/g, '')
      .trim();

    // Try to parse as JSON
    try {
      const parsed = JSON.parse(responseText);
      res.json({ success: true, data: parsed });
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      console.error('Raw response:', responseText);

      // Return as text if JSON parsing fails
      res.json({
        success: true,
        data: { rawResponse: responseText },
        warning: 'Response was not valid JSON'
      });
    }

  } catch (error) {
    console.error('API Error:', error);

    if (error.message?.includes('API key')) {
      return res.status(401).json({
        error: 'Invalid API key. Please check your PERPLEXITY_API_KEY configuration.'
      });
    }

    if (error.message?.includes('quota') || error.message?.includes('rate limit')) {
      return res.status(429).json({
        error: 'API quota exceeded. Please try again later.'
      });
    }

    res.status(500).json({
      error: 'Could not complete request. Please try again.',
      details: error.message
    });
  }
});

// Specific endpoint for consciousness mapping
app.post('/api/consciousness/map', async (req, res) => {
  try {
    const { journalText } = req.body;

    if (!journalText?.trim()) {
      return res.status(400).json({ error: 'Journal text is required' });
    }

    if (!openai) {
      return res.status(503).json({ error: 'AI service not configured' });
    }

    const prompt = `You are a consciousness mapping AI. Analyze this journal entry with deep empathy and insight. Identify:
1. Core emotional frequency (what state they're vibrating in)
2. Growth edges (areas ready for expansion)
3. Flow triggers (what brings them into presence)
4. Unconscious patterns (gentle observations)
5. Next step wisdom (one actionable insight)

Be poetic, profound, and personal. Speak as a wise mirror, not a therapist.

Journal entry: "${journalText}"

Respond ONLY with valid JSON in this exact format:
{
  "frequency": "brief description of their current vibration",
  "growthEdges": ["edge1", "edge2"],
  "flowTriggers": ["trigger1", "trigger2"],
  "patterns": "gentle observation of a pattern",
  "nextStep": "one profound, actionable insight"
}`;

    const completion = await openai.chat.completions.create({
      model: MODEL_NAME,
      messages: [
        { role: 'system', content: 'RESPOND ONLY WITH VALID JSON. NO OTHER TEXT. NO MARKDOWN FORMATTING.' },
        { role: 'user', content: prompt }
      ]
    });

    let responseText = completion.choices[0].message.content
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .replace(/```/g, '')
      .trim();

    const parsed = JSON.parse(responseText);
    res.json({ success: true, data: parsed });

  } catch (error) {
    console.error('Consciousness Mapping Error:', error);
    res.status(500).json({
      error: 'Could not complete consciousness mapping. Please try again.',
      details: error.message
    });
  }
});

// Specific endpoint for synchronicity engine
app.post('/api/synchronicity', async (req, res) => {
  try {
    const { interest } = req.body;

    if (!interest?.trim()) {
      return res.status(400).json({ error: 'Interest is required' });
    }

    if (!openai) {
      return res.status(503).json({ error: 'AI service not configured' });
    }

    const prompt = `You are a synchronicity engine. The user is exploring: "${interest}"

Generate 5 meaningful "coincidences" that feel serendipitous and perfectly timed:
- 2 book/resource recommendations with brief insight why they're perfect right now
- 1 practice/exercise to embody this learning
- 1 question to contemplate
- 1 person archetype they might benefit from connecting with

Make it feel magical but not contrived. Like the universe is winking at them.

Respond ONLY with valid JSON in this exact format:
{
  "resources": [{"title": "title", "insight": "why now"}],
  "practice": "embodied practice description",
  "question": "contemplation question",
  "connection": "type of person to seek out"
}`;

    const completion = await openai.chat.completions.create({
      model: MODEL_NAME,
      messages: [
        { role: 'system', content: 'RESPOND ONLY WITH VALID JSON. NO OTHER TEXT. NO MARKDOWN FORMATTING.' },
        { role: 'user', content: prompt }
      ]
    });

    let responseText = completion.choices[0].message.content
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .replace(/```/g, '')
      .trim();

    const parsed = JSON.parse(responseText);
    res.json({ success: true, data: parsed });

  } catch (error) {
    console.error('Synchronicity Error:', error);
    res.status(500).json({
      error: 'Could not generate synchronicities. Please try again.',
      details: error.message
    });
  }
});

// Specific endpoint for ancient wisdom
app.post('/api/wisdom', async (req, res) => {
  try {
    const { situation } = req.body;

    if (!situation?.trim()) {
      return res.status(400).json({ error: 'Situation is required' });
    }

    if (!openai) {
      return res.status(503).json({ error: 'AI service not configured' });
    }

    const prompt = `You are a bridge between ancient wisdom and modern life. The user's situation: "${situation}"

Draw from diverse traditions (Buddhist, Stoic, Indigenous, Taoist, Sufi, etc.) to offer:
1. A teaching/principle that speaks to this moment
2. A practice they can do today (meditation, breathwork, movement, ritual)
3. A reframe that shifts perspective
4. The tradition/lineage you're honoring

Be specific and practical while honoring depth. Make ancient wisdom accessible without diluting it.

Respond ONLY with valid JSON in this exact format:
{
  "teaching": "the principle or teaching",
  "practice": "specific practice with instructions",
  "reframe": "new way to see their situation",
  "tradition": "tradition name and brief context"
}`;

    const completion = await openai.chat.completions.create({
      model: MODEL_NAME,
      messages: [
        { role: 'system', content: 'RESPOND ONLY WITH VALID JSON. NO OTHER TEXT. NO MARKDOWN FORMATTING.' },
        { role: 'user', content: prompt }
      ]
    });

    let responseText = completion.choices[0].message.content
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .replace(/```/g, '')
      .trim();

    const parsed = JSON.parse(responseText);
    res.json({ success: true, data: parsed });

  } catch (error) {
    console.error('Wisdom Error:', error);
    res.status(500).json({
      error: 'Could not retrieve wisdom. Please try again.',
      details: error.message
    });
  }
});

// Specific endpoint for shadow integration
app.post('/api/shadow', async (req, res) => {
  try {
    const { shadowPrompt } = req.body;

    if (!shadowPrompt?.trim()) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    if (!openai) {
      return res.status(503).json({ error: 'AI service not configured' });
    }

    const prompt = `You are a shadow integration guide. Trauma-informed, culturally sensitive, deeply compassionate.

The user shared: "${shadowPrompt}"

Offer:
1. A gentle reflection on what might be in their shadow/blind spot
2. Why this pattern might have formed (protective function)
3. A safe question to explore it further
4. A compassionate reframe
5. When to seek professional support (be clear about limits)

Be gentle but honest. Create safety while inviting growth.

Respond ONLY with valid JSON in this exact format:
{
  "reflection": "gentle observation of shadow/pattern",
  "origin": "why this might have formed",
  "explorationQuestion": "safe question to sit with",
  "reframe": "compassionate reframe",
  "seekSupport": "when to consider therapy/professional help"
}`;

    const completion = await openai.chat.completions.create({
      model: MODEL_NAME,
      messages: [
        { role: 'system', content: 'RESPOND ONLY WITH VALID JSON. NO OTHER TEXT. NO MARKDOWN FORMATTING.' },
        { role: 'user', content: prompt }
      ]
    });

    let responseText = completion.choices[0].message.content
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .replace(/```/g, '')
      .trim();

    const parsed = JSON.parse(responseText);
    res.json({ success: true, data: parsed });

  } catch (error) {
    console.error('Shadow Work Error:', error);
    res.status(500).json({
      error: 'Could not complete shadow integration. Please try again.',
      details: error.message
    });
  }
});

// Specific endpoint for consciousness feed
app.post('/api/feed', async (req, res) => {
  try {
    if (!openai) {
      return res.status(503).json({ error: 'AI service not configured' });
    }

    const prompt = `Generate 6 diverse consciousness-related news items across these categories:
- Science (consciousness research, neuroscience breakthroughs)
- Movement (global movements toward wellbeing, collective practices)
- Wisdom (teachings from thought leaders, timeless insights)
- Transformation (personal growth stories, breakthrough moments)
- Environment (nature healing, ecological consciousness)
- Technology (tech serving consciousness, ethical AI)

Each item should have:
- A compelling title
- A brief summary (2-3 sentences)
- A deeper insight (what this means for consciousness)
- An action step (how to engage with this)

Respond ONLY with valid JSON in this exact format:
[
  {
    "category": "science|movement|wisdom|transformation|environment|technology",
    "title": "compelling headline",
    "summary": "brief overview",
    "insight": "deeper meaning",
    "action": "concrete action step"
  }
]`;

    const completion = await openai.chat.completions.create({
      model: MODEL_NAME,
      messages: [
        { role: 'system', content: 'RESPOND ONLY WITH VALID JSON. NO OTHER TEXT. NO MARKDOWN FORMATTING.' },
        { role: 'user', content: prompt }
      ]
    });

    let responseText = completion.choices[0].message.content
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .replace(/```/g, '')
      .trim();

    const parsed = JSON.parse(responseText);
    res.json({ success: true, data: parsed });

  } catch (error) {
    console.error('Feed Error:', error);
    res.status(500).json({
      error: 'Could not load feed. Please try again.',
      details: error.message
    });
  }
});

// Specific endpoint for daily intentions
app.post('/api/intention', async (req, res) => {
  try {
    if (!openai) {
      return res.status(503).json({ error: 'AI service not configured' });
    }

    const prompt = `Generate a personalized daily intention for consciousness elevation. Include:
1. A core intention/theme for the day
2. A morning practice (3-5 minutes)
3. A midday check-in prompt
4. An evening reflection question

Make it profound yet practical, elevated yet grounded.

Respond ONLY with valid JSON in this exact format:
{
  "intention": "core intention for today",
  "morning": "brief morning practice",
  "midday": "check-in prompt",
  "evening": "reflection question"
}`;

    const completion = await openai.chat.completions.create({
      model: MODEL_NAME,
      messages: [
        { role: 'system', content: 'RESPOND ONLY WITH VALID JSON. NO OTHER TEXT. NO MARKDOWN FORMATTING.' },
        { role: 'user', content: prompt }
      ]
    });

    let responseText = completion.choices[0].message.content
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .replace(/```/g, '')
      .trim();

    const parsed = JSON.parse(responseText);
    res.json({ success: true, data: parsed });

  } catch (error) {
    console.error('Intention Error:', error);
    res.status(500).json({
      error: 'Could not generate intention. Please try again.',
      details: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Something went wrong. Our servers are having a moment. Take a breath and try again? 🌬️',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "We can't find that endpoint. Maybe it never existed. Maybe it's a metaphor. 🤷",
    path: req.path
  });
});

// Start server
app.listen(PORT, () => {
  console.log('✨');
  console.log('🌟 Resonance Backend Server');
  console.log(`📡 Running on http://localhost:${PORT}`);
  console.log(`🤖 AI Status: ${openai ? 'Ready (Perplexity)' : 'Not configured'}`);
  console.log('🧘 Press Ctrl+C to stop');
  console.log('✨');
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🙏 Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🙏 Shutting down gracefully...');
  process.exit(0);
});
