const express = require('express')
const router = express.Router()
const { authenticateToken } = require('../middleware/auth')

// Minimal Gemini proxy using fetch; expects process.env.GEMINI_API_KEY
router.post('/suggestions', authenticateToken, async (req, res) => {
  try {
    const { topic = 'ayurveda daily suggestions', persona = 'patient' } = req.body || {}
    const key = process.env.GEMINI_API_KEY
    if (!key) {
      return res.status(500).json({ success: false, error: 'GEMINI_API_KEY not configured' })
    }

    const prompt = `Generate 5 concise, friendly Ayurveda tips for a ${persona}. Focus on routines, diet, rest. Topic: ${topic}. Keep each tip under 18 words, no numbering, no emojis.`

    // Using Google Generative Language API text endpoint
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + encodeURIComponent(key)

    const body = {
      contents: [{ parts: [{ text: prompt }] }]
    }

    // Add 10s timeout so frontend doesn't hang
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000)
    let resp
    try {
      resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: controller.signal
      })
    } catch (err) {
      if (controller.signal.aborted) {
        return res.status(504).json({ success: false, error: 'Gemini request timed out' })
      }
      throw err
    } finally {
      clearTimeout(timeout)
    }

    if (!resp.ok) {
      const text = await resp.text()
      return res.status(502).json({ success: false, error: 'Gemini request failed', detail: text })
    }

    const data = await resp.json()
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || ''
    const tips = text
      .split(/\r?\n/)
      .map(s => s.replace(/^[\-•\d\.\)\s]+/, '').trim())
      .filter(Boolean)
      .slice(0, 4)

    return res.json({ success: true, tips })
  } catch (e) {
    console.error('AI suggestions error:', e)
    return res.status(500).json({ success: false, error: 'Failed to generate suggestions' })
  }
})

// Generate a tailored treatment plan from assessment results
router.post('/plan', authenticateToken, async (req, res) => {
  try {
    const key = process.env.GEMINI_API_KEY
    if (!key) return res.status(500).json({ success: false, error: 'GEMINI_API_KEY not configured' })

    const {
      scores = { vata: 0, pitta: 0, kapha: 0 },
      dominant,
      insights = [],
      answers = {},
    } = req.body || {}

    const importantInsights = Array.isArray(insights)
      ? insights.map(i => `- ${i.title}: ${i.description}`).join('\n')
      : ''

    const prompt = `You are an Ayurvedic practitioner. Create a concise, safe, evidence-informed 14-day treatment plan.
Inputs:
- Dosha scores: Vata ${scores.vata}%, Pitta ${scores.pitta}%, Kapha ${scores.kapha}%
- Dominant dosha: ${dominant || 'unknown'}
- Key insights:\n${importantInsights || '- None provided'}
- Patient inputs (summarize briefly and infer safely): ${JSON.stringify(answers)}

Output strictly in JSON (no code block, no text before/after):
{"title": string, "summary": string, "plan": string}

Requirements for content:
- Use classical Ayurveda principles in modern, approachable language.
- Structure plan as bullets: Routine (morning, noon, evening), Diet (favor/avoid), Therapies (clinic/home), Herbs (dosage ranges), Lifestyle, Cautions.
- Keep bullets under 18 words. Avoid medical claims. No emojis.`

    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + encodeURIComponent(key)
    const body = { contents: [{ parts: [{ text: prompt }] }] }
    const resp = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    if (!resp.ok) {
      const text = await resp.text()
      return res.status(502).json({ success: false, error: 'Gemini request failed', detail: text })
    }
    const data = await resp.json()
    const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text || ''

    let json
    try {
      json = JSON.parse(raw)
    } catch {
      // Fallback: if model didn't return JSON, wrap as plan text
      return res.json({ success: true, plan: raw, title: '', summary: '' })
    }

    const title = typeof json.title === 'string' ? json.title : ''
    const summary = typeof json.summary === 'string' ? json.summary : ''
    const plan = typeof json.plan === 'string' ? json.plan : ''

    return res.json({ success: true, title, summary, plan })
  } catch (e) {
    console.error('AI plan error:', e)
    return res.status(500).json({ success: false, error: 'Failed to generate plan' })
  }
})

// Multi-turn AI chat for patient support
router.post('/chat', authenticateToken, async (req, res) => {
  try {
    const key = process.env.GEMINI_API_KEY
    if (!key) return res.status(500).json({ success: false, error: 'GEMINI_API_KEY not configured' })

    const { messages = [], context = {} } = req.body || {}
    // messages: [{ role: 'user'|'assistant', content: '...' }, ...]

    const system = `You are AyurSutra's compassionate Ayurveda assistant.
Policies:
- Be supportive, practical, and evidence-informed.
- Avoid medical claims; suggest consulting practitioners when necessary.
- Personalize with dosha context if provided.
- Use simple Markdown: headings, lists, bold. Do not output asterisks as literal; render **bold** as bold.
- Keep answers clear with short paragraphs and concise bullets.
Context JSON (patient, assessment, dashboard snippets): ${JSON.stringify(context)}`

    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + encodeURIComponent(key)

    const parts = []
    parts.push({ text: system })
    for (const m of messages) {
      parts.push({ text: `${m.role.toUpperCase()}: ${m.content}` })
    }

    const body = { contents: [{ parts }] }

    // Timeout to protect frontend
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 12000)
    let resp
    try {
      resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: controller.signal
      })
    } catch (err) {
      if (controller.signal.aborted) {
        return res.status(504).json({ success: false, error: 'Gemini chat timed out' })
      }
      throw err
    } finally {
      clearTimeout(timeout)
    }

    if (!resp.ok) {
      const text = await resp.text()
      return res.status(502).json({ success: false, error: 'Gemini chat failed', detail: text })
    }

    const data = await resp.json()
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response.'
    return res.json({ success: true, reply })
  } catch (e) {
    console.error('AI chat error:', e)
    return res.status(500).json({ success: false, error: 'Failed to chat' })
  }
})

module.exports = router


