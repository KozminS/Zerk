'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Loader2, CheckCircle2, Calendar } from 'lucide-react'
import { GoogleGenerativeAI } from '@google/generative-ai'
import ChatCarousel, { Attachment } from './ChatCarousel'

type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
  attachments?: Attachment[]
  isBookingConfirm?: boolean
}

const SYSTEM_PROMPT = `
You are Алина, a real estate consultant at «Премьер Эстейт» in Moscow. You're texting a potential client on WhatsApp — keep it SHORT, warm, and natural. Like a real person, not a brochure.

RESPONSE RULES (CRITICAL):
- MAX 3 sentences per reply for normal conversation. Be punchy.
- Use casual Russian. Contractions, natural flow.
- NEVER use numbered lists or bullet points in normal chat
- Ask only ONE question at a time
- Mirror the client's energy — if they're brief, be brief
- Use emojis sparingly (max 1-2 per message, only when natural)

PROPERTY CATALOGUE (10 listings):
1. «Серебряный бор» — 3BR, 112м², ЖК Резиденция Бор, Moscow River views
   Price: 42 000 000 ₽ | Floor 14/24 | Terrace 18м² | Smart home
   Address: ул. Таманская, 3, Москва
   Photos: https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800
   Extra photos: https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&q=80&w=800, https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800

2. «Пресня Сити» — 2BR апартаменты, 78м², башня Меркурий, Москва-Сити
   Price: 28 500 000 ₽ | Floor 31/75 | Panoramic city views | Concierge 24/7
   Address: 1-й Красногвардейский пр-д, 15, Москва
   Photos: https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800
   Extra photos: https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800, https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=800

3. «Патриарши» — 4BR пентхаус, 198м², Патриаршие пруды
   Price: 95 000 000 ₽ | Duplex | Roof terrace 60м² | Private lift
   Address: Малый Патриарший пер., 5, Москва
   Photos: https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800
   Extra photos: https://images.unsplash.com/photo-1600607687939-ce8a6d450957?auto=format&fit=crop&q=80&w=800, https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800

4. «Хамовники Ривер» — 2BR, 67м², ЖК Берег, Хамовники
   Price: 19 800 000 ₽ | Floor 8/12 | River view | SPA & kids club
   Address: Саввинская наб., 23, Москва
   Photos: https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=80&w=800
   Extra photos: https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=800, https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&q=80&w=800

5. «Арбат Классик» — 3BR, 94м², Старый Арбат, 3.2м потолки
   Price: 31 000 000 ₽ | Floor 5/6 | Walnut parquet | Historic building post-reno
   Address: ул. Арбат, 44, Москва
   Photos: https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800
   Extra photos: https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=800, https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=800

6. «Раменки Парк» — 2BR, 68м², ЖК Дом на Мосфильмовской
   Price: 22 000 000 ₽ | Floor 9/18 | Park views | Closed territory
   Address: Мосфильмовская ул., 70, Москва
   Photos: https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800
   Extra photos: https://images.unsplash.com/photo-1585128792020-803d29415281?auto=format&fit=crop&q=80&w=800

7. «Тверская Плаза» — апартаменты 55м², Тверской район
   Price: 24 500 000 ₽ | Floor 12/22 | City center | Fully furnished
   Address: ул. Тверская, 18, Москва
   Photos: https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800
   Extra photos: https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800

8. «Крылатское Хиллс» — 4BR, 145м², Крылатское, лес
   Price: 58 000 000 ₽ | Floor 3/7 | Forest view | Garage | Pool in complex
   Address: Осенний бул., 4, Москва
   Photos: https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&q=80&w=800
   Extra photos: https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&q=80&w=800

9. «Замоскворечье Лофт» — студия 42м², исторический центр, лофт
   Price: 14 800 000 ₽ | Floor 2/5 | 4м потолки | Brick walls | Heart of Moscow
   Address: ул. Пятницкая, 27, Москва
   Photos: https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=800
   Extra photos: https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800

10. «Остоженка» — 3BR пентхаус 160м², Золотая миля
    Price: 115 000 000 ₽ | Top floor | Terrace 40м² | Moscow Kremlin views
    Address: ул. Остоженка, 11, Москва
    Photos: https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800
    Extra photos: https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80&w=800

CONVERSATION FUNNEL:
1. DISCOVER → ask 1-2 quick questions about budget/district/purpose
2. SHOW → only show carousel when they ASK to see properties. Use JSON block.
3. DEEP DIVE → when they click "Подробнее" on a card or name a property, ask: "Что показать — больше фото, адрес на карте или расскажу подробнее?" Then respond to their choice naturally
4. LEAD → after 3-4 exchanges, warmly ask for name + phone/email
5. BOOK → once you have contact, offer to book a meeting, then confirm with JSON

WHEN TO USE JSON:
A) User wants to SEE properties → use type:"show_properties"
B) User wants MORE PHOTOS of a specific property → use type:"show_properties" with multiple image attachments of that property
C) User wants the LOCATION → use type:"show_properties" with location attachment
D) Booking confirmed → use type:"booking_confirmed"

FORMAT (JSON appended AFTER text, NEVER before):
For properties/photos:
\`\`\`json
{"type":"show_properties","attachments":[{"type":"image","url":"URL","title":"Name","price":"XX ₽"},{"type":"location","title":"Name","address":"Full address","price":"XX ₽"}]}
\`\`\`

For booking:
\`\`\`json
{"type":"booking_confirmed","clientName":"Name","datetime":"Date time","contact":"email or phone"}
\`\`\`
`

