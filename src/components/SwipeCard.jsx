import { useState, useRef } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { MapPin, Flame, BadgeCheck } from 'lucide-react'
import AuraImage from './AuraImage.jsx'

const PATH_COLORS = {
  feminine: '#F0D696',
  masculine: '#4DB1A7',
  kin: '#a78bfa',
}

export default function SwipeCard({ profile, onSwipe, isTop }) {
  const [revealed, setRevealed] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-18, 18])
  const connectOpacity = useTransform(x, [30, 120], [0, 1])
  const passOpacity = useTransform(x, [-120, -30], [1, 0])
  const pathColor = PATH_COLORS[profile.path] || '#F0D696'
  const dragStartRef = useRef({ x: 0, y: 0 })

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

  return (
    <motion.div
      style={{ x, y, rotate, position: 'absolute', inset: 0 }}
      drag={isTop}
      dragElastic={0.12}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragStart={(_, info) => {
        dragStartRef.current = { x: info.point.x, y: info.point.y }
      }}
      onDragEnd={handleDragEnd}
      className="touch-none select-none"
    >
      <div
        className="w-full h-full rounded-3xl overflow-hidden relative"
        style={{
          boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* Photo with blur reveal */}
        <AuraImage
          src={profile.photo}
          alt={profile.name}
          revealed={revealed}
          onReveal={() => setRevealed(true)}
          className="absolute inset-0 w-full h-full"
        />

        {/* Card gradient overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(5,11,24,0.95) 0%, rgba(5,11,24,0.4) 55%, transparent 100%)' }}
        />

        {/* Top badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          {/* Aura glow badge */}
          <div
            className="px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5"
            style={{
              background: 'rgba(5,11,24,0.7)',
              border: `1px solid ${pathColor}40`,
              backdropFilter: 'blur(8px)',
              color: pathColor,
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: pathColor }} />
            {profile.aura}
          </div>

          {/* Streak */}
          <div
            className="px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"
            style={{
              background: 'rgba(5,11,24,0.7)',
              backdropFilter: 'blur(8px)',
              color: profile.streak >= 7 ? '#fb923c' : 'rgba(255,255,255,0.6)',
            }}
          >
            <Flame size={11} fill={profile.streak >= 7 ? '#fb923c' : 'none'} />
            {profile.streak}d
          </div>
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-white">{profile.name}</h2>
                <span className="text-white/50 text-xl font-light">{profile.age}</span>
                {profile.verified && (
                  <BadgeCheck size={18} style={{ color: '#4DB1A7' }} fill="rgba(77,177,167,0.2)" />
                )}
              </div>

              <div className="flex items-center gap-1 mt-0.5">
                <MapPin size={11} className="text-white/30" />
                <span className="text-xs text-white/40">{profile.location}</span>
              </div>

              {/* Path badge */}
              <div
                className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-full text-[10px] font-semibold"
                style={{
                  background: `${pathColor}15`,
                  border: `1px solid ${pathColor}30`,
                  color: pathColor,
                }}
              >
                {profile.pathLabel}
              </div>
            </div>
          </div>

          <p className="text-white/50 text-xs leading-relaxed mt-2 line-clamp-2">{profile.bio}</p>

          {/* Interests */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {profile.interests.map(interest => (
              <span
                key={interest}
                className="text-[10px] px-2 py-0.5 rounded-full text-white/40"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Swipe indicators */}
        <motion.div
          style={{ opacity: connectOpacity }}
          className="absolute top-8 left-5 px-4 py-1.5 rounded-xl border-2 border-auraTeal rotate-[-20deg]"
        >
          <span className="text-auraTeal font-bold text-lg tracking-widest">CONNECT</span>
        </motion.div>

        <motion.div
          style={{ opacity: passOpacity }}
          className="absolute top-8 right-5 px-4 py-1.5 rounded-xl border-2 border-red-400/70 rotate-[20deg]"
        >
          <span className="text-red-400 font-bold text-lg tracking-widest">PASS</span>
        </motion.div>
      </div>
    </motion.div>
  )
}
