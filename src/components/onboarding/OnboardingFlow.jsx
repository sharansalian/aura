import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import PathSelector from './PathSelector.jsx'
import HabitVow, { HABITS } from './HabitVow.jsx'

const TOTAL_STEPS = 3

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
}

export default function OnboardingFlow({ onComplete }) {
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [path, setPath] = useState(null)
  const [vowed, setVowed] = useState([])

  const goNext = () => {
    setDirection(1)
    setStep(s => s + 1)
  }
  const goBack = () => {
    setDirection(-1)
    setStep(s => s - 1)
  }

  const toggleVow = (id) => {
    setVowed(prev => prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id])
  }

  const canProceed = [
    true,
    !!path,
    vowed.length === HABITS.length,
  ][step]

  const steps = [
    <WelcomeStep />,
    <PathStep path={path} onSelect={setPath} />,
    <VowStep vowed={vowed} onToggle={toggleVow} />,
  ]

  return (
    <div className="absolute inset-0 flex flex-col bg-auraNavy overflow-hidden">
      {/* Background orb */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #F0D696, transparent 70%)', filter: 'blur(40px)' }}
      />

      {/* Header */}
      <div className="relative z-10 flex items-center px-5 pt-12 pb-4 gap-3">
        {step > 0 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={goBack}
            className="p-2 rounded-full glass-light mr-1"
          >
            <ChevronLeft size={18} className="text-white/70" />
          </motion.button>
        )}

        {/* Progress bar */}
        <div className="flex-1 flex gap-1.5">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div key={i} className="flex-1 h-1 rounded-full overflow-hidden bg-white/10">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #F0D696, #c8a84b)' }}
                initial={{ width: '0%' }}
                animate={{ width: i <= step ? '100%' : '0%' }}
                transition={{ duration: 0.4 }}
              />
            </div>
          ))}
        </div>

        <span className="text-xs text-white/30 font-medium ml-1">
          {step + 1}/{TOTAL_STEPS}
        </span>
      </div>

      {/* Step content */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.32, 0, 0.67, 0] }}
            className="absolute inset-0 flex flex-col px-5 pt-4 pb-2 overflow-y-auto hide-scrollbar"
          >
            {steps[step]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CTA */}
      <div className="relative z-10 px-5 pb-10 pt-3">
        <motion.button
          onClick={step < TOTAL_STEPS - 1 ? goNext : onComplete}
          disabled={!canProceed}
          animate={{ opacity: canProceed ? 1 : 0.4 }}
          className="w-full py-4 rounded-2xl font-semibold text-base text-auraNavy transition-all active:scale-[0.97]"
          style={{
            background: 'linear-gradient(135deg, #F0D696, #c8a84b)',
            boxShadow: canProceed ? '0 0 30px rgba(240,214,150,0.4)' : 'none',
          }}
        >
          {step === TOTAL_STEPS - 1 ? 'Enter the Sanctuary' : 'Continue'}
        </motion.button>
      </div>
    </div>
  )
}

function WelcomeStep() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 text-center gap-6">
      {/* Logo orb */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'backOut' }}
        className="relative"
      >
        <div
          className="w-28 h-28 rounded-full flex items-center justify-center"
          style={{
            background: 'radial-gradient(circle, rgba(240,214,150,0.25) 0%, rgba(5,11,24,0.8) 100%)',
            border: '1.5px solid rgba(240,214,150,0.3)',
            boxShadow: '0 0 50px rgba(240,214,150,0.25)',
          }}
        >
          <span className="text-5xl">✦</span>
        </div>
        {/* Orbiting dot */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
          className="absolute inset-0"
        >
          <div className="absolute -top-1 left-1/2 w-2.5 h-2.5 rounded-full bg-auraTeal"
            style={{ boxShadow: '0 0 8px #4DB1A7' }}
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="gap-3 flex flex-col"
      >
        <h1 className="text-4xl font-bold text-shimmer">Aura</h1>
        <p className="text-white/50 text-sm leading-relaxed max-w-[260px] mx-auto">
          A radiant sanctuary for divine connections. Align your soul before you connect.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex gap-6 mt-2"
      >
        {['Integrity', 'Growth', 'Connection'].map(v => (
          <div key={v} className="flex flex-col items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-auraGold/60" />
            <span className="text-[10px] text-white/30 tracking-wider uppercase">{v}</span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

function PathStep({ path, onSelect }) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <motion.h2
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-white"
        >
          Choose Your Path
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-sm text-white/40 mt-1"
        >
          This shapes how you show up in the sanctuary.
        </motion.p>
      </div>
      <PathSelector selected={path} onSelect={onSelect} />
    </div>
  )
}

function VowStep({ vowed, onToggle }) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <motion.h2
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-white"
        >
          The Habit Vow
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-sm text-white/40 mt-1"
        >
          Commit to these three daily practices to enter Aura.
        </motion.p>
      </div>
      <HabitVow vowed={vowed} onToggle={onToggle} />
    </div>
  )
}
