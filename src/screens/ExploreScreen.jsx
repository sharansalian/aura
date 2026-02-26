import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import StreakBar from '../components/StreakBar.jsx'
import CardStack from '../components/CardStack.jsx'
import MatchModal from '../components/MatchModal.jsx'
import { SlidersHorizontal, Bell } from 'lucide-react'

export default function ExploreScreen({ streak = 3 }) {
  const [matchedProfile, setMatchedProfile] = useState(null)

  return (
    <div className="flex flex-col h-full pt-12 pb-0 gap-3">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5">
        <div>
          <h1 className="text-lg font-bold text-shimmer">Aura</h1>
          <p className="text-[10px] text-white/30 -mt-0.5">Divine Connections</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 rounded-full glass flex items-center justify-center">
            <Bell size={16} className="text-white/50" />
          </button>
          <button className="w-9 h-9 rounded-full glass flex items-center justify-center">
            <SlidersHorizontal size={16} className="text-white/50" />
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
