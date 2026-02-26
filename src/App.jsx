import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import BottomNav from './components/BottomNav.jsx'
import ExploreScreen from './screens/ExploreScreen.jsx'
import GrowthScreen from './screens/GrowthScreen.jsx'
import MessagesScreen from './screens/MessagesScreen.jsx'
import ProfileScreen from './screens/ProfileScreen.jsx'

const SCREENS = {
  explore: ExploreScreen,
  growth: GrowthScreen,
  messages: MessagesScreen,
  profile: ProfileScreen,
}

const screenVariants = {
  enter: { opacity: 0, y: 10 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
}

export default function App() {
  const [activeTab, setActiveTab] = useState('explore')

  const ActiveScreen = SCREENS[activeTab]

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center"
      style={{ background: '#000' }}
    >
      {/* Mobile frame */}
      <div
        className="relative overflow-hidden bg-auraNavy"
        style={{
          width: 375,
          height: 812,
          borderRadius: 40,
          boxShadow: '0 0 0 10px #111, 0 40px 80px rgba(0,0,0,0.8)',
        }}
      >
        {/* Background divine glow */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{ background: 'radial-gradient(circle at 50% 15%, rgba(240,214,150,0.08) 0%, rgba(5,11,24,1) 60%)' }}
        />

        <div className="absolute inset-0 z-10 flex flex-col">
          {/* Screen content area */}
          <div className="flex-1 relative overflow-hidden" style={{ paddingBottom: 80 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={screenVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="absolute inset-0"
              >
                <ActiveScreen streak={3} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom nav */}
          <BottomNav active={activeTab} onChange={setActiveTab} />
        </div>

        {/* iPhone notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-b-2xl z-50 pointer-events-none" />
      </div>
    </div>
  )
}
