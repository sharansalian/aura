import { useState, useRef } from 'react'
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion'
import { MapPin, BadgeCheck } from 'lucide-react'
import AuraImage from './AuraImage.jsx'

const PATH_COLORS = {
  feminine: '#C8960C',
  masculine: '#2BA99B',
  kin: '#7C3AED',
}

export default function SwipeCard({ profile, onSwipe, isTop }) {
  const [page, setPage] = useState(0)
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-15, 15])
  const connectOpacity = useTransform(x, [30, 100], [0, 1])
  const passOpacity = useTransform(x, [-100, -30], [1, 0])
  const pathColor = PATH_COLORS[profile.path] || '#C8960C'
  const pointerRef = useRef({ startY: 0, startX: 0 })

  const prompts = profile.prompts || []
  const totalPages = 1 + prompts.length

  const handleDragEnd = (_, info) => {
    if (info.offset.x > 100) {
      swipeOut('connect')
    } else if (info.offset.x < -100) {
      swipeOut('pass')
    } else {
      animate(x, 0, { type: 'spring', stiffness: 300, damping: 25 })
    }
  }

  const swipeOut = (direction) => {
    animate(x, direction === 'connect' ? 600 : -600, { duration: 0.4, ease: 'easeIn' })
    setTimeout(() => onSwipe(profile.id, direction), 350)
  }

  const handlePointerDown = (e) => {
    pointerRef.current = { startY: e.clientY, startX: e.clientX }
  }

  const handlePointerUp = (e) => {
    const dy = e.clientY - pointerRef.current.startY
    const dx = e.clientX - pointerRef.current.startX
    if (Math.abs(dy) > 50 && Math.abs(dy) > Math.abs(dx) * 1.5) {
      if (dy < 0 && page < totalPages - 1) setPage(p => p + 1)
      else if (dy > 0 && page > 0) setPage(p => p - 1)
    }
  }

  return (
    <motion.div
      style={{ x, rotate, position: 'absolute', inset: 0 }}
      drag={isTop ? 'x' : false}
      dragElastic={0.1}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      className="touch-none select-none"
    >
      <div
        className="w-full h-full rounded-3xl overflow-hidden relative"
        style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.10)', border: '1px solid #F0F0F0' }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        {/* Page indicator dots */}
        {totalPages > 1 && (
          <div className="absolute top-3 left-0 right-0 flex justify-center gap-1.5 z-20">
            {Array.from({ length: totalPages }).map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === page ? 18 : 6,
                  height: 4,
                  background: i === page ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.4)',
                }}
              />
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {page === 0 ? (
            /* ── Photo page ── */
            <motion.div
              key="main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0"
            >
              <AuraImage
                src={profile.photo}
                alt={profile.name}
                className="absolute inset-0 w-full h-full"
              />

              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)',
                }}
              />

              {/* Bottom info */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-white">{profile.name}</h2>
                  <span className="text-white/70 text-xl font-light">{profile.age}</span>
                  {profile.verified && (
                    <BadgeCheck size={18} color="#FFFFFF" fill="rgba(255,255,255,0.3)" />
                  )}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <MapPin size={11} color="rgba(255,255,255,0.55)" />
                  <span className="text-xs text-white/55">{profile.location}</span>
                </div>
                <p className="text-white/65 text-xs leading-relaxed mt-2 line-clamp-2">{profile.bio}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {profile.interests.slice(0, 3).map(interest => (
                    <span
                      key={interest}
                      className="text-[11px] px-2.5 py-0.5 rounded-full text-white/75"
                      style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            /* ── Prompt page ── */
            <motion.div
              key={`prompt-${page}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="absolute inset-0 flex flex-col bg-white"
            >
              {/* Header strip */}
              <div className="px-5 pt-14 pb-5" style={{ borderBottom: '1px solid #F0F0F0' }}>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-1 h-3.5 rounded-full" style={{ background: pathColor }} />
                  <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: pathColor }}>
                    {profile.name}, {profile.age}
                  </span>
                </div>
                <h3 className="text-xl font-bold leading-snug" style={{ color: '#111827' }}>
                  {prompts[page - 1].question}
                </h3>
              </div>

              {/* Answer area */}
              {prompts[page - 1].photo ? (
                <div className="flex-1 mx-4 my-4 rounded-2xl overflow-hidden">
                  <img
                    src={prompts[page - 1].photo}
                    alt={prompts[page - 1].question}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div
                  className="flex-1 mx-4 my-4 rounded-2xl flex items-center justify-center p-6"
                  style={{ background: '#FAFAFA', border: '1px solid #F0F0F0' }}
                >
                  <p className="text-lg font-semibold text-center leading-relaxed" style={{ color: '#111827' }}>
                    {prompts[page - 1].answer}
                  </p>
                </div>
              )}

              <div className="flex justify-center pb-4">
                <span className="text-[10px]" style={{ color: '#C9C9C9' }}>swipe down to go back</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Swipe indicators */}
        <motion.div
          style={{
            opacity: connectOpacity,
            position: 'absolute', top: 28, left: 18, zIndex: 30,
            padding: '5px 14px', borderRadius: 10, border: '2.5px solid #2BA99B',
            transform: 'rotate(-18deg)',
          }}
        >
          <span className="font-bold text-base tracking-widest" style={{ color: '#2BA99B' }}>CONNECT</span>
        </motion.div>

        <motion.div
          style={{
            opacity: passOpacity,
            position: 'absolute', top: 28, right: 18, zIndex: 30,
            padding: '5px 14px', borderRadius: 10, border: '2.5px solid #EF4444',
            transform: 'rotate(18deg)',
          }}
        >
          <span className="font-bold text-base tracking-widest" style={{ color: '#EF4444' }}>PASS</span>
        </motion.div>
      </div>
    </motion.div>
  )
}
