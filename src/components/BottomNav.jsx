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
        background: '#FFFFFF',
        borderTop: '1px solid #F0F0F0',
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
            {/* Active indicator */}
            {isActive && (
              <motion.div
                layoutId="nav-dot"
                className="absolute -top-px left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full"
                style={{ background: '#C8960C' }}
              />
            )}

            <motion.div
              animate={{ color: isActive ? '#C8960C' : '#9CA3AF', scale: isActive ? 1.05 : 1 }}
              transition={{ duration: 0.18 }}
            >
              <Icon
                size={22}
                strokeWidth={isActive ? 2 : 1.5}
                fill={isActive && id === 'growth' ? '#C8960C' : 'none'}
              />
            </motion.div>

            <motion.span
              animate={{ color: isActive ? '#C8960C' : '#9CA3AF' }}
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
