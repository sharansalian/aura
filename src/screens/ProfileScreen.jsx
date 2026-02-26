import { motion } from 'framer-motion'
import { BadgeCheck, Edit3, Settings, ChevronRight, Shield, Bell } from 'lucide-react'

const STATS = [
  { label: 'Streak',  value: '3🔥', color: '#FB923C' },
  { label: 'Matches', value: '12',  color: '#111827' },
  { label: 'Aura XP', value: '840', color: '#2BA99B' },
]

const SETTINGS_ROWS = [
  { icon: Shield,   label: 'Privacy & Safety' },
  { icon: Bell,     label: 'Notifications' },
  { icon: Settings, label: 'Preferences' },
]

export default function ProfileScreen() {
  return (
    <div className="flex flex-col h-full pt-12 pb-0 overflow-y-auto hide-scrollbar" style={{ background: '#FFFFFF' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 mb-5">
        <h1 className="text-xl font-bold" style={{ color: '#111827' }}>Profile</h1>
        <button
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: '#F5F5F7', border: '1px solid #EBEBEB' }}
        >
          <Settings size={16} style={{ color: '#9CA3AF' }} />
        </button>
      </div>

      {/* Avatar + info */}
      <div className="flex flex-col items-center px-5 mb-6">
        <div className="relative mb-4">
          <div
            className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center"
            style={{ background: '#F5F5F7', border: '1.5px solid #E5E7EB' }}
          >
            <span className="text-4xl">✦</span>
          </div>
          <button
            className="absolute bottom-0 right-0 w-7 h-7 rounded-full flex items-center justify-center"
            style={{ background: '#C8960C' }}
          >
            <Edit3 size={12} color="#FFFFFF" />
          </button>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-1.5">
            <h2 className="text-xl font-bold" style={{ color: '#111827' }}>You</h2>
            <BadgeCheck size={17} style={{ color: '#2BA99B' }} />
          </div>
          <div
            className="inline-flex items-center gap-1.5 mt-1.5 px-3 py-1 rounded-full text-xs font-medium"
            style={{ background: '#F5F5F7', border: '1px solid #EBEBEB', color: '#6B7280' }}
          >
            Divine Feminine
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 px-5 mb-5">
        {STATS.map(({ label, value, color }) => (
          <div
            key={label}
            className="rounded-2xl p-3 text-center"
            style={{ background: '#F9F9F9', border: '1px solid #EBEBEB' }}
          >
            <p className="text-lg font-bold" style={{ color }}>{value}</p>
            <p className="text-[10px] mt-0.5" style={{ color: '#9CA3AF' }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Aura score */}
      <div
        className="mx-5 mb-5 p-4 rounded-2xl"
        style={{ background: '#F9F9F9', border: '1px solid #EBEBEB' }}
      >
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold" style={{ color: '#111827' }}>Aura Score</p>
          <span className="text-xs font-semibold" style={{ color: '#C8960C' }}>Luminous</span>
        </div>
        <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: '#E5E7EB' }}>
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '68%' }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
            className="h-full rounded-full"
            style={{ background: '#C8960C' }}
          />
        </div>
        <p className="text-[10px] mt-2" style={{ color: '#9CA3AF' }}>
          Maintain daily habits to reach <span style={{ color: '#C8960C' }}>Radiant</span> status.
        </p>
      </div>

      {/* Settings rows */}
      <div className="px-5 flex flex-col gap-2 mb-6">
        {SETTINGS_ROWS.map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="flex items-center gap-3 p-3.5 rounded-2xl active:scale-[0.98] transition-all"
            style={{ background: '#F9F9F9', border: '1px solid #EBEBEB' }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: '#FFFFFF', border: '1px solid #EBEBEB' }}
            >
              <Icon size={14} style={{ color: '#6B7280' }} />
            </div>
            <span className="flex-1 text-sm text-left" style={{ color: '#374151' }}>{label}</span>
            <ChevronRight size={14} style={{ color: '#D1D5DB' }} />
          </button>
        ))}
      </div>
    </div>
  )
}
