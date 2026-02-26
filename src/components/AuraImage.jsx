import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, Sparkles } from 'lucide-react'

/**
 * AuraImage — reusable image component with blur/reveal logic.
 * Photos stay blurred until a "Reveal" is triggered (match logic).
 */
export default function AuraImage({ src, alt = 'Aura', revealed = false, onReveal, className = '' }) {
  const [localRevealed, setLocalRevealed] = useState(revealed)
  const [isRevealing, setIsRevealing] = useState(false)

  const handleReveal = async () => {
    if (localRevealed || isRevealing) return
    setIsRevealing(true)
    await new Promise(r => setTimeout(r, 100))
    setLocalRevealed(true)
    setIsRevealing(false)
    onReveal?.()
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Base image */}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        draggable={false}
      />

      {/* Blur overlay — fades out on reveal */}
      <AnimatePresence>
        {!localRevealed && (
          <motion.div
            key="blur-overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="absolute inset-0"
            style={{ backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
          >
            {/* Subtle orb behind blur */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-auraGold/10 blur-2xl animate-pulse" />
            </div>

            {/* Reveal CTA */}
            {onReveal !== undefined && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    background: 'radial-gradient(circle, rgba(240,214,150,0.3), rgba(240,214,150,0.05))',
                    border: '1.5px solid rgba(240,214,150,0.5)',
                    boxShadow: '0 0 30px rgba(240,214,150,0.3)',
                  }}
                >
                  <Eye size={22} className="text-auraGold" />
                </motion.div>
                <button
                  onClick={handleReveal}
                  disabled={isRevealing}
                  className="px-6 py-2 rounded-full text-sm font-semibold text-auraNavy transition-all active:scale-95"
                  style={{
                    background: 'linear-gradient(135deg, #F0D696, #c8a84b)',
                    boxShadow: '0 0 20px rgba(240,214,150,0.4)',
                  }}
                >
                  {isRevealing ? 'Revealing…' : 'Reveal Aura'}
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Revealed sparkle flash */}
      <AnimatePresence>
        {localRevealed && (
          <motion.div
            key="reveal-flash"
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 2 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <Sparkles size={48} className="text-auraGold" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
