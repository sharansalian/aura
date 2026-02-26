import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'

const HABITS = [
  {
    id: 'movement',
    icon: '🏃',
    title: '7-Min Movement',
    description: 'Daily physical activation ritual.',
  },
  {
    id: 'grooming',
    icon: '✨',
    title: 'Sacred Grooming',
    description: 'Honour your body as a temple.',
  },
  {
    id: 'integrity',
    icon: '🛡️',
    title: 'Integrity Vow',
    description: 'No-Porn / No-Betrayal pact with yourself.',
  },
]

export default function HabitVow({ vowed, onToggle }) {
  const allVowed = HABITS.every(h => vowed.includes(h.id))

  return (
    <div className="flex flex-col gap-3 w-full">
      {HABITS.map((habit, i) => {
        const isVowed = vowed.includes(habit.id)
        return (
          <motion.button
            key={habit.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12, duration: 0.4 }}
            onClick={() => onToggle(habit.id)}
            className="flex items-center gap-4 p-4 rounded-2xl text-left transition-all active:scale-[0.98]"
            style={{
              background: isVowed
                ? 'linear-gradient(135deg, rgba(240,214,150,0.12), rgba(15,31,61,0.8))'
                : 'rgba(15,31,61,0.5)',
              border: `1.5px solid ${isVowed ? 'rgba(240,214,150,0.4)' : 'rgba(255,255,255,0.06)'}`,
            }}
          >
            <span className="text-2xl">{habit.icon}</span>

            <div className="flex-1">
              <p className={`font-semibold text-sm ${isVowed ? 'text-auraGold' : 'text-white'}`}>
                {habit.title}
              </p>
              <p className="text-xs text-white/40 mt-0.5">{habit.description}</p>
            </div>

            {/* Checkbox */}
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
              style={{
                background: isVowed ? 'linear-gradient(135deg, #F0D696, #c8a84b)' : 'transparent',
                border: `1.5px solid ${isVowed ? 'transparent' : 'rgba(255,255,255,0.2)'}`,
                boxShadow: isVowed ? '0 0 12px rgba(240,214,150,0.5)' : 'none',
              }}
            >
              <AnimatePresence>
                {isVowed && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Check size={12} strokeWidth={3} className="text-auraNavy" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.button>
        )
      })}

      {allVowed && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-xs font-medium mt-1"
          style={{ color: '#4DB1A7' }}
        >
          Your vow is sacred. Welcome to Aura.
        </motion.p>
      )}
    </div>
  )
}

export { HABITS }
