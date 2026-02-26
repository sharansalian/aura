import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import StreakBar from '../components/StreakBar.jsx'
import CardStack from '../components/CardStack.jsx'
import MatchModal from '../components/MatchModal.jsx'
import { SlidersHorizontal, Bell } from 'lucide-react'

export default function ExploreScreen({ streak = 3 }) {
  const [matchedProfile, setMatchedProfile] = useState(null)

  return (
    <div className="flex flex-col h-full pt-12 pb-0 gap-3" style={{ background: '#FFFFFF' }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-5">
        <div>
          <h1 className="text-lg font-bold text-shimmer">Aura</h1>
          <p className="text-[10px] mt-0.5" style={{ color: '#9CA3AF' }}>Divine Connections</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: '#F5F5F7', border: '1px solid #EBEBEB' }}
          >
            <Bell size={16} style={{ color: '#9CA3AF' }} />
          </button>
          <button
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: '#F5F5F7', border: '1px solid #EBEBEB' }}
          >
            <SlidersHorizontal size={16} style={{ color: '#9CA3AF' }} />
          </button>
        </div>
      </div>

      {/* Streak bar */}
      <StreakBar streak={streak} />

      {/* Card stack — fills remaining space */}
      <CardStack onMatch={setMatchedProfile} />

      {/* Match modal */}
      <AnimatePresence>
        {matchedProfile && (
          <MatchModal
            profile={matchedProfile}
            onClose={() => setMatchedProfile(null)}
            onMessage={() => setMatchedProfile(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
