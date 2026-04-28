'use client'
import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const COURSES = [
  { code: 'SBS 201', name: 'Financial Accounting', lecturer: 'Prof. Mwangi', progress: 72 },
  { code: 'SBS 102', name: 'Business Statistics',  lecturer: 'Prof. Kariuki', progress: 45 },
  { code: 'SBS 110', name: 'Principles of Management', lecturer: 'Dr. Omondi', progress: 58 },
  { code: 'ECO 201', name: 'Microeconomics',       lecturer: 'Dr. Njagi',   progress: 30 },
]

const QUICK_TOPICS: Record<string, string[]> = {
  'SBS 201': ['Explain depreciation methods', 'What is the accounting equation?', 'How do I prepare a trial balance?', 'Quiz me on accruals', 'Give me a past paper question'],
  'SBS 102': ['Explain standard deviation', 'What is hypothesis testing?', 'Quiz me on probability', 'How do I run a regression?', 'Explain the normal distribution'],
  'SBS 110': ['Explain Maslow\'s hierarchy', 'What is transformational leadership?', 'Quiz me on planning', 'Explain corporate governance', 'What is Herzberg\'s theory?'],
  'ECO 201': ['Explain price elasticity', 'What is a production possibility frontier?', 'Quiz me on market structures', 'Explain game theory basics', 'What is consumer surplus?'],
}

const WELCOME: Record<string, string> = {
  'SBS 201': "Hi! I'm your **Study Companion** for **Financial Accounting (SBS 201)**. All my answers are grounded in Prof. Mwangi's course materials and Strathmore's suLMS content.\n\nWhat would you like to work through today?",
  'SBS 102': "Hi! I'm your **Study Companion** for **Business Statistics (SBS 102)**. I can walk you through concepts from Prof. Kariuki's course, generate practice questions, and help you interpret statistical output.\n\nWhat topic are you working on?",
  'SBS 110': "Hi! I'm your **Study Companion** for **Principles of Management (SBS 110)**. I'll help you navigate Dr. Omondi's course — from management theory to Kenyan case studies.\n\nWhat would you like to explore?",
  'ECO 201': "Hi! I'm your **Study Companion** for **Microeconomics (ECO 201)**. I'm grounded in Dr. Njagi's course content and can help with theory, diagrams, and Kenyan market applications.\n\nWhat shall we work through?",
}

function renderMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br/>')
}

