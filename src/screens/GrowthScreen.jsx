import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const HABITS = [
  { id: 'movement',   icon: '🏃', title: '7-Min Movement',    xp: 50, category: 'Body' },
  { id: 'grooming',   icon: '✨', title: 'Daily Grooming',    xp: 30, category: 'Body' },
  { id: 'integrity',  icon: '🛡️', title: 'Integrity Vow',     xp: 70, category: 'Mind' },
  { id: 'meditation', icon: '🧘', title: '10-Min Meditation', xp: 60, category: 'Mind' },
  { id: 'journal',    icon: '📓', title: 'Gratitude Journal', xp: 40, category: 'Soul' },
]

const WEEKLY = [
  { day: 'M', done: true },
  { day: 'T', done: true },
  { day: 'W', done: true },
  { day: 'T', done: false },
  { day: 'F', done: false },
  { day: 'S', done: false },
  { day: 'S', done: false },
]

export default function GrowthScreen() {
  const [completed, setCompleted] = useState(['movement', 'grooming'])
  const totalXP = completed.reduce((sum, id) => {
    const h = HABITS.find(h => h.id === id)
    return sum + (h?.xp ?? 0)
  }, 0)
  const maxXP = HABITS.reduce((s, h) => s + h.xp, 0)
  const progress = totalXP / maxXP

  const toggle = (id) => {
    setCompleted(prev => prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id])
  }

  return (
    <div className="flex flex-col h-full pt-12 pb-4 overflow-y-auto hide-scrollbar" style={{ background: '#FFFFFF' }}>
      {/* Header */}
      <div className="px-5 mb-5">
        <h1 className="text-xl font-bold" style={{ color: '#111827' }}>Daily Growth</h1>
        <p className="text-xs mt-0.5" style={{ color: '#9CA3AF' }}>Build your habits. Raise your Aura.</p>
      </div>

      {/* XP Progress card */}
      <div
        className="mx-5 mb-5 rounded-2xl p-4"
        style={{ background: '#F9F9F9', border: '1px solid #EBEBEB' }}
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-2xl font-bold" style={{ color: '#111827' }}>
              {totalXP}
              <span className="text-sm font-normal ml-1" style={{ color: '#9CA3AF' }}>/ {maxXP} XP</span>
            </p>
            <p className="text-xs mt-0.5" style={{ color: '#9CA3AF' }}>Today's progress</p>
          </div>
          <div className="flex gap-1">
            {WEEKLY.map(({ day, done }, i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-semibold"
                style={{
                  background: done ? '#C8960C' : '#EBEBEB',
                  color: done ? '#FFFFFF' : '#9CA3AF',
                }}
              >
                {done ? '✓' : day}
              </div>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: '#E5E7EB' }}>
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="h-full rounded-full"
            style={{ background: '#C8960C' }}
          />
        </div>
      </div>

      {/* Habit list */}
      <div className="px-5 flex flex-col gap-2">
        <p className="text-xs uppercase tracking-widest font-semibold mb-1" style={{ color: '#9CA3AF' }}>
          Today's Habits
        </p>
        {HABITS.map((habit, i) => {
          const done = completed.includes(habit.id)
          return (
            <motion.button
              key={habit.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => toggle(habit.id)}
              className="flex items-center gap-3 p-3.5 rounded-2xl text-left transition-all active:scale-[0.98]"
              style={{
                background: done ? '#FAFAFA' : '#FFFFFF',
                border: `1.5px solid ${done ? '#C8960C' : '#EBEBEB'}`,
              }}
            >
              <span className="text-xl">{habit.icon}</span>

              <div className="flex-1">
                <p className="font-medium text-sm" style={{ color: '#111827' }}>
                  {habit.title}
                </p>
                <p className="text-[10px] mt-0.5" style={{ color: '#9CA3AF' }}>
                  {habit.category} · +{habit.xp} XP
                </p>
              </div>

              <div
                className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: done ? '#C8960C' : 'transparent',
                  border: `1.5px solid ${done ? 'transparent' : '#D1D5DB'}`,
                }}
              >
                {done && <Check size={12} strokeWidth={3} color="#FFFFFF" />}
              </div>
            </motion.button>
          )
        })}
      </div>

      <div className="h-4" />
    </div>
  )
}
