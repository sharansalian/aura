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
      style={{ background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(12px)' }}
    >
      <div className="flex flex-col items-center text-center gap-5 w-full max-w-[280px]">
        <motion.div
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <p className="text-xs tracking-widest uppercase font-semibold mb-1" style={{ color: '#2BA99B' }}>
            It's a Match
          </p>
          <h2 className="text-2xl font-bold" style={{ color: '#111827' }}>You connected!</h2>
        </motion.div>

        <motion.div
          initial={{ scale: 0.75, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 220 }}
          className="flex items-center justify-center"
        >
          <div
            className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center"
            style={{ border: '2px solid #E5E7EB', background: '#F5F5F7' }}
          >
            <span className="text-3xl">✦</span>
          </div>
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center -mx-2 z-10"
            style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}
          >
            <span style={{ color: '#C8960C', fontSize: 15, lineHeight: 1 }}>♥</span>
          </div>
          <div
            className="w-24 h-24 rounded-full overflow-hidden"
            style={{ border: '2px solid #E5E7EB' }}
          >
            <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover" />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.32 }}
          className="text-sm leading-relaxed"
          style={{ color: '#6B7280' }}
        >
          You and <span className="font-semibold" style={{ color: '#111827' }}>{profile.name}</span> liked each other.
        </motion.p>

        <motion.div
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.42 }}
          className="flex flex-col gap-2.5 w-full"
        >
          <button
            onClick={onMessage}
            className="w-full py-3.5 rounded-2xl font-semibold text-sm text-white flex items-center justify-center gap-2"
            style={{ background: '#C8960C' }}
          >
            <MessageCircle size={16} />
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
