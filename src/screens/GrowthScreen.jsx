import { useState } from 'react'
import { motion } from 'framer-motion'
import { Flame, Check, ChevronRight, Trophy } from 'lucide-react'

const HABITS = [
  { id: 'movement', icon: '🏃', title: '7-Min Movement', xp: 50, category: 'Body' },
  { id: 'grooming', icon: '✨', title: 'Sacred Grooming', xp: 30, category: 'Body' },
  { id: 'integrity', icon: '🛡️', title: 'Integrity Vow', xp: 70, category: 'Mind' },
  { id: 'meditation', icon: '🧘', title: '10-Min Meditation', xp: 60, category: 'Mind' },
  { id: 'journal', icon: '📓', title: 'Gratitude Journal', xp: 40, category: 'Soul' },
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
    <div className="flex flex-col h-full pt-12 pb-4 overflow-y-auto hide-scrollbar">
      {/* Header */}
      <div className="px-5 mb-5">
        <h1 className="text-xl font-bold text-white">Daily Growth</h1>
        <p className="text-xs text-white/40 mt-0.5">Honour your temple. Raise your Aura.</p>
      </div>

      {/* XP Progress ring */}
      <div className="flex items-center justify-center mb-6 px-5">
        <div
          className="w-full rounded-2xl p-4 flex items-center gap-4"
          style={{
            background: 'rgba(15,31,61,0.6)',
            border: '1px solid rgba(240,214,150,0.1)',
          }}
        >
          <div className="relative w-16 h-16 flex-shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
              <motion.circle
                cx="32" cy="32" r="28" fill="none"
                stroke="#F0D696" strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 28}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 28 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 28 * (1 - progress) }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{ filter: 'drop-shadow(0 0 6px rgba(240,214,150,0.6))' }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <Trophy size={18} className="text-auraGold" />
            </div>
          </div>

          <div className="flex-1">
            <div className="text-2xl font-bold text-auraGold">{totalXP} <span className="text-sm text-white/30 font-normal">/ {maxXP} XP</span></div>
            <p className="text-xs text-white/40 mt-0.5">Today's Aura energy</p>

            {/* Weekly row */}
            <div className="flex gap-1 mt-2">
              {WEEKLY.map(({ day, done }, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[9px]"
                  style={{
                    background: done ? 'linear-gradient(135deg, #F0D696, #c8a84b)' : 'rgba(255,255,255,0.05)',
                    border: done ? 'none' : '1px solid rgba(255,255,255,0.08)',
                    color: done ? '#050B18' : 'rgba(255,255,255,0.2)',
                    fontWeight: done ? 700 : 400,
                  }}
                >
                  {done ? '✓' : day}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Habit list */}
      <div className="px-5 flex flex-col gap-2.5">
        <p className="text-xs text-white/30 uppercase tracking-widest font-medium mb-1">Today's Rituals</p>
        {HABITS.map((habit, i) => {
          const done = completed.includes(habit.id)
          return (
            <motion.button
              key={habit.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              onClick={() => toggle(habit.id)}
              className="flex items-center gap-3 p-3.5 rounded-2xl text-left transition-all active:scale-[0.98]"
              style={{
                background: done ? 'linear-gradient(135deg, rgba(240,214,150,0.1), rgba(15,31,61,0.8))' : 'rgba(15,31,61,0.5)',
                border: `1.5px solid ${done ? 'rgba(240,214,150,0.3)' : 'rgba(255,255,255,0.06)'}`,
              }}
            >
              <span className="text-xl">{habit.icon}</span>

              <div className="flex-1">
                <p className={`font-medium text-sm ${done ? 'text-auraGold' : 'text-white'}`}>
                  {habit.title}
                </p>
                <p className="text-[10px] text-white/30 mt-0.5">{habit.category} · +{habit.xp} XP</p>
              </div>

              <div
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{
                  background: done ? 'linear-gradient(135deg, #F0D696, #c8a84b)' : 'transparent',
                  border: `1.5px solid ${done ? 'transparent' : 'rgba(255,255,255,0.15)'}`,
                  boxShadow: done ? '0 0 12px rgba(240,214,150,0.4)' : 'none',
                }}
              >
                {done && <Check size={13} strokeWidth={3} className="text-auraNavy" />}
              </div>
            </motion.button>
          )
        })}
      </div>

      <div className="h-4" />
    </div>
  )
}
