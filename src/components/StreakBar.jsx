import { Flame } from 'lucide-react'

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

export default function StreakBar({ streak = 3 }) {
  return (
    <div
      className="mx-4 px-4 py-3 rounded-2xl flex items-center gap-3"
      style={{ background: '#F9F9F9', border: '1px solid #EBEBEB' }}
    >
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <Flame
          size={15}
          color={streak >= 4 ? '#FB923C' : '#D1D5DB'}
          fill={streak >= 4 ? '#FB923C' : 'none'}
        />
        <span className="text-xs font-semibold" style={{ color: '#374151' }}>
          {streak}d streak
        </span>
      </div>
      <div className="flex items-center gap-1 flex-1">
        {DAYS.map((_, i) => (
          <div
            key={i}
            className="flex-1 h-1.5 rounded-full"
            style={{ background: i < streak ? '#C8960C' : '#E5E7EB' }}
          />
        ))}
      </div>
    </div>
  )
}
