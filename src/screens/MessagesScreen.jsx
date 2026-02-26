import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, BadgeCheck } from 'lucide-react'

const MOCK_MATCHES = [
  {
    id: 1,
    name: 'Celeste',
    photo: 'https://picsum.photos/seed/celeste/80/80',
    path: 'feminine',
    lastMessage: 'I'd love to hear about your morning ritual ✨',
    time: '2m',
    unread: 2,
    verified: true,
  },
  {
    id: 2,
    name: 'Elias',
    photo: 'https://picsum.photos/seed/elias/80/80',
    path: 'masculine',
    lastMessage: 'That breathwork session sounds incredible.',
    time: '1h',
    unread: 0,
    verified: true,
  },
  {
    id: 3,
    name: 'Zara',
    photo: 'https://picsum.photos/seed/zara/80/80',
    path: 'kin',
    lastMessage: 'What's your moon sign? 🌙',
    time: '3h',
    unread: 1,
    verified: false,
  },
]

const PATH_COLORS = { feminine: '#F0D696', masculine: '#4DB1A7', kin: '#a78bfa' }

export default function MessagesScreen() {
  const [query, setQuery] = useState('')

  const filtered = MOCK_MATCHES.filter(m =>
    m.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="flex flex-col h-full pt-12 pb-0">
      {/* Header */}
      <div className="px-5 mb-4">
        <h1 className="text-xl font-bold text-white">Connections</h1>
        <p className="text-xs text-white/40 mt-0.5">{MOCK_MATCHES.length} divine matches</p>
      </div>

      {/* Search */}
      <div className="px-5 mb-4">
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-2xl"
          style={{ background: 'rgba(15,31,61,0.6)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <Search size={15} className="text-white/30 flex-shrink-0" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search connections…"
            className="flex-1 bg-transparent text-sm text-white placeholder-white/20 outline-none"
          />
        </div>
      </div>

      {/* New matches row */}
      <div className="px-5 mb-4">
        <p className="text-xs text-white/30 uppercase tracking-widest font-medium mb-3">New Matches</p>
        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
          {MOCK_MATCHES.map((match, i) => (
            <motion.button
              key={match.id}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              className="flex-shrink-0 flex flex-col items-center gap-1.5"
            >
              <div className="relative">
                <div
                  className="w-14 h-14 rounded-full overflow-hidden"
                  style={{
                    border: `2px solid ${PATH_COLORS[match.path]}`,
                    boxShadow: `0 0 14px ${PATH_COLORS[match.path]}40`,
                  }}
                >
                  <img src={match.photo} alt={match.name} className="w-full h-full object-cover" />
                </div>
                {match.unread > 0 && (
                  <div
                    className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 rounded-full flex items-center justify-center text-[9px] font-bold text-auraNavy"
                    style={{ background: '#F0D696', minWidth: '1.1rem', minHeight: '1.1rem' }}
                  >
                    {match.unread}
                  </div>
                )}
              </div>
              <span className="text-[10px] text-white/50">{match.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Message list */}
      <div className="flex-1 overflow-y-auto hide-scrollbar px-5">
        <p className="text-xs text-white/30 uppercase tracking-widest font-medium mb-3">Messages</p>
        <div className="flex flex-col gap-2">
          {filtered.map((match, i) => (
            <motion.button
              key={match.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="flex items-center gap-3 p-3 rounded-2xl text-left active:scale-[0.98] transition-all"
              style={{
                background: match.unread > 0 ? 'rgba(240,214,150,0.04)' : 'rgba(15,31,61,0.4)',
                border: `1px solid ${match.unread > 0 ? 'rgba(240,214,150,0.1)' : 'rgba(255,255,255,0.04)'}`,
              }}
            >
              <div
                className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0"
                style={{ border: `1.5px solid ${PATH_COLORS[match.path]}50` }}
              >
                <img src={match.photo} alt={match.name} className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className={`font-semibold text-sm ${match.unread > 0 ? 'text-white' : 'text-white/70'}`}>
                    {match.name}
                  </span>
                  {match.verified && <BadgeCheck size={13} style={{ color: '#4DB1A7' }} />}
                </div>
                <p className={`text-xs truncate mt-0.5 ${match.unread > 0 ? 'text-white/60' : 'text-white/30'}`}>
                  {match.lastMessage}
                </p>
              </div>

              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <span className="text-[10px] text-white/25">{match.time}</span>
                {match.unread > 0 && (
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-auraNavy"
                    style={{ background: '#F0D696' }}
                  >
                    {match.unread}
                  </div>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}
