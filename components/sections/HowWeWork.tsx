'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const INTERVAL = 4000

// ── Hook: count up from 0 → target (skip = already seen, go to final instantly) ──

function useCountUp(target: number, delayMs = 0, duration = 1000, skip = false) {
  const [value, setValue] = useState(skip ? target : 0)
  useEffect(() => {
    if (skip) { setValue(target); return }
    setValue(0)
    const timer = setTimeout(() => {
      const start = Date.now()
      const tick = () => {
        const elapsed = Date.now() - start
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setValue(Math.round(target * eased))
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, delayMs)
    return () => clearTimeout(timer)
  }, [target, delayMs, duration, skip])
  return value
}

// ── Chart primitives ───────────────────────────────────────────────

function AnimatedSparkline({ delay = 0, fv = true }: { delay?: number; fv?: boolean }) {
  return (
    <svg viewBox="0 0 100 28" fill="none" className="w-full h-7">
      <motion.path
        d="M0 18 C12 22, 20 10, 32 14 C44 18, 50 8, 64 12 C78 16, 88 6, 100 10"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="1.5"
        fill="none"
        initial={fv ? { pathLength: 0, opacity: 0 } : false}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: fv ? 1.2 : 0, delay: fv ? delay : 0, ease: 'easeOut' }}
      />
    </svg>
  )
}

function AnimatedAreaChart({ fv = true }: { fv?: boolean }) {
  return (
    <div className="relative overflow-hidden w-full h-20">
      <motion.div
        className="w-full h-full"
        initial={fv ? { clipPath: 'inset(0 100% 0 0)' } : false}
        animate={{ clipPath: 'inset(0 0% 0 0)' }}
        transition={{ duration: fv ? 1.5 : 0, delay: fv ? 0.2 : 0, ease: [0.22, 1, 0.36, 1] }}
      >
        <svg viewBox="0 0 280 90" fill="none" className="w-full h-full">
          <defs>
            <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.22)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
            <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>
          <path d="M0 75 C40 65, 80 55, 120 45 C160 35, 200 25, 280 8 L280 90 L0 90Z" fill="url(#g1)" />
          <path d="M0 75 C40 65, 80 55, 120 45 C160 35, 200 25, 280 8" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none" />
          <path d="M0 85 C40 78, 80 70, 120 62 C160 54, 200 42, 280 25 L280 90 L0 90Z" fill="url(#g2)" />
        </svg>
      </motion.div>
    </div>
  )
}

function BarChart() {
  const bars = [0.45, 0.6, 0.38, 0.72, 0.55, 0.8, 0.65, 0.78, 0.6, 0.88, 0.7, 1]
  return (
    <div className="flex items-end gap-[3px] h-20">
      {bars.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-t-[2px]"
          style={{
            height: `${h * 100}%`,
            backgroundColor: i === bars.length - 1 ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.12)',
          }}
        />
      ))}
    </div>
  )
}

// ── Icons ──────────────────────────────────────────────────────────

const icons = {
  marketing: (
    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
      <path d="M2 12 L5 8 L8 10 L11 5 L14 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
      <path d="M8 2L9.5 6H14L10.5 8.5L12 12.5L8 10L4 12.5L5.5 8.5L2 6H6.5L8 2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  ),
  finance: (
    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
      <rect x="2" y="5" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M5 8h6M5 11h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
}

// ── Progress rows ──────────────────────────────────────────────────

function ProgressRow({ label, percent, icon, barColor }: {
  label: string; percent: number; icon: React.ReactNode; barColor: string
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-white/[0.07] flex items-center justify-center shrink-0 text-white/50">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between mb-1.5">
          <span className="text-white/70 text-p-03">{label}</span>
          <span className="text-white/35 text-p-03">{percent}%</span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full rounded-full" style={{ width: `${percent}%`, backgroundColor: barColor }} />
        </div>
      </div>
    </div>
  )
}

function AnimatedProgressRow({ label, percent, icon, barColor, delay = 0, fv = true }: {
  label: string; percent: number; icon: React.ReactNode; barColor: string; delay?: number; fv?: boolean
}) {
  const count = useCountUp(percent, fv ? delay * 1000 : 0, 900, !fv)
  return (
    <motion.div
      className="flex items-center gap-3"
      initial={fv ? { opacity: 0, x: -8 } : false}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: fv ? delay : 0, ease: 'easeOut' }}
    >
      <div className="w-8 h-8 rounded-lg bg-white/[0.07] flex items-center justify-center shrink-0 text-white/50">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between mb-1.5">
          <span className="text-white/70 text-p-03">{label}</span>
          <span className="text-white/35 text-p-03">{count}%</span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            initial={{ width: fv ? 0 : `${percent}%` }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: fv ? 1.0 : 0, delay: fv ? delay + 0.1 : 0, ease: [0.22, 1, 0.36, 1] }}
            style={{ backgroundColor: barColor }}
          />
        </div>
      </div>
    </motion.div>
  )
}

