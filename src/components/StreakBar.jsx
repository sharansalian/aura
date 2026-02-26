import { motion } from 'framer-motion'
import { Flame } from 'lucide-react'

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

export default function StreakBar({ streak = 3 }) {
  const isLow = streak < 4

  return (
    <div
      className="mx-4 rounded-2xl p-3"
      style={{ background: '#F9F9F9', border: '1px solid #EBEBEB' }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <Flame
              size={16}
              color={streak >= 7 ? '#FB923C' : streak >= 4 ? '#C8960C' : '#D1D5DB'}
              fill={streak >= 4 ? 'currentColor' : 'none'}
            />
          </motion.div>
          <span className="text-xs font-semibold" style={{ color: '#374151' }}>
            {streak}-day streak
          </span>
        </div>
        <span className="text-[10px] font-medium" style={{ color: '#2BA99B' }}>
          {streak >= 7 ? '🔥 On Fire!' : streak >= 4 ? 'Keep going!' : ''}
        </span>
      </div>

      {/* Day dots */}
      <div className="flex items-center justify-between gap-1">
        {DAYS.map((day, i) => {
          const filled = i < streak
          return (
            <div key={i} className="flex flex-col items-center gap-1 flex-1">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: filled ? 1 : 0.8 }}
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={
                  filled
                    ? { background: '#C8960C' }
                    : { background: '#F0F0F0', border: '1px solid #E5E5E5' }
                }
              >
                {filled ? (
                  <Flame size={12} color="#FFFFFF" fill="#FFFFFF" />
                ) : (
                  <span className="text-[9px] font-medium" style={{ color: '#9CA3AF' }}>{day}</span>
                )}
              </motion.div>
              <span className="text-[9px]" style={{ color: '#9CA3AF' }}>{day}</span>
            </div>
          )
        })}
      </div>

      {/* Low streak nudge */}
      {isLow && (
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-center text-[10px] italic"
          style={{ color: '#9CA3AF' }}
        >
          Nurture your Aura to unlock more connections.
        </motion.p>
      )}
    </div>
  )
}
