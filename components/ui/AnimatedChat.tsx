'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const messages = [
  { id: 0, from: 'user', text: 'Добрый день! Интересует двушка в ЖК Парковый. Есть варианты?' },
  { id: 1, from: 'ai', text: 'Да, у нас есть 3 свободных варианта. Площадь от 58 до 74 м², цена от 8,2 млн ₽. Когда вам удобно посмотреть?' },
  { id: 2, from: 'user', text: 'В субботу с утра' },
  { id: 3, from: 'ai', text: 'Отлично! Записал вас на 10:00. Менеджер подтвердит показ. 👍' },
]

type Step = { visibleCount: number; typing: 'user' | 'ai' | null }

const SEQUENCE: Step[] = [
  { visibleCount: 0, typing: 'user'  }, // user typing
  { visibleCount: 1, typing: null    }, // user msg appears
  { visibleCount: 1, typing: 'ai'   }, // ai typing
  { visibleCount: 2, typing: null    }, // ai msg appears
  { visibleCount: 2, typing: 'user'  }, // user typing
  { visibleCount: 3, typing: null    }, // user msg appears
  { visibleCount: 3, typing: 'ai'   }, // ai typing
  { visibleCount: 4, typing: null    }, // ai msg appears — pause — restart
]

// how long to stay at each step before advancing
const DURATIONS = [900, 400, 1400, 500, 800, 400, 1500, 3200]

function TypingDots({ from }: { from: 'user' | 'ai' }) {
  const isAI = from === 'ai'
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`flex ${isAI ? 'self-end' : 'self-start'}`}
    >
      <div
        className={`flex items-center gap-1.5 px-4 py-3 rounded-lg ${
          isAI
            ? 'rounded-tr-none bg-accent/20 border border-accent/30'
            : 'rounded-tl-none bg-white/5'
        }`}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className={`block w-1.5 h-1.5 rounded-full ${
              isAI ? 'bg-accent' : 'bg-white/50'
            }`}
            animate={{ y: [0, -5, 0] }}
            transition={{
              duration: 0.55,
              repeat: Infinity,
              delay: i * 0.14,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default function AnimatedChat() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const t = setTimeout(
      () => setStep((s) => (s + 1) % SEQUENCE.length),
      DURATIONS[step],
    )
    return () => clearTimeout(t)
  }, [step])

  const { visibleCount, typing } = SEQUENCE[step]

  return (
    <div className="w-full max-w-sm rounded-xl border border-white/10 bg-bg overflow-hidden">
      {/* Header */}
      <div className="bg-white/5 px-4 py-3 flex items-center gap-3 border-b border-white/5">
        <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
          <span className="text-accent text-p-03 font-bold">Z</span>
        </div>
        <div>
          <p className="text-p-03 font-semibold text-white">Zerk AI</p>
          <p className="text-[11px] text-green-400">● онлайн</p>
        </div>
      </div>

      {/* Messages — fixed height so the widget never resizes */}
      <div className="p-4 flex flex-col justify-start gap-3 overflow-hidden" style={{ height: 340 }}>
        {messages.slice(0, visibleCount).map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={`max-w-[85%] rounded-lg px-3 py-2 ${
              msg.from === 'user'
                ? 'self-start rounded-tl-none bg-white/5'
                : 'self-end rounded-tr-none bg-accent/20 border border-accent/30'
            }`}
          >
            <p className="text-p-03 text-white">{msg.text}</p>
          </motion.div>
        ))}

        <AnimatePresence>
          {typing && <TypingDots key={typing} from={typing} />}
        </AnimatePresence>
      </div>
    </div>
  )
}
