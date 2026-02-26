import { useState, useRef } from 'react'
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion'
import { MapPin, Flame, BadgeCheck } from 'lucide-react'
import AuraImage from './AuraImage.jsx'

const PATH_COLORS = {
  feminine: '#C8960C',
  masculine: '#2BA99B',
  kin: '#7C3AED',
}

export default function SwipeCard({ profile, onSwipe, isTop }) {
  const [revealed, setRevealed] = useState(false)
  const [page, setPage] = useState(0)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-18, 18])
  const connectOpacity = useTransform(x, [30, 120], [0, 1])
  const passOpacity = useTransform(x, [-120, -30], [1, 0])
  const pathColor = PATH_COLORS[profile.path] || '#C8960C'
  const pointerRef = useRef({ startY: 0, startX: 0 })

  const prompts = profile.prompts || []
  const totalPages = 1 + prompts.length

  const handleDragEnd = (_, info) => {
    const threshold = 100
    if (info.offset.x > threshold) {
      swipeOut('connect')
    } else if (info.offset.x < -threshold) {
      swipeOut('pass')
    } else {
      animate(x, 0, { type: 'spring', stiffness: 300, damping: 25 })
      animate(y, 0, { type: 'spring', stiffness: 300, damping: 25 })
    }
  }

  const swipeOut = (direction) => {
    const targetX = direction === 'connect' ? 600 : -600
    animate(x, targetX, { duration: 0.4, ease: 'easeIn' })
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
      style={{ x, y, rotate, position: 'absolute', inset: 0 }}
      drag={isTop ? 'x' : false}
      dragElastic={0.12}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={handleDragEnd}
      className="touch-none select-none"
    >
      <div
        className="w-full h-full rounded-3xl overflow-hidden relative"
        style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.12)', border: '1px solid rgba(0,0,0,0.04)' }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        {/* Page indicator bars */}
        {totalPages > 1 && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 flex gap-1 z-20">
            {Array.from({ length: totalPages }).map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === page ? 20 : 6,
                  height: 4,
                  background: i === page
                    ? (page === 0 ? 'rgba(255,255,255,0.9)' : pathColor)
                    : (page === 0 ? 'rgba(255,255,255,0.35)' : `${pathColor}40`),
                }}
              />
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {page === 0 ? (
            <motion.div
              key="main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0"
            >
              {/* Photo */}
              <AuraImage
                src={profile.photo}
                alt={profile.name}
                revealed={revealed}
                onReveal={() => setRevealed(true)}
                className="absolute inset-0 w-full h-full"
              />

              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.25) 50%, transparent 100%)' }}
              />

              {/* Top badges */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <div
                  className="px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5"
                  style={{
                    background: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(8px)',
                    color: '#FFFFFF',
                    border: '1px solid rgba(255,255,255,0.2)',
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: pathColor }} />
                  {profile.aura}
                </div>
                <div
                  className="px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"
                  style={{
                    background: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(8px)',
                    color: '#FFFFFF',
                    border: '1px solid rgba(255,255,255,0.2)',
                  }}
                >
                  <Flame size={11} fill={profile.streak >= 7 ? '#FB923C' : 'none'} color={profile.streak >= 7 ? '#FB923C' : '#FFFFFF'} />
                  {profile.streak}d
                </div>
              </div>

              {/* Bottom info */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-white">{profile.name}</h2>
                  <span className="text-white/70 text-xl font-light">{profile.age}</span>
                  {profile.verified && (
                    <BadgeCheck size={18} color="#4DD6CC" fill="rgba(77,214,204,0.2)" />
                  )}
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <MapPin size={11} color="rgba(255,255,255,0.5)" />
                  <span className="text-xs text-white/50">{profile.location}</span>
                </div>
                <div
                  className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-full text-[10px] font-semibold"
                  style={{
                    background: 'rgba(255,255,255,0.12)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: '#FFFFFF',
                  }}
                >
                  {profile.pathLabel}
                </div>
                <p className="text-white/60 text-xs leading-relaxed mt-2 line-clamp-2">{profile.bio}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {profile.interests.map(interest => (
                    <span
                      key={interest}
                      className="text-[10px] px-2 py-0.5 rounded-full text-white/60"
                      style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}
                    >
                      {interest}
                    </span>
                  ))}
                </div>
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-1 mt-3">
                    <span className="text-[10px] text-white/40">swipe up for more</span>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={`prompt-${page}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="absolute inset-0 flex flex-col"
              style={{ background: '#FFFFFF' }}
            >
              {/* Top strip */}
              <div
                className="px-5 pt-14 pb-5"
                style={{ borderBottom: `1px solid ${pathColor}20` }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1 h-4 rounded-full" style={{ background: pathColor }} />
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: pathColor }}>
                    {profile.name}, {profile.age}
                  </span>
                </div>
                <h3 className="text-[22px] font-bold leading-snug" style={{ color: '#111827' }}>
                  {prompts[page - 1].question}
                </h3>
              </div>

              {/* Photo or text answer */}
              {prompts[page - 1].photo ? (
                <div className="flex-1 overflow-hidden mx-4 mb-4 mt-4 rounded-2xl shadow-sm">
                  <img
                    src={prompts[page - 1].photo}
                    alt={prompts[page - 1].question}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div
                  className="flex-1 mx-4 mb-4 mt-4 rounded-2xl flex items-center justify-center p-7"
                  style={{ background: `${pathColor}0A`, border: `1px solid ${pathColor}20` }}
                >
                  <p
                    className="text-xl font-semibold text-center leading-relaxed"
                    style={{ color: '#111827' }}
                  >
                    {prompts[page - 1].answer}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-center pb-4">
                <span className="text-[10px]" style={{ color: `${pathColor}70` }}>
                  swipe down to go back
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Swipe indicators */}
        <motion.div
          style={{ opacity: connectOpacity, position: 'absolute', top: 32, left: 20, zIndex: 30, padding: '6px 16px', borderRadius: 12, border: '2.5px solid #2BA99B', transform: 'rotate(-20deg)' }}
        >
          <span className="font-bold text-lg tracking-widest" style={{ color: '#2BA99B' }}>CONNECT</span>
        </motion.div>

        <motion.div
          style={{ opacity: passOpacity, position: 'absolute', top: 32, right: 20, zIndex: 30, padding: '6px 16px', borderRadius: 12, border: '2.5px solid #EF4444', transform: 'rotate(20deg)' }}
        >
          <span className="font-bold text-lg tracking-widest" style={{ color: '#EF4444' }}>PASS</span>
        </motion.div>
      </div>
    </motion.div>
  )
}
