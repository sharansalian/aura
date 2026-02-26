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
      style={{ background: 'rgba(255,255,255,0.94)', backdropFilter: 'blur(16px)' }}
    >
      <div className="relative flex flex-col items-center text-center gap-5 w-full max-w-[280px]">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <p className="text-xs tracking-[0.3em] uppercase font-semibold mb-1" style={{ color: '#2BA99B' }}>
            It's a Match
          </p>
          <h2 className="text-3xl font-bold" style={{ color: '#111827' }}>Divine Connection</h2>
        </motion.div>

        {/* Avatar orbs */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="flex items-center justify-center relative"
        >
          {/* You */}
          <div
            className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center relative z-10"
            style={{ border: '2.5px solid #C8960C', boxShadow: '0 4px 20px rgba(200,150,12,0.25)', background: '#FBF7EC' }}
          >
            <span className="text-3xl">✦</span>
          </div>

          {/* Connector */}
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center -mx-3 z-20"
            style={{ background: '#FBF7EC', border: '1.5px solid #E8C87A' }}
          >
            <span style={{ color: '#C8960C', fontSize: 18, lineHeight: 1 }}>∞</span>
          </div>

          {/* Match */}
          <div
            className="w-24 h-24 rounded-full overflow-hidden relative z-10"
            style={{ border: '2.5px solid #2BA99B', boxShadow: '0 4px 20px rgba(43,169,155,0.25)' }}
          >
            <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover" />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="text-sm leading-relaxed"
          style={{ color: '#6B7280' }}
        >
          You and <span className="font-semibold" style={{ color: '#111827' }}>{profile.name}</span> have aligned auras.
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
            className="w-full py-3.5 rounded-2xl font-semibold text-white flex items-center justify-center gap-2"
            style={{ background: '#C8960C' }}
          >
            <MessageCircle size={17} />
            Send a Message
          </button>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl text-sm font-medium flex items-center justify-center gap-1.5"
            style={{ background: '#F5F5F7', color: '#6B7280', border: '1px solid #EBEBEB' }}
          >
            <X size={14} />
            Keep Exploring
          </button>
        </motion.div>
      </div>
    </motion.div>
  )
}
