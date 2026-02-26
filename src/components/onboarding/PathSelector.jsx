import { motion } from 'framer-motion'

const PATHS = [
  {
    id: 'masculine',
    label: 'Divine Masculine',
    emoji: '⚡',
    description: 'Strength, integrity, and grounded presence.',
    color: '#4DB1A7',
    glow: 'rgba(77,177,167,0.3)',
  },
  {
    id: 'feminine',
    label: 'Divine Feminine',
    emoji: '🌙',
    description: 'Radiance, intuition, and sacred energy.',
    color: '#F0D696',
    glow: 'rgba(240,214,150,0.3)',
  },
  {
    id: 'kin',
    label: 'Kin',
    emoji: '∞',
    description: 'Beyond duality — pure connected soul.',
    color: '#a78bfa',
    glow: 'rgba(167,139,250,0.3)',
  },
]

export default function PathSelector({ selected, onSelect }) {
  return (
    <div className="flex flex-col gap-3 w-full">
      {PATHS.map((path, i) => {
        const isSelected = selected === path.id
        return (
          <motion.button
            key={path.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            onClick={() => onSelect(path.id)}
            className="relative flex items-center gap-4 p-4 rounded-2xl text-left transition-all active:scale-[0.98]"
            style={{
              background: isSelected
                ? `linear-gradient(135deg, ${path.glow}, rgba(15,31,61,0.8))`
                : 'rgba(15,31,61,0.5)',
              border: `1.5px solid ${isSelected ? path.color : 'rgba(255,255,255,0.06)'}`,
              boxShadow: isSelected ? `0 0 24px ${path.glow}` : 'none',
            }}
          >
            {/* Orb icon */}
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
              style={{
                background: `radial-gradient(circle, ${path.glow} 0%, rgba(5,11,24,0.8) 100%)`,
                border: `1px solid ${isSelected ? path.color : 'rgba(255,255,255,0.1)'}`,
                boxShadow: isSelected ? `0 0 20px ${path.glow}` : 'none',
              }}
            >
              {path.emoji}
            </div>

            <div className="flex-1">
              <p className="font-semibold text-sm" style={{ color: isSelected ? path.color : 'white' }}>
                {path.label}
              </p>
              <p className="text-xs text-white/40 mt-0.5">{path.description}</p>
            </div>

            {/* Checkmark */}
            {isSelected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: path.color }}
              >
                <span className="text-auraNavy text-xs font-bold">✓</span>
              </motion.div>
            )}
          </motion.button>
        )
      })}
    </div>
  )
}
