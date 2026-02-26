import { motion } from 'framer-motion'
import { Compass, Flame, MessageCircle, User } from 'lucide-react'

const tabs = [
  { id: 'explore',  label: 'Explore',  Icon: Compass },
  { id: 'growth',   label: 'Growth',   Icon: Flame },
  { id: 'messages', label: 'Messages', Icon: MessageCircle },
  { id: 'profile',  label: 'Profile',  Icon: User },
]

export default function BottomNav({ active, onChange }) {
  return (
    <nav
      className="absolute bottom-0 left-0 right-0 h-20 flex items-center justify-around px-2 z-40"
      style={{
        background: 'linear-gradient(to top, rgba(5,11,24,0.98), rgba(5,11,24,0.85))',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(240,214,150,0.08)',
      }}
    >
      {tabs.map(({ id, label, Icon }) => {
        const isActive = active === id
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            className="flex flex-col items-center justify-center gap-1 flex-1 py-2 relative transition-all active:scale-90"
          >
            {/* Active indicator dot */}
            {isActive && (
              <motion.div
                layoutId="nav-dot"
                className="absolute -top-1 w-1 h-1 rounded-full bg-auraGold"
                style={{ boxShadow: '0 0 6px rgba(240,214,150,0.8)' }}
              />
            )}

            <motion.div
              animate={{
                color: isActive ? '#F0D696' : 'rgba(255,255,255,0.35)',
                scale: isActive ? 1.1 : 1,
              }}
              transition={{ duration: 0.2 }}
            >
              <Icon
                size={22}
                strokeWidth={isActive ? 2 : 1.5}
                fill={isActive && id === 'growth' ? '#F0D696' : 'none'}
              />
            </motion.div>

            <motion.span
              animate={{ color: isActive ? '#F0D696' : 'rgba(255,255,255,0.35)' }}
              className="text-[10px] font-medium tracking-wide"
            >
              {label}
            </motion.span>
          </button>
        )
      })}
    </nav>
  )
}
