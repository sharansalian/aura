import { motion } from 'framer-motion'
import { BadgeCheck, Flame, Edit3, Settings, ChevronRight, Shield, Bell } from 'lucide-react'

const STATS = [
  { label: 'Streak', value: '3🔥', color: '#fb923c' },
  { label: 'Matches', value: '12', color: '#F0D696' },
  { label: 'Aura XP', value: '840', color: '#4DB1A7' },
]

const SETTINGS_ROWS = [
  { icon: Shield, label: 'Privacy & Safety' },
  { icon: Bell, label: 'Notifications' },
  { icon: Settings, label: 'Preferences' },
]

export default function ProfileScreen() {
  return (
    <div className="flex flex-col h-full pt-12 pb-0 overflow-y-auto hide-scrollbar">
      {/* Header */}
      <div className="flex items-center justify-between px-5 mb-5">
        <h1 className="text-xl font-bold text-white">Profile</h1>
        <button className="w-9 h-9 rounded-full glass flex items-center justify-center">
          <Settings size={16} className="text-white/50" />
        </button>
      </div>

      {/* Avatar + info */}
      <div className="flex flex-col items-center px-5 mb-6">
        {/* Avatar orb */}
        <div className="relative mb-4">
          <motion.div
            animate={{ boxShadow: ['0 0 20px rgba(240,214,150,0.3)', '0 0 40px rgba(240,214,150,0.5)', '0 0 20px rgba(240,214,150,0.3)'] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="w-24 h-24 rounded-full overflow-hidden"
            style={{ border: '2px solid rgba(240,214,150,0.5)' }}
          >
            <div className="w-full h-full bg-gradient-to-br from-auraGold/20 to-auraNavyLight flex items-center justify-center">
              <span className="text-4xl">✦</span>
            </div>
          </motion.div>
          {/* Edit badge */}
          <button
            className="absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #F0D696, #c8a84b)' }}
          >
            <Edit3 size={13} className="text-auraNavy" />
          </button>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-xl font-bold text-white">You</h2>
            <BadgeCheck size={18} style={{ color: '#4DB1A7' }} fill="rgba(77,177,167,0.2)" />
          </div>
          <div
            className="inline-flex items-center gap-1.5 mt-1.5 px-3 py-1 rounded-full text-xs font-semibold"
            style={{ background: 'rgba(240,214,150,0.1)', border: '1px solid rgba(240,214,150,0.25)', color: '#F0D696' }}
          >
            Divine Feminine
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2.5 px-5 mb-5">
        {STATS.map(({ label, value, color }) => (
          <div
            key={label}
            className="rounded-2xl p-3 text-center"
            style={{ background: 'rgba(15,31,61,0.6)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <p className="text-lg font-bold" style={{ color }}>{value}</p>
            <p className="text-[10px] text-white/30 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Aura score */}
      <div
        className="mx-5 mb-5 p-4 rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(240,214,150,0.08), rgba(77,177,167,0.04))',
          border: '1px solid rgba(240,214,150,0.12)',
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold text-white">Aura Score</p>
          <span className="text-xs font-bold text-auraGold">Luminous</span>
        </div>
        <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '68%' }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, #4DB1A7, #F0D696)',
              boxShadow: '0 0 8px rgba(240,214,150,0.5)',
            }}
          />
        </div>
        <p className="text-[10px] text-white/30 mt-2">
          Maintain your daily habits to unlock <span className="text-auraGold">Radiant</span> status.
        </p>
      </div>

      {/* Settings rows */}
      <div className="px-5 flex flex-col gap-2 mb-6">
        {SETTINGS_ROWS.map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="flex items-center gap-3 p-3.5 rounded-2xl active:scale-[0.98] transition-all"
            style={{ background: 'rgba(15,31,61,0.5)', border: '1px solid rgba(255,255,255,0.05)' }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(240,214,150,0.08)' }}
            >
              <Icon size={15} className="text-auraGold/70" />
            </div>
            <span className="flex-1 text-sm text-white/70 text-left">{label}</span>
            <ChevronRight size={15} className="text-white/20" />
          </button>
        ))}
      </div>
    </div>
  )
}