// ── Step 1 ─────────────────────────────────────────────────────────

function MetricCard({ label, value, delay, fv }: { label: string; value: number; delay: number; fv: boolean }) {
  const count = useCountUp(Math.abs(value), fv ? delay * 1000 : 0, 900, !fv)
  return (
    <motion.div
      className="bg-[#0f0f13] border border-white/[0.07] rounded-xl p-3 flex flex-col gap-2"
      initial={fv ? { opacity: 0, y: 12 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: fv ? delay : 0, ease: 'easeOut' }}
    >
      <div className="flex items-center justify-between">
        <span className="text-white/40 text-p-03">{label}</span>
        <span className="text-white/20 text-[10px] border border-white/10 px-1.5 py-0.5 rounded-md">+ Chart</span>
      </div>
      <div className="text-white text-h5 font-semibold">{value < 0 ? '-' : ''}{count}%</div>
      <AnimatedSparkline delay={fv ? delay + 0.1 : 0} fv={fv} />
    </motion.div>
  )
}

function Step1Visual({ fv }: { fv: boolean }) {
  const sales = useCountUp(2430000, fv ? 300 : 0, 1200, !fv)
  return (
    <div className="relative w-full" style={{ height: 300 }}>
      <div className="absolute top-0 left-0" style={{ width: '60%' }}>
        <div className="grid grid-cols-2 gap-2">
          <MetricCard label="Обращения" value={-32} delay={0.05} fv={fv} />
          <MetricCard label="Расходы на лидов" value={-54} delay={0.15} fv={fv} />
        </div>
        <motion.div
          className="mt-2 bg-[#0f0f13] border border-white/[0.07] rounded-xl p-3 flex items-center justify-between"
          initial={fv ? { opacity: 0, y: 12 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: fv ? 0.25 : 0, ease: 'easeOut' }}
        >
          <div>
            <div className="text-white/40 text-p-03 mb-1">Сделки</div>
            <div className="flex items-baseline gap-2">
              <span className="text-white font-semibold">₽{sales.toLocaleString('ru-RU')}</span>
              <span className="text-white/35 text-p-03">−25%</span>
            </div>
          </div>
          <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white/20">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-0 right-0 bg-[#0f0f13] border border-white/[0.07] rounded-xl p-4 flex flex-col gap-3"
        style={{ width: '68%' }}
        initial={fv ? { opacity: 0, y: 12 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: fv ? 0.35 : 0, ease: 'easeOut' }}
      >
        <span className="text-white/60 text-p-03 font-medium">Слабые места</span>
        <AnimatedProgressRow label="Маркетинг и реклама" percent={32} icon={icons.marketing} barColor="#6366f1" delay={0.4} fv={fv} />
        <AnimatedProgressRow label="ИИ-автоматизация" percent={14} icon={icons.ai} barColor="#4f46e5" delay={0.55} fv={fv} />
        <AnimatedProgressRow label="Финансовый учёт" percent={44} icon={icons.finance} barColor="#7c3aed" delay={0.7} fv={fv} />
      </motion.div>
    </div>
  )
}

// ── Step 2 ─────────────────────────────────────────────────────────

