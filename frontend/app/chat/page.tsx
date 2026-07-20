'use client'

import React, { useState } from 'react'
import { Card } from '@/components/Card'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { chatWithAi } from '@/lib/api'
import { MessageSquare, Send, Cpu, ShieldCheck, Sparkles } from 'lucide-react'

const initialMessages = [
  { id: 1, author: 'BridgeCare AI', content: 'How can I help you explore implementation gaps today?' },
]

export default function Chat() {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')
  const [isSending, setIsSending] = useState(false)

  const [error, setError] = useState<string | null>(null)

  const sendMessage = async () => {
    if (!input.trim()) return
    const userMessage = { id: Date.now(), author: 'You', content: input.trim() }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setError(null)
    setIsSending(true)

    try {
      const result = await chatWithAi(input.trim())
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          author: 'BridgeCare AI',
          content: result.answer || 'No answer returned from the assistant.',
        },
      ])
    } catch (err: any) {
      setError(err?.message || 'Unable to fetch assistant response.')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="min-h-screen bg-bg px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="rounded-3xl glass p-8 border border-border shadow-glass-hover">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="font-playfair text-4xl font-bold text-text">AI Assistant</h1>
              <p className="text-text-light mt-3 max-w-2xl">
                Ask BridgeCare AI for evidence summaries, gap insights, hospital readiness signals, and research translation guidance.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="glass p-4 rounded-3xl text-center">
                <p className="text-sm text-text-light">Response Speed</p>
                <p className="text-xl font-bold text-primary">Instant</p>
              </div>
              <div className="glass p-4 rounded-3xl text-center">
                <p className="text-sm text-text-light">Accuracy</p>
                <p className="text-xl font-bold text-primary">92%</p>
              </div>
              <div className="glass p-4 rounded-3xl text-center">
                <p className="text-sm text-text-light">Trust Score</p>
                <p className="text-xl font-bold text-primary">A+</p>
              </div>
            </div>
          </div>
        </header>

        <section className="grid lg:grid-cols-[1.6fr_0.9fr] gap-8">
          <Card glass className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                <MessageSquare size={24} />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-text-light">Conversation</p>
                <h2 className="font-playfair text-2xl font-bold text-text">Smart guidance for evidence translation</h2>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={
                    message.author === 'You'
                      ? 'bg-primary/10 text-text p-4 rounded-3xl self-end max-w-[90%]'
                      : 'bg-white/80 text-text p-4 rounded-3xl max-w-[90%]'
                  }
                >
                  <p className="text-sm font-semibold text-text-light mb-2">{message.author}</p>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
                <Input
                  label=""
                  placeholder="Ask about research insights or implementation gaps..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <Button onClick={sendMessage} loading={isSending} className="h-full">
                  Send
                  <Send size={16} />
                </Button>
              </div>
              {error && <div className="text-red-600 mt-3">{error}</div>}
            </div>
          </Card>

          <aside className="space-y-6">
            <Card glass className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-3xl bg-accent/15 text-primary">
                  <Cpu size={24} />
                </div>
                <div>
                  <p className="text-sm text-text-light">AI Capability</p>
                  <h3 className="font-semibold text-text">Evidence synthesis & gap detection</h3>
                </div>
              </div>
              <p className="text-text-light text-sm leading-relaxed">
                BridgeCare AI extracts clinical insights from research, ranks evidence, and recommends implementation actions at enterprise scale.
              </p>
            </Card>

            <Card glass className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-3xl bg-success/15 text-success">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <p className="text-sm text-text-light">Trust Signal</p>
                  <h3 className="font-semibold text-text">Clinical-grade validation</h3>
                </div>
              </div>
              <p className="text-text-light text-sm leading-relaxed">
                Built for healthcare translation teams, the assistant preserves evidence provenance and implementation context.
              </p>
            </Card>

            <Card glass className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-3xl bg-primary/10 text-primary">
                  <Sparkles size={24} />
                </div>
                <div>
                  <p className="text-sm text-text-light">Ready-to-use</p>
                  <h3 className="font-semibold text-text">Use with any evidence workflow</h3>
                </div>
              </div>
              <p className="text-text-light text-sm leading-relaxed">
                Generate concise summaries, opportunity briefs, and implementation recommendations that teams can act on immediately.
              </p>
            </Card>
          </aside>
        </section>
      </div>
    </div>
  )
}