export default function StudyCompanion() {
  const [selectedCourse, setSelectedCourse] = useState(COURSES[0])
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: WELCOME['SBS 201'] },
  ])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const selectCourse = (course: typeof COURSES[0]) => {
    setSelectedCourse(course)
    setMessages([{ role: 'assistant', content: WELCOME[course.code] }])
  }

  const sendMessage = async (text?: string) => {
    const content = text || input.trim()
    if (!content || isStreaming) return
    setInput('')

    const newMessages: Message[] = [...messages, { role: 'user', content }]
    setMessages(newMessages)
    setIsStreaming(true)

    // Add empty assistant message to stream into
    setMessages(prev => [...prev, { role: 'assistant', content: '' }])

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
          courseCode: selectedCourse.code,
        }),
      })

      if (!res.ok) throw new Error('API error')

      const reader = res.body!.getReader()
      const decoder = new TextDecoder()
      let accumulated = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        accumulated += decoder.decode(value, { stream: true })
        setMessages(prev => {
          const updated = [...prev]
          updated[updated.length - 1] = { role: 'assistant', content: accumulated }
          return updated
        })
      }
    } catch (err) {
      setMessages(prev => {
        const updated = [...prev]
        updated[updated.length - 1] = {
          role: 'assistant',
          content: 'I\'m having trouble connecting right now. Please check that your ANTHROPIC_API_KEY is set in your environment variables, then try again.',
        }
        return updated
      })
    } finally {
      setIsStreaming(false)
    }
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex h-full overflow-hidden">
      {/* Sidebar */}
      <aside
        className="w-72 flex-shrink-0 overflow-y-auto p-4"
        style={{ background: '#fff', borderRight: '1px solid #E2E8F0' }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest mb-3 px-1" style={{ color: '#94A3B8' }}>
          My Courses
        </p>
        <div className="flex flex-col gap-1 mb-5">
          {COURSES.map(c => (
            <button
              key={c.code}
              onClick={() => selectCourse(c)}
              className="text-left p-3 rounded-xl transition-all"
              style={{
                background: selectedCourse.code === c.code ? '#E6F5F2' : 'transparent',
                border: `1px solid ${selectedCourse.code === c.code ? 'rgba(15,123,105,0.2)' : 'transparent'}`,
                cursor: 'pointer',
              }}
            >
              <div className="text-sm font-medium" style={{ color: '#0F172A' }}>{c.name}</div>
              <div className="text-xs mt-0.5" style={{ color: '#64748B' }}>{c.code} · {c.lecturer}</div>
              <div className="mt-2 h-1 rounded-full" style={{ background: '#F1F5F9' }}>
                <div
                  className="h-1 rounded-full transition-all"
                  style={{ width: `${c.progress}%`, background: '#0F7B69' }}
                />
              </div>
            </button>
          ))}
        </div>

        <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '16px' }}>
          <p className="text-xs font-semibold uppercase tracking-widest mb-3 px-1" style={{ color: '#94A3B8' }}>
            Quick Topics
          </p>
          <div className="flex flex-wrap gap-1.5">
            {(QUICK_TOPICS[selectedCourse.code] || []).map(t => (
              <button
                key={t}
                onClick={() => sendMessage(t)}
                className="text-xs px-2.5 py-1.5 rounded-lg transition-all"
                style={{
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  color: '#475569',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => {
                  (e.target as HTMLElement).style.borderColor = '#0F7B69'
                  ;(e.target as HTMLElement).style.color = '#0F7B69'
                  ;(e.target as HTMLElement).style.background = '#E6F5F2'
                }}
                onMouseLeave={e => {
                  (e.target as HTMLElement).style.borderColor = '#E2E8F0'
                  ;(e.target as HTMLElement).style.color = '#475569'
                  ;(e.target as HTMLElement).style.background = '#F8FAFC'
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* suLMS badge */}
        <div
          className="mt-6 p-3 rounded-xl text-xs"
          style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span
              className="w-2 h-2 rounded-full animate-pulse-dot"
              style={{ background: '#0F7B69' }}
            />
            <span className="font-medium" style={{ color: '#0F172A' }}>suLMS integration</span>
          </div>
          <p style={{ color: '#64748B', lineHeight: '1.5' }}>
            Grounded in Strathmore's elearning.strathmore.edu course materials.
          </p>
        </div>
      </aside>

      {/* Chat */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Chat header */}
        <div
          className="flex items-center justify-between px-6 py-3.5 flex-shrink-0"
          style={{ background: '#fff', borderBottom: '1px solid #E2E8F0' }}
        >
          <div>
            <h2 className="text-sm font-semibold" style={{ color: '#0F172A' }}>
              {selectedCourse.name} — {selectedCourse.code}
            </h2>
            <p className="text-xs mt-0.5" style={{ color: '#64748B' }}>
              Grounded in {selectedCourse.lecturer}'s course materials · suLMS integration active
            </p>
          </div>
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold"
            style={{ background: '#E6F5F2', color: '#0F7B69' }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse-dot" style={{ background: '#0F7B69' }} />
            CurriculumAI Active
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 animate-fade-up ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-semibold text-white"
                style={{ background: msg.role === 'assistant' ? '#0F7B69' : '#0D1B2A' }}
              >
                {msg.role === 'assistant' ? 'CA' : 'SK'}
              </div>
              <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : ''}`}>
                <span
                  className="text-xs font-semibold mb-1 px-1"
                  style={{ color: '#94A3B8', letterSpacing: '0.3px' }}
                >
                  {msg.role === 'assistant' ? 'CURRICULUMAI' : 'YOU'}
                </span>
                <div
                  className="max-w-xl text-sm leading-relaxed chat-prose"
                  style={{
                    background: msg.role === 'assistant' ? '#fff' : '#0D1B2A',
                    color: msg.role === 'assistant' ? '#1E293B' : '#fff',
                    border: msg.role === 'assistant' ? '1px solid #E2E8F0' : 'none',
                    borderRadius: msg.role === 'assistant' ? '4px 12px 12px 12px' : '12px 4px 12px 12px',
                    padding: '12px 16px',
                  }}
                >
                  {msg.role === 'assistant' && msg.content === '' && isStreaming ? (
                    <span className="flex gap-1.5 items-center py-0.5">
                      <span className="thinking-dot" />
                      <span className="thinking-dot" />
                      <span className="thinking-dot" />
                    </span>
                  ) : (
                    <p
                      className="chat-prose"
                      dangerouslySetInnerHTML={{
                        __html: `<p>${renderMarkdown(msg.content)}</p>`,
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div
          className="flex-shrink-0 px-6 pb-5 pt-3"
          style={{ background: '#fff', borderTop: '1px solid #E2E8F0' }}
        >
          {/* Suggestion chips */}
          <div className="flex gap-2 flex-wrap mb-3">
            {['Give me a past paper question', 'Use a Kenyan business example', 'Quiz me on this topic', 'Summarise key points'].map(s => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="text-xs px-3 py-1.5 rounded-lg transition-all"
                style={{
                  background: '#fff',
                  border: '1px solid #E2E8F0',
                  color: '#475569',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => {
                  (e.target as HTMLElement).style.borderColor = '#0F7B69'
                  ;(e.target as HTMLElement).style.color = '#0F7B69'
                }}
                onMouseLeave={e => {
                  (e.target as HTMLElement).style.borderColor = '#E2E8F0'
                  ;(e.target as HTMLElement).style.color = '#475569'
                }}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="flex gap-2 items-end">
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              rows={1}
              placeholder={`Ask anything from your ${selectedCourse.name} course...`}
              className="flex-1 resize-none text-sm rounded-xl px-4 py-2.5 outline-none transition-all"
              style={{
                border: '1px solid #CBD5E1',
                background: '#F8FAFC',
                color: '#0F172A',
                fontFamily: 'DM Sans, sans-serif',
                maxHeight: '100px',
              }}
              onFocus={e => {
                e.target.style.borderColor = '#0F7B69'
                e.target.style.background = '#fff'
              }}
              onBlur={e => {
                e.target.style.borderColor = '#CBD5E1'
                e.target.style.background = '#F8FAFC'
              }}
            />
            <button
              onClick={() => sendMessage()}
              disabled={isStreaming || !input.trim()}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white transition-all flex-shrink-0"
              style={{
                background: isStreaming || !input.trim() ? '#CBD5E1' : '#0F7B69',
                cursor: isStreaming || !input.trim() ? 'not-allowed' : 'pointer',
                border: 'none',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
