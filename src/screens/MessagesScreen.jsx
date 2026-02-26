import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, BadgeCheck } from 'lucide-react'

const MOCK_MATCHES = [
  {
    id: 1,
    name: 'Celeste',
    photo: 'https://picsum.photos/seed/celeste/80/80',
    lastMessage: "I'd love to hear about your morning ritual ✨",
    time: '2m',
    unread: 2,
    verified: true,
  },
  {
    id: 2,
    name: 'Elias',
    photo: 'https://picsum.photos/seed/elias/80/80',
    lastMessage: 'That breathwork session sounds incredible.',
    time: '1h',
    unread: 0,
    verified: true,
  },
  {
    id: 3,
    name: 'Zara',
    photo: 'https://picsum.photos/seed/zara/80/80',
    lastMessage: "What's your moon sign? 🌙",
    time: '3h',
    unread: 1,
    verified: false,
  },
]

export default function MessagesScreen() {
  const [query, setQuery] = useState('')

  const filtered = MOCK_MATCHES.filter(m =>
    m.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="flex flex-col h-full pt-12 pb-0" style={{ background: '#FFFFFF' }}>
      {/* Header */}
      <div className="px-5 mb-4">
        <h1 className="text-xl font-bold" style={{ color: '#111827' }}>Messages</h1>
        <p className="text-xs mt-0.5" style={{ color: '#9CA3AF' }}>{MOCK_MATCHES.length} matches</p>
      </div>

      {/* Search */}
      <div className="px-5 mb-4">
        <div
          className="flex items-center gap-3 px-4 py-2.5 rounded-2xl"
          style={{ background: '#F5F5F7', border: '1px solid #EBEBEB' }}
        >
          <Search size={15} style={{ color: '#9CA3AF' }} className="flex-shrink-0" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search…"
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: '#111827' }}
          />
        </div>
      </div>

      {/* New matches row */}
      <div className="px-5 mb-4">
        <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: '#9CA3AF' }}>
          New Matches
        </p>
        <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-1">
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
                  style={{ border: '2px solid #E5E7EB' }}
                >
                  <img src={match.photo} alt={match.name} className="w-full h-full object-cover" />
                </div>
                {match.unread > 0 && (
                  <div
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
                    style={{ background: '#C8960C' }}
                  >
                    {match.unread}
                  </div>
                )}
              </div>
              <span className="text-[10px] font-medium" style={{ color: '#6B7280' }}>{match.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="mx-5 mb-3" style={{ height: 1, background: '#F0F0F0' }} />

      {/* Message list */}
      <div className="flex-1 overflow-y-auto hide-scrollbar px-5">
        <div className="flex flex-col gap-1">
          {filtered.map((match, i) => (
            <motion.button
              key={match.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="flex items-center gap-3 p-3 rounded-2xl text-left active:scale-[0.98] transition-all"
              style={{
                background: match.unread > 0 ? '#FAFAFA' : 'transparent',
              }}
            >
              <div
                className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0"
                style={{ border: '1.5px solid #E5E7EB' }}
              >
                <img src={match.photo} alt={match.name} className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-sm" style={{ color: '#111827' }}>
                    {match.name}
                  </span>
                  {match.verified && <BadgeCheck size={13} style={{ color: '#2BA99B' }} />}
                </div>
                <p
                  className="text-xs truncate mt-0.5"
                  style={{ color: match.unread > 0 ? '#374151' : '#9CA3AF', fontWeight: match.unread > 0 ? 500 : 400 }}
                >
                  {match.lastMessage}
                </p>
              </div>

              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <span className="text-[10px]" style={{ color: '#9CA3AF' }}>{match.time}</span>
                {match.unread > 0 && (
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                    style={{ background: '#C8960C' }}
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
