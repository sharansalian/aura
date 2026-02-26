import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, X } from 'lucide-react'
import SwipeCard from './SwipeCard.jsx'
import { PROFILES } from '../data/profiles.js'

export default function CardStack({ onMatch }) {
  const [cards, setCards] = useState(PROFILES)
  const [lastAction, setLastAction] = useState(null)

  const handleSwipe = (id, direction) => {
    setLastAction(direction)
    setCards(prev => prev.filter(c => c.id !== id))
    if (direction === 'connect') {
      const matched = Math.random() > 0.4
      if (matched) {
        const profile = PROFILES.find(p => p.id === id)
        setTimeout(() => onMatch?.(profile), 300)
      }
    }
    setTimeout(() => setLastAction(null), 1200)
  }

  const swipeTop = (direction) => {
    if (cards.length === 0) return
    handleSwipe(cards[0].id, direction)
  }

  if (cards.length === 0) {
    return <EmptyState onReset={() => setCards(PROFILES)} />
  }

  return (
    <div className="flex flex-col flex-1 gap-4 px-4">
      {/* Card area */}
      <div className="relative flex-1" style={{ minHeight: 0 }}>
        <AnimatePresence>
          {cards.slice(0, 3).map((profile, i) => {
            const isTop = i === 0
            const scale = 1 - i * 0.03
            const translateY = i * 10
            return (
              <motion.div
                key={profile.id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale, y: translateY, opacity: 1, zIndex: cards.length - i }}
                exit={{ scale: 0.9, opacity: 0, transition: { duration: 0.2 } }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0"
                style={{ transformOrigin: 'bottom center' }}
              >
                <SwipeCard profile={profile} onSwipe={handleSwipe} isTop={isTop} />
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-center gap-6 pb-2">
        {/* Pass */}
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={() => swipeTop('pass')}
          className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{
            background: '#FFFFFF',
            border: `1.5px solid ${lastAction === 'pass' ? '#EF4444' : '#E5E7EB'}`,
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          }}
        >
          <X size={22} color={lastAction === 'pass' ? '#EF4444' : '#9CA3AF'} strokeWidth={2} />
        </motion.button>

        {/* Connect */}
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={() => swipeTop('connect')}
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{
            background: lastAction === 'connect' ? '#C8960C' : '#FFFFFF',
            border: `1.5px solid ${lastAction === 'connect' ? '#C8960C' : '#E5E7EB'}`,
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          }}
        >
          <Heart
            size={24}
            color={lastAction === 'connect' ? '#FFFFFF' : '#C8960C'}
            fill={lastAction === 'connect' ? '#FFFFFF' : 'none'}
          />
        </motion.button>
      </div>
    </div>
  )
}

function EmptyState({ onReset }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-5 px-8 text-center">
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center"
        style={{ background: '#F5F5F7', border: '1px solid #EBEBEB' }}
      >
        <Heart size={28} color="#D1D5DB" />
      </div>

      <div>
        <h3 className="text-lg font-bold" style={{ color: '#111827' }}>You've seen everyone</h3>
        <p className="text-sm mt-1.5 leading-relaxed" style={{ color: '#9CA3AF' }}>
          Keep up your daily habits to unlock more connections.
        </p>
      </div>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onReset}
        className="px-6 py-3 rounded-2xl font-semibold text-sm text-white"
        style={{ background: '#C8960C' }}
      >
        Refresh
      </motion.button>
    </div>
  )
}