function Step2Visual({ fv }: { fv: boolean }) {
  return (
    <div className="relative w-full" style={{ height: 300 }}>
      <motion.div
        className="absolute top-0 left-0 bg-[#0f0f13] border border-white/[0.07] rounded-xl p-4"
        style={{ width: '58%' }}
        initial={fv ? { opacity: 0, y: 12 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: fv ? 0.05 : 0, ease: 'easeOut' }}
      >
        <div className="flex justify-between items-center mb-3">
          <span className="text-white/40 text-p-03">Активность</span>
          <span className="text-white/25 text-p-03">Месяц</span>
        </div>
        <BarChart />
        <div className="flex gap-6 mt-3 pt-3 border-t border-white/[0.06]">
          <div>
            <div className="text-white/35 text-[10px] uppercase tracking-wide mb-0.5">Пользователи</div>
            <div className="text-white font-semibold text-p-02">3 600</div>
          </div>
          <div>
            <div className="text-white/35 text-[10px] uppercase tracking-wide mb-0.5">Обращения</div>
            <div className="text-white font-semibold text-p-02">2 100</div>
          </div>
        </div>
      </motion.div>

      {/* Code snippet — slow auto-scroll (always animates as it's ambient) */}
      <motion.div
        className="absolute bottom-0 right-0 bg-[#08080b] border border-white/[0.07] rounded-xl overflow-hidden font-mono"
        style={{ width: '68%' }}
        initial={fv ? { opacity: 0, y: 12 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: fv ? 0.2 : 0, ease: 'easeOut' }}
      >
        <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/[0.05]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          <span className="text-white/25 text-[10px] ml-2">zerk-integration.js</span>
        </div>
        <div className="overflow-hidden" style={{ height: 178 }}>
          <motion.div
            className="px-4 py-3 text-p-03 leading-[1.75]"
            animate={{ y: [0, -200, 0] }}
            transition={{ duration: 9, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.5 }}
          >
            <div className="text-white/30 mb-1">{'// Обработка входящего лида'}</div>
            <div><span className="text-blue-400">async</span>{' '}<span className="text-yellow-300/80">function</span>{' '}<span className="text-green-400/90">handleLead</span><span className="text-white/50">(data) {'{'}</span></div>
            <div className="pl-4"><span className="text-blue-400">const</span>{' '}<span className="text-white/70">result</span><span className="text-white/50"> = </span><span className="text-blue-400">await</span>{' '}<span className="text-green-400/90">zerk.analyze</span><span className="text-white/50">{'({'}</span></div>
            <div className="pl-8"><span className="text-orange-300/80">client</span><span className="text-white/50">: data.phone,</span></div>
            <div className="pl-8"><span className="text-orange-300/80">source</span><span className="text-white/50">: data.utm,</span></div>
            <div className="pl-8"><span className="text-orange-300/80">intent</span><span className="text-white/50">: </span><span className="text-green-300/80">'buy'</span><span className="text-white/50">,</span></div>
            <div className="pl-4"><span className="text-white/50">{'}'});</span></div>
            <div className="pl-4"><span className="text-blue-400">return</span><span className="text-white/50"> result.nextAction;</span></div>
            <div><span className="text-white/50">{'}'}</span></div>
            <div className="mt-3 text-white/30">{'// Запись на показ'}</div>
            <div><span className="text-blue-400">async</span>{' '}<span className="text-yellow-300/80">function</span>{' '}<span className="text-green-400/90">scheduleViewing</span><span className="text-white/50">(lead) {'{'}</span></div>
            <div className="pl-4"><span className="text-blue-400">const</span>{' '}<span className="text-white/70">slot</span><span className="text-white/50"> = </span><span className="text-blue-400">await</span>{' '}<span className="text-green-400/90">calendar.findSlot</span><span className="text-white/50">{'({'}</span></div>
            <div className="pl-8"><span className="text-orange-300/80">date</span><span className="text-white/50">: lead.preferredDate,</span></div>
            <div className="pl-8"><span className="text-orange-300/80">agent</span><span className="text-white/50">: </span><span className="text-green-300/80">'auto'</span><span className="text-white/50">,</span></div>
            <div className="pl-4"><span className="text-white/50">{'}'});</span></div>
            <div className="pl-4"><span className="text-blue-400">await</span>{' '}<span className="text-green-400/90">crm.createEvent</span><span className="text-white/50">{'({'}</span></div>
            <div className="pl-8"><span className="text-orange-300/80">leadId</span><span className="text-white/50">: lead.id,</span></div>
            <div className="pl-8"><span className="text-orange-300/80">slotId</span><span className="text-white/50">: slot.id,</span></div>
            <div className="pl-8"><span className="text-orange-300/80">notify</span><span className="text-white/50">: </span><span className="text-blue-400">true</span><span className="text-white/50">,</span></div>
            <div className="pl-4"><span className="text-white/50">{'}'});</span></div>
            <div className="pl-4"><span className="text-blue-400">return</span><span className="text-white/50"> slot;</span></div>
            <div><span className="text-white/50">{'}'}</span></div>
          </motion.div>
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#08080b] to-transparent" />
      </motion.div>
    </div>
  )
}

// ── Step 3 ─────────────────────────────────────────────────────────

