import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, X, Star } from 'lucide-react'
import SwipeCard from './SwipeCard.jsx'
import { PROFILES } from '../data/profiles.js'

export default function CardStack({ onMatch }) {
  const [cards, setCards] = useState(PROFILES)
  const [lastAction, setLastAction] = useState(null)

  const handleSwipe = (id, direction) => {
    setLastAction(direction)
    setCards(prev => prev.filter(c => c.id !== id))
    if (direction === 'connect') {
      // Simulate ~50% match rate on connect
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
                animate={{
                  scale,
                  y: translateY,
                  opacity: 1,
                  zIndex: cards.length - i,
                }}
                exit={{
                  scale: 0.9,
                  opacity: 0,
                  transition: { duration: 0.2 },
                }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0"
                style={{ transformOrigin: 'bottom center' }}
              >
                <SwipeCard
                  profile={profile}
                  onSwipe={handleSwipe}
                  isTop={isTop}
                />
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-center gap-5 pb-2">
        {/* Pass */}
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={() => swipeTop('pass')}
          className="w-14 h-14 rounded-full flex items-center justify-center transition-all"
          style={{
            background: 'rgba(239,68,68,0.1)',
            border: '1.5px solid rgba(239,68,68,0.25)',
            boxShadow: lastAction === 'pass' ? '0 0 20px rgba(239,68,68,0.4)' : 'none',
          }}
        >
          <X size={22} className="text-red-400" strokeWidth={2.5} />
        </motion.button>

        {/* Super like */}
        <motion.button
          whileTap={{ scale: 0.88 }}
          className="w-11 h-11 rounded-full flex items-center justify-center"
          style={{
            background: 'rgba(167,139,250,0.1)',
            border: '1.5px solid rgba(167,139,250,0.25)',
          }}
        >
          <Star size={17} className="text-purple-400" fill="rgba(167,139,250,0.3)" />
        </motion.button>

        {/* Connect */}
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={() => swipeTop('connect')}
          className="w-14 h-14 rounded-full flex items-center justify-center transition-all"
          style={{
            background: 'linear-gradient(135deg, rgba(240,214,150,0.2), rgba(77,177,167,0.1))',
            border: '1.5px solid rgba(240,214,150,0.35)',
            boxShadow: lastAction === 'connect' ? '0 0 20px rgba(240,214,150,0.4)' : 'none',
          }}
        >
          <Heart
            size={22}
            className="text-auraGold"
            fill={lastAction === 'connect' ? '#F0D696' : 'none'}
          />
        </motion.button>
      </div>
    </div>
  )
}

function EmptyState({ onReset }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-5 px-8 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-24 h-24 rounded-full flex items-center justify-center"
        style={{
          background: 'radial-gradient(circle, rgba(240,214,150,0.15), rgba(5,11,24,0.8))',
          border: '1.5px solid rgba(240,214,150,0.2)',
        }}
      >
        <span className="text-4xl">✦</span>
      </motion.div>

      <div>
        <h3 className="text-xl font-bold text-white">You've seen everyone</h3>
        <p className="text-sm text-white/40 mt-2 leading-relaxed">
          Maintain your streak to attract more souls into your Aura.
        </p>
      </div>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onReset}
        className="px-6 py-3 rounded-2xl font-semibold text-sm text-auraNavy"
        style={{ background: 'linear-gradient(135deg, #F0D696, #c8a84b)' }}
      >
        Refresh Aura
      </motion.button>
    </div>
  )
}
