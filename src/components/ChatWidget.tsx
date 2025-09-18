import React from 'react'
import { useAuth } from '../contexts/AuthContext'

const ChatWidget: React.FC = () => {
  const { token, user } = useAuth()
  const [open, setOpen] = React.useState(false)
  const [input, setInput] = React.useState('')
  const [sending, setSending] = React.useState(false)
  const [messages, setMessages] = React.useState<{ role: 'user'|'assistant'; content: string }[]>([
    { role: 'assistant', content: 'Hi! I am your Ayurveda assistant. How can I help you today?' }
  ])

  // Auto-detect Indian languages
  function detectLanguage(text: string): string {
    const hindiPattern = /[\u0900-\u097F]/
    const marathiPattern = /[\u0900-\u097F]/
    const tamilPattern = /[\u0B80-\u0BFF]/
    const teluguPattern = /[\u0C00-\u0C7F]/
    const bengaliPattern = /[\u0980-\u09FF]/
    
    if (hindiPattern.test(text)) return 'hi'
    if (marathiPattern.test(text)) return 'mr'
    if (tamilPattern.test(text)) return 'ta'
    if (teluguPattern.test(text)) return 'te'
    if (bengaliPattern.test(text)) return 'bn'
    return 'en'
  }

  function getApiBase(): string {
    const envUrl = (import.meta.env.VITE_API_URL as string) || ''
    if (envUrl) return envUrl.replace(/\/$/, '')
    const proto = typeof window !== 'undefined' ? window.location.protocol : 'http:'
    return `${proto}//localhost:6969`
  }
  const API_BASE_URL = getApiBase()

  function readLocalAssessment() {
    try {
      const raw = sessionStorage.getItem('assessment_state') || localStorage.getItem('assessment_state')
      if (!raw) return null
      return JSON.parse(raw)
    } catch {
      return null
    }
  }

  async function send() {
    if (!input.trim() || sending) return
    const msg = input.trim()
    const detectedLang = detectLanguage(msg)
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: msg }])
    setSending(true)
    try {
      const context = {
        user: { id: user?.id, name: user?.fullName, role: user?.role },
        assessment: readLocalAssessment(),
      }
      const res = await fetch(`${API_BASE_URL}/api/v1/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ messages: [...messages, { role: 'user', content: msg }], context, lang: detectedLang })
      })
      const data = await res.json()
      // Clamp length for readability on general questions
      let reply: string = data?.reply || 'Sorry, I could not respond.'
      const isGeneral = !/plan|treatment|prescription|dosha|assessment/i.test(reply)
      if (isGeneral && reply.length > 700) {
        reply = reply.slice(0, 680).trimEnd() + '…'
      }
      // Normalize paragraphs and bullets for crisp readability
      reply = reply
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n\n/g, '<br/><br/>')
        .replace(/\n- /g, '<br/>• ')
        .replace(/\* /g, '• ')
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Network issue. Please try again.' }])
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`absolute bottom-14 right-0 transition-all duration-200 ${open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
        <div className="w-[320px] h-[420px] rounded-2xl bg-white/90 backdrop-blur border border-emerald-100 shadow-xl overflow-hidden translate-x-[calc(100%-48px)] sm:translate-x-0 sm:right-0">
          <div className="flex items-center justify-between px-3 py-2 bg-gradient-to-r from-emerald-50 to-green-50 border-b border-emerald-100">
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              <span className="text-[13px] font-medium text-emerald-900">Ayur Assistant</span>
            </div>
            <button onClick={() => setOpen(false)} className="text-slate-600 hover:text-slate-800 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:ring-offset-1 active:scale-95 rounded-md p-1">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
          </div>
          <div className="h-[320px] p-3 overflow-y-auto space-y-2">
            {messages.map((m, i) => (
              <div
                key={`${m.role}-${i}`}
                className={`max-w-[80%] px-3 py-2 rounded-xl text-[13px] leading-relaxed ${m.role === 'user' ? 'ml-auto bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-900 border border-emerald-100'}`}
                dangerouslySetInnerHTML={{ __html: m.content }}
              />
            ))}
            {sending && (
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-100 text-[13px]">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:.15s]"></span>
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:.3s]"></span>
              </div>
            )}
          </div>
          <div className="p-2 border-t border-emerald-100 flex items-center gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') send() }}
              placeholder="Ask about diet, routine, herbs..."
              className="flex-1 text-[13px] rounded-md border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-300 px-2.5 py-2 bg-white/80 transition-all duration-200 hover:border-emerald-300 focus:border-emerald-400"
            />
            <button onClick={send} disabled={sending || !input.trim()} className="inline-flex items-center gap-1.5 text-[12px] px-2.5 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-60 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:ring-offset-1 active:scale-95 hover:shadow-sm disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13"/><path d="M22 2 15 22 11 13 2 9 22 2z"/></svg>
              Send
            </button>
          </div>
        </div>
      </div>
      <button onClick={() => setOpen(v => !v)} className={`rounded-full h-12 w-12 flex items-center justify-center shadow-lg ring-1 ring-emerald-200 bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:ring-offset-2 active:scale-95 hover:shadow-xl ${open ? 'scale-90' : 'scale-100'}`} aria-label="Open chat">
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      </button>
    </div>
  )
}

export default ChatWidget
