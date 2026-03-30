'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'

export type Attachment = {
  type: 'image' | 'location'
  url?: string
  title: string
  address?: string
  price?: string
}

interface ChatCarouselProps {
  items: Attachment[]
  onViewDetails?: (title: string) => void
}

const VISIBLE = 2

export default function ChatCarousel({ items, onViewDetails }: ChatCarouselProps) {
  const [idx, setIdx] = useState(0)

  const canLeft = idx > 0
  const canRight = idx + VISIBLE < items.length
  const totalDots = Math.max(1, items.length - VISIBLE + 1)

  return (
    <div className="relative px-5">
      {/* Left arrow */}
      <AnimatePresence>
        {canLeft && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setIdx(i => i - 1)}
            className="absolute left-0 top-[70px] -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-[#0d0d10] border border-white/20 flex items-center justify-center text-white hover:border-accent/60 hover:text-accent transition-all shadow-xl"
          >
            <ChevronLeft className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Cards */}
      <div className="flex gap-3 overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          {items.slice(idx, idx + VISIBLE).map((item, i) => (
            <motion.div
              key={`${item.title}-${idx + i}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25, delay: i * 0.05 }}
              className="flex-1 min-w-0 bg-white/[0.04] border border-white/10 rounded-xl overflow-hidden group"
            >
              {/* Media area */}
              {item.type === 'image' && item.url ? (
                <div className="relative h-32 w-full overflow-hidden">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  {item.price && (
                    <span className="absolute bottom-2 left-2 text-accent font-bold text-[11px] bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full">
                      {item.price}
                    </span>
                  )}
                </div>
              ) : (
                <div className="h-32 bg-gradient-to-br from-accent/5 to-white/5 flex flex-col items-center justify-center gap-2 border-b border-white/5">
                  <div className="w-9 h-9 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-accent" />
                  </div>
                  {item.address && (
                    <p className="text-white/40 text-[10px] px-3 text-center leading-tight line-clamp-2">
                      {item.address}
                    </p>
                  )}
                </div>
              )}

              {/* Info */}
              <div className="p-3">
                <h4 className="text-white text-[13px] font-semibold truncate">{item.title}</h4>
                {item.type === 'location' && item.price && (
                  <p className="text-accent text-sm font-bold mt-1">{item.price}</p>
                )}
                <button
                  onClick={() => onViewDetails?.(item.title)}
                  className="w-full mt-2.5 flex items-center justify-center gap-1.5 py-1.5 px-3 bg-white/5 hover:bg-accent/10 hover:border-accent/30 border border-white/10 transition-all rounded-lg text-[11px] text-white/60 hover:text-white"
                >
                  <span>Подробнее</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Right arrow */}
      <AnimatePresence>
        {canRight && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setIdx(i => i + 1)}
            className="absolute right-0 top-[70px] -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-[#0d0d10] border border-white/20 flex items-center justify-center text-white hover:border-accent/60 hover:text-accent transition-all shadow-xl"
          >
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Dots */}
      {totalDots > 1 && (
        <div className="flex justify-center gap-1.5 mt-3">
          {Array.from({ length: totalDots }).map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === idx ? 'bg-accent w-5' : 'bg-white/20 w-1.5 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