type BookingInfo = { clientName: string; datetime: string; contact: string }

export default function InteractiveChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Привет! Я Алина из «Премьер Эстейт» 👋\n\nПомогаю найти недвижимость в Москве — от уютных апартаментов до пентхаусов. Что ищете?',
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [bookingInfo, setBookingInfo] = useState<BookingInfo | null>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const prevMsgCount = useRef(1)

  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || ''
  const noKey = !apiKey || apiKey === 'your_api_key_here'

  // Smart scroll: only scroll down when a NEW message is added and user is near bottom
  useEffect(() => {
    const container = messagesContainerRef.current
    if (!container) return
    if (messages.length <= prevMsgCount.current) {
      prevMsgCount.current = messages.length
      return
    }
    prevMsgCount.current = messages.length

    const distFromBottom = container.scrollHeight - container.scrollTop - container.clientHeight
    if (distFromBottom < 200) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 80)
    }
  }, [messages])

  const parseAndAddAIMessage = useCallback((text: string) => {
    let finalContent = text
    let attachments: Attachment[] = []
    let isBookingConfirm = false

    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/)
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[1])
        finalContent = text.replace(jsonMatch[0], '').trim()
        if (parsed.type === 'show_properties') {
          attachments = parsed.attachments || []
        } else if (parsed.type === 'booking_confirmed') {
          isBookingConfirm = true
          setBookingInfo({ clientName: parsed.clientName, datetime: parsed.datetime, contact: parsed.contact })
        }
      } catch (e) {
        console.error('JSON parse error', e)
      }
    }

    setMessages(prev => [...prev, {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: finalContent,
      attachments: attachments.length > 0 ? attachments : undefined,
      isBookingConfirm,
    }])
  }, [])

  const callGemini = useCallback(async (userText: string, currentMessages: Message[]) => {
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
    const context = currentMessages.map(m => `${m.role === 'user' ? 'Client' : 'Alina'}: ${m.content}`).join('\n')
    const result = await model.generateContent(
      `${SYSTEM_PROMPT}\n\n--- CHAT ---\n${context}\nClient: ${userText}\nAlina:`
    )
    return result.response.text()
  }, [apiKey])

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading || noKey) return

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text }
    let snapshot: Message[] = []
    setMessages(prev => {
      snapshot = [...prev, userMsg]
      return snapshot
    })
    setInput('')
    setIsLoading(true)

    try {
      // snapshot may not be updated yet in closure, so build it manually
      const currentMessages = [...messages, userMsg]
      const responseText = await callGemini(text, currentMessages)
      parseAndAddAIMessage(responseText)
    } catch (err: any) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Упс, что-то пошло не так 😅 ${err.message || ''}`,
      }])
    } finally {
      setIsLoading(false)
    }
  }, [isLoading, noKey, messages, callGemini, parseAndAddAIMessage])

  // Called when user clicks "Подробнее" on a carousel card
  const handleViewDetails = useCallback((propertyTitle: string) => {
    sendMessage(`Хочу узнать подробнее о «${propertyTitle}» — что можете показать?`)
  }, [sendMessage])

  const quickChips = ['Показать варианты', 'До 30 млн ₽', 'Москва-Сити', 'Инвестиции']

  return (
    <div className="flex flex-col h-[680px] w-full max-w-2xl bg-[#0d0d10] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="p-4 bg-white/[0.03] border-b border-white/5 flex items-center gap-3 shrink-0">
        <div className="relative">
          <div className="w-11 h-11 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent font-bold text-sm">
            АЛ
          </div>
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-[#0d0d10]" />
        </div>
        <div>
          <h3 className="text-white font-semibold text-sm">Алина · Премьер Эстейт</h3>
          <p className="text-white/40 text-xs">Персональный консультант · Онлайн</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-white/50 text-[11px]">gemini-2.5-flash</span>
        </div>
      </div>

      {/* No key banner */}
      {noKey && (
        <div className="mx-4 mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs shrink-0">
          ⚠️ Добавьте ключ в <code className="bg-white/10 px-1 rounded">.env.local</code> → <code className="bg-white/10 px-1 rounded">NEXT_PUBLIC_GEMINI_API_KEY=ваш_ключ</code> и перезапустите сервер.
        </div>
      )}

      {/* Messages */}
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                m.role === 'user'
                  ? 'bg-accent text-[#0c0c0f] rounded-tr-none font-medium'
                  : 'bg-white/[0.06] text-white border border-white/[0.06] rounded-tl-none'
              }`}
            >
              <p className="whitespace-pre-wrap">{m.content}</p>
            </div>

            {/* Carousel */}
            {m.attachments && m.attachments.length > 0 && (
              <div className="mt-3 w-full">
                <p className="text-white/25 text-[10px] mb-2 ml-5">
                  {m.attachments.length} {m.attachments.length === 1 ? 'объект' : 'объекта'} · используйте стрелки для листания
                </p>
                <ChatCarousel items={m.attachments} onViewDetails={handleViewDetails} />
              </div>
            )}

            {/* Booking card */}
            {m.isBookingConfirm && bookingInfo && (
              <motion.div
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mt-3 w-full max-w-[85%] bg-accent/10 border border-accent/20 rounded-2xl p-4"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-4 h-4 text-accent" />
                  <span className="text-accent text-sm font-semibold">Встреча забронирована</span>
                  <CheckCircle2 className="w-4 h-4 text-accent ml-auto" />
                </div>
                <div className="space-y-1 text-xs text-white/60">
                  <p><span className="text-white/30">Клиент:</span> {bookingInfo.clientName}</p>
                  <p><span className="text-white/30">Время:</span> {bookingInfo.datetime}</p>
                  <p><span className="text-white/30">Контакт:</span> {bookingInfo.contact}</p>
                </div>
                <p className="text-white/25 text-[10px] mt-3 italic">* Агент вышлет приглашение на ваш email</p>
              </motion.div>
            )}
          </motion.div>
        ))}

        {/* Typing indicator */}
        {isLoading && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex items-start">
            <div className="bg-white/[0.06] px-4 py-3 rounded-2xl rounded-tl-none border border-white/[0.06] flex items-center gap-2">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="block w-1.5 h-1.5 rounded-full bg-accent/60"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.12, ease: 'easeInOut' }}
                />
              ))}
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick chips */}
      <div className="px-4 pb-2 flex gap-2 overflow-x-auto shrink-0" style={{ scrollbarWidth: 'none' }}>
        {quickChips.map((q) => (
          <button
            key={q}
            onClick={() => sendMessage(q)}
            disabled={isLoading || noKey}
            className="shrink-0 text-[11px] bg-white/5 hover:bg-white/10 border border-white/10 text-white/50 hover:text-white px-3 py-1.5 rounded-full transition-all disabled:opacity-30 whitespace-nowrap"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="p-3 bg-white/[0.02] border-t border-white/5 shrink-0">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
            placeholder="Напишите сообщение..."
            className="flex-1 bg-white/5 border border-white/10 text-white text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-accent/40 transition-colors placeholder:text-white/25"
            disabled={isLoading || noKey}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={isLoading || noKey || !input.trim()}
            className="w-11 h-11 bg-accent text-[#0c0c0f] flex items-center justify-center rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-40 disabled:hover:scale-100 shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
