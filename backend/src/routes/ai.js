const express = require('express')
const router = express.Router()
const { authenticateToken } = require('../middleware/auth')

// Minimal Gemini proxy using fetch; expects process.env.GEMINI_API_KEY
router.post('/suggestions', authenticateToken, async (req, res) => {
  try {
    const { topic = 'ayurveda daily suggestions', persona = 'patient' } = req.body || {}
    const key = process.env.GEMINI_API_KEY
    
    // Provide fallback suggestions if no API key
    if (!key) {
      console.warn('GEMINI_API_KEY not configured, using fallback suggestions')
      const fallbackTips = getFallbackSuggestions(persona)
      return res.json({ success: true, tips: fallbackTips })
    }

    const prompt = `Generate 4 concise Ayurveda tips for ${persona}. Topic: ${topic}. Keep each tip under 15 words, no numbering, no emojis.`

    // Using Google Generative Language API text endpoint
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + encodeURIComponent(key)

    const body = {
      contents: [{ parts: [{ text: prompt }] }]
    }

    // Reduced timeout for faster response
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 6000)
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
        console.warn('Gemini request timed out, using fallback')
        const fallbackTips = getFallbackSuggestions(persona)
        return res.json({ success: true, tips: fallbackTips })
      }
      throw err
    } finally {
      clearTimeout(timeout)
    }

    if (!resp.ok) {
      console.warn('Gemini API failed, using fallback suggestions')
      const fallbackTips = getFallbackSuggestions(persona)
      return res.json({ success: true, tips: fallbackTips })
    }

    const data = await resp.json()
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || ''
    const tips = text
      .split(/\r?\n/)
      .map(s => s.replace(/^[\-•\d\.\)\s]+/, '').trim())
      .filter(Boolean)
      .slice(0, 4)

    // If no tips generated, use fallback
    if (tips.length === 0) {
      const fallbackTips = getFallbackSuggestions(persona)
      return res.json({ success: true, tips: fallbackTips })
    }

    return res.json({ success: true, tips })
  } catch (e) {
    console.error('AI suggestions error:', e)
    // Always provide fallback instead of error
    const fallbackTips = getFallbackSuggestions(req.body?.persona || 'patient')
    return res.json({ success: true, tips: fallbackTips })
  }
})

// Fallback suggestions function
function getFallbackSuggestions(persona) {
  const suggestions = {
    'patient vata': [
      'Warm oil massage before bed calms Vata dosha naturally.',
      'Eat warm, cooked meals and avoid cold, raw foods.',
      'Establish a regular sleep schedule before 10 PM.',
      'Practice gentle yoga and meditation daily.'
    ],
    'patient pitta': [
      'Cooling foods like cucumber and mint balance Pitta.',
      'Avoid spicy, fried foods during hot weather.',
      'Take breaks in shade during peak sun hours.',
      'Practice cooling breathing exercises and meditation.'
    ],
    'patient kapha': [
      'Light, warm foods with spices stimulate Kapha.',
      'Regular exercise and movement prevent stagnation.',
      'Wake up before 6 AM for optimal energy.',
      'Include ginger and turmeric in your daily routine.'
    ],
    'practitioner': [
      'Review patient dosha assessments before consultations.',
      'Document treatment progress and symptom changes.',
      'Schedule follow-ups based on treatment response.',
      'Maintain detailed notes for personalized care plans.'
    ]
  }

  return suggestions[persona.toLowerCase()] || suggestions['patient vata']
}

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
    const { messages = [], context = {} } = req.body || {}
    
    // Provide fallback response if no API key
    if (!key) {
      console.warn('GEMINI_API_KEY not configured, using fallback response')
      const fallbackReply = getFallbackChatResponse(messages[messages.length - 1]?.content || '')
      return res.json({ success: true, reply: fallbackReply })
    }

    const system = `You are AyurSutra's Ayurveda assistant. Be concise, practical, and supportive. Avoid medical claims. Use simple Markdown. Keep answers under 200 words. Context: ${JSON.stringify(context)}`

    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + encodeURIComponent(key)

    const parts = []
    parts.push({ text: system })
    for (const m of messages.slice(-6)) { // Only send last 6 messages to reduce payload
      parts.push({ text: `${m.role.toUpperCase()}: ${m.content}` })
    }

    const body = { contents: [{ parts }] }

    // Reduced timeout for faster response
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8000)
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
        console.warn('Gemini chat timed out, using fallback')
        const fallbackReply = getFallbackChatResponse(messages[messages.length - 1]?.content || '')
        return res.json({ success: true, reply: fallbackReply })
      }
      throw err
    } finally {
      clearTimeout(timeout)
    }

    if (!resp.ok) {
      console.warn('Gemini chat failed, using fallback response')
      const fallbackReply = getFallbackChatResponse(messages[messages.length - 1]?.content || '')
      return res.json({ success: true, reply: fallbackReply })
    }

    const data = await resp.json()
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response.'
    return res.json({ success: true, reply })
  } catch (e) {
    console.error('AI chat error:', e)
    // Always provide fallback instead of error
    const fallbackReply = getFallbackChatResponse(req.body?.messages?.[req.body.messages.length - 1]?.content || '')
    return res.json({ success: true, reply: fallbackReply })
  }
})

// Fallback chat response function
function getFallbackChatResponse(userMessage) {
  const lowerMessage = (userMessage || '').toLowerCase()
  
  if (lowerMessage.includes('diet') || lowerMessage.includes('food')) {
    return 'For personalized dietary advice, I recommend consulting with your Ayurvedic practitioner. They can provide specific recommendations based on your dosha constitution and current health status.'
  }
  
  if (lowerMessage.includes('routine') || lowerMessage.includes('schedule')) {
    return 'A balanced daily routine (dinacharya) is essential for optimal health. Consider waking up early, practicing oil massage, eating meals at regular times, and maintaining a consistent sleep schedule.'
  }
  
  if (lowerMessage.includes('symptoms') || lowerMessage.includes('pain')) {
    return 'If you\'re experiencing concerning symptoms, please consult with your healthcare provider or Ayurvedic practitioner for proper assessment and treatment.'
  }
  
  if (lowerMessage.includes('dosha') || lowerMessage.includes('constitution')) {
    return 'Understanding your dosha constitution is fundamental to Ayurveda. Consider taking our assessment to discover your dominant dosha and receive personalized recommendations.'
  }
  
  return 'I\'m here to help with your Ayurvedic journey. For personalized guidance, please consult with your practitioner who can provide recommendations based on your specific constitution and needs.'
}

module.exports = router


