import { motion } from 'framer-motion'
import { Flame } from 'lucide-react'

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

export default function StreakBar({ streak = 3 }) {
  const isLow = streak < 4

  return (
    <div
      className="mx-4 rounded-2xl p-3"
      style={{
        background: 'rgba(15,31,61,0.6)',
        border: '1px solid rgba(240,214,150,0.1)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <Flame
              size={16}
              className={streak >= 7 ? 'text-orange-400' : streak >= 4 ? 'text-auraGold' : 'text-white/30'}
              fill={streak >= 4 ? 'currentColor' : 'none'}
            />
          </motion.div>
          <span className="text-xs font-semibold text-white/70">
            {streak}-day streak
          </span>
        </div>
        <span className="text-[10px] font-medium" style={{ color: '#4DB1A7' }}>
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
                    ? {
                        background: 'linear-gradient(135deg, #F0D696, #c8a84b)',
                        boxShadow: '0 0 12px rgba(240,214,150,0.5)',
                      }
                    : { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }
                }
              >
                {filled ? (
                  <Flame size={12} className="text-auraNavy" fill="#050B18" />
                ) : (
                  <span className="text-[9px] text-white/20 font-medium">{day}</span>
                )}
              </motion.div>
              <span className="text-[9px] text-white/25">{day}</span>
            </div>
          )
        })}
      </div>

      {/* Low streak nudge */}
      {isLow && (
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-center text-[10px] text-white/40 italic"
        >
          Nurture your Aura to unlock more connections.
        </motion.p>
      )}
    </div>
  )
}
