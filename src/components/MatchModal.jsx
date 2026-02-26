import { motion } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'

export default function MatchModal({ profile, onClose, onMessage }) {
  if (!profile) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 flex items-center justify-center p-6"
      style={{ background: 'rgba(5,11,24,0.92)', backdropFilter: 'blur(12px)' }}
    >
      {/* Glow burst */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 40%, rgba(240,214,150,0.5), transparent 60%)' }}
      />

      <div className="relative flex flex-col items-center text-center gap-5 w-full max-w-[280px]">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-auraTeal font-semibold mb-1">
            It's a Match
          </p>
          <h2 className="text-3xl font-bold text-shimmer">Divine Connection</h2>
        </motion.div>

        {/* Avatar orbs */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="flex items-center justify-center gap-[-12px] relative"
        >
          {/* You */}
          <div
            className="w-24 h-24 rounded-full overflow-hidden border-2 relative z-10"
            style={{ borderColor: '#F0D696', boxShadow: '0 0 24px rgba(240,214,150,0.5)' }}
          >
            <div className="w-full h-full bg-gradient-to-br from-auraGold/30 to-auraNavy flex items-center justify-center">
              <span className="text-3xl">✦</span>
            </div>
          </div>

          {/* Orb connector */}
          <div className="w-8 h-8 rounded-full bg-auraGold/20 flex items-center justify-center -mx-3 z-20 border border-auraGold/40">
            <span className="text-auraGold text-lg">∞</span>
          </div>

          {/* Match */}
          <div
            className="w-24 h-24 rounded-full overflow-hidden border-2 relative z-10"
            style={{ borderColor: '#4DB1A7', boxShadow: '0 0 24px rgba(77,177,167,0.5)' }}
          >
            <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover" />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="text-sm text-white/50 leading-relaxed"
        >
          You and <span className="text-white font-semibold">{profile.name}</span> have aligned auras.
          Start the conversation.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="flex flex-col gap-3 w-full"
        >
          <button
            onClick={onMessage}
            className="w-full py-3.5 rounded-2xl font-semibold text-auraNavy flex items-center justify-center gap-2"
            style={{ background: 'linear-gradient(135deg, #F0D696, #c8a84b)', boxShadow: '0 0 24px rgba(240,214,150,0.4)' }}
          >
            <MessageCircle size={17} />
            Send a Message
          </button>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl text-sm text-white/40 font-medium flex items-center justify-center gap-1.5 glass-light"
          >
            <X size={14} />
            Keep Exploring
          </button>
        </motion.div>
      </div>
    </motion.div>
  )
}