function Step3Visual({ fv }: { fv: boolean }) {
  return (
    <div className="relative w-full" style={{ height: 300 }}>
      <motion.div
        className="absolute top-0 left-0 bg-[#0f0f13] border border-white/[0.07] rounded-xl p-4"
        style={{ width: '58%' }}
        initial={fv ? { opacity: 0, y: 12 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: fv ? 0.05 : 0, ease: 'easeOut' }}
      >
        <div className="flex justify-between items-center mb-3">
          <span className="text-white/40 text-p-03">Рост</span>
          <span className="text-white/25 text-p-03">Апр — Июн</span>
        </div>
        <AnimatedAreaChart fv={fv} />
        <div className="flex gap-6 mt-3 pt-3 border-t border-white/[0.06]">
          <div>
            <div className="text-white/35 text-[10px] uppercase tracking-wide mb-0.5">Пользователи</div>
            <div className="text-white font-semibold text-p-02">3 600</div>
          </div>
          <div>
            <div className="text-white/35 text-[10px] uppercase tracking-wide mb-0.5">Обращения</div>
            <div className="text-white font-semibold text-p-02">2 100</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-0 right-0 bg-[#0f0f13] border border-white/[0.07] rounded-xl p-4 flex flex-col gap-3"
        style={{ width: '68%' }}
        initial={fv ? { opacity: 0, y: 12 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: fv ? 0.3 : 0, ease: 'easeOut' }}
      >
        <span className="text-white/60 text-p-03 font-medium">Рост эффективности от ИИ</span>
        <AnimatedProgressRow label="Маркетинг и реклама" percent={84} icon={icons.marketing} barColor="#cffe25" delay={0.4} fv={fv} />
        <AnimatedProgressRow label="ИИ-автоматизация" percent={94} icon={icons.ai} barColor="#cffe25" delay={0.55} fv={fv} />
        <AnimatedProgressRow label="Финансовый учёт" percent={88} icon={icons.finance} barColor="#cffe25" delay={0.7} fv={fv} />
      </motion.div>
    </div>
  )
}

// ── Steps config ───────────────────────────────────────────────────

const steps = [
  {
    label: 'ШАГ 1',
    number: '01',
    title: 'Аудит и анализ',
    desc: 'Изучаем ваши текущие процессы, инструменты и клиентскую базу. Находим слабые места и точки для автоматизации. Каждый этап работы агентства становится прозрачным.',
  },
  {
    label: 'ШАГ 2',
    number: '02',
    title: 'Разработка и внедрение',
    desc: 'Создаём ИИ-решения под вашу специфику. Разрабатываем, тестируем и интегрируем чат-бот и колл-центр прямо в вашу CRM, без остановки работы агентства.',
  },
  {
    label: 'ШАГ 3',
    number: '03',
    title: 'Оптимизация и рост',
    desc: 'Отслеживаем ключевые метрики и непрерывно улучшаем систему. По мере роста вашего агентства ИИ масштабируется вместе с ним без доп. затрат.',
  },
]

const Visuals = [Step1Visual, Step2Visual, Step3Visual]

// ── Main component ─────────────────────────────────────────────────

export default function HowWeWork() {
  const [active, setActive] = useState(0)
  const [seenSteps, setSeenSteps] = useState<Set<number>>(new Set())

  // Detect when section enters viewport
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { amount: 0.25, once: false })
  const hasEnteredRef = useRef(false)

  // On first enter: reset to step 0 so animations play from the start
  useEffect(() => {
    if (isInView && !hasEnteredRef.current) {
      hasEnteredRef.current = true
      setActive(0)
      setSeenSteps(new Set())
    }
  }, [isInView])

  // Auto-advance only while section is visible
  useEffect(() => {
    if (!isInView) return
    const advance = setTimeout(() => {
      setActive((prev) => (prev + 1) % steps.length)
    }, INTERVAL)
    const markSeen = setTimeout(() => {
      setSeenSteps((prev) => new Set([...prev, active]))
    }, 1600)
    return () => {
      clearTimeout(advance)
      clearTimeout(markSeen)
    }
  }, [active, isInView])

  const handleTabClick = (i: number) => {
    if (i !== active) setActive(i)
  }

  const Visual = Visuals[active]
  const fv = !seenSteps.has(active)

  return (
    <section id="how-we-work" className="section-padding" ref={sectionRef}>
      <div className="container">
        <div className="mb-10">
          <p className="text-accent text-p-03 font-medium uppercase tracking-widest mb-3">Процесс</p>
          <h2 className="text-h2 font-bold">Как мы работаем</h2>
        </div>

        <div className="bg-card border border-white/[0.07] rounded-2xl p-6 md:p-8">
          {/* Tabs */}
          <div className="grid grid-cols-3 gap-2 mb-8">
            {steps.map((s, i) => (
              <button
                key={i}
                onClick={() => handleTabClick(i)}
                className={`relative rounded-xl py-4 text-center text-p-03 font-medium transition-colors duration-300 overflow-hidden ${
                  i === active
                    ? 'bg-white/[0.08] text-white'
                    : 'bg-white/[0.03] text-white/35 hover:text-white/55 hover:bg-white/[0.05]'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-14 items-center">
            {/* Visual — hidden on mobile, shown from md+ */}
            <div className="hidden md:block order-2 md:order-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.28 }}
                >
                  <Visual fv={fv} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Text */}
            <div className="order-1 md:order-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -14 }}
                  transition={{ duration: 0.28 }}
                  className="flex flex-col gap-5"
                >
                  <span className="text-white/25 font-mono text-p-03">{steps[active].number}</span>
                  <h3 className="text-h3 font-bold">{steps[active].title}</h3>
                  <p className="text-p-01 text-text-grey leading-relaxed">{steps[active].desc}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
