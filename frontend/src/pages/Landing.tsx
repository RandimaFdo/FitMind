import { motion } from 'framer-motion'
import { Brain, Activity, Apple, Dumbbell, ShieldCheck, Sparkles, LineChart, Bot, BarChart3, Zap, Star, Trophy } from 'lucide-react'
import mockup from '../assets/mockup-phone.png'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' },
  }),
}

const features = [
  { title: 'AI Workout Generator', description: 'Hyper-personalized training blocks crafted in seconds from your biometrics.', icon: Dumbbell },
  { title: 'Meal & Nutrition Scanner', description: 'Snap a pic of your plate to log macros, micros, and hydration balance instantly.', icon: Apple },
  { title: 'Calorie Tracking', description: 'Adaptive calorie targets that sync with your recovery score and daily strain.', icon: Activity },
  { title: 'Personalized Fitness Journey', description: 'Dynamic milestones that evolve with your performance and consistency.', icon: Brain },
  { title: 'Progress Dashboard', description: 'Live readiness, HRV trends, and performance streaks in one sleek canvas.', icon: LineChart },
  { title: 'Real-time Body Analytics', description: 'AI interprets wearable + photo cues to keep your plan calibrated.', icon: ShieldCheck },
]

const competitors = [
  { name: 'MyFitnessPal', detail: 'Macros only. No AI adjustments.' },
  { name: 'Nike Training Club', detail: 'Workouts only. Nutrition sold separately.' },
  { name: 'Google Fit', detail: 'Tracking basics. Lacks coaching intelligence.' },
  { name: 'LoseIt', detail: 'Great logging. No workouts or adaptive plans.' },
  { name: 'HealthifyMe', detail: 'Coaching paywalled. Limited automation.' },
]

const steps = [
  { title: 'Scan meals', detail: 'Capture every bite with computer-vision macros and habit flags.', icon: Apple },
  { title: 'Get personalized workouts', detail: 'AI blends strength, mobility, and conditioning for your goals.', icon: Dumbbell },
  { title: 'Track progress', detail: 'Dashboards showcase readiness, streaks, and biometric wins.', icon: LineChart },
  { title: 'AI adjusts automatically', detail: 'Coach FitMind recalibrates volume, fuel, and recovery instantly.', icon: Bot },
]

const testimonials = [
  { name: 'Avery Chen', role: 'Product Lead • NYC', quote: 'FitMind replaced three apps and my PT. Down 12% body fat with better energy.', delta: '-12% body fat' },
  { name: 'Jordan Malik', role: 'Photographer • LA', quote: 'Meal scans + AI workouts keep me consistent even on travel shoots.', delta: '+6 lbs lean mass' },
  { name: 'Sofia Alvarez', role: 'Founder • Miami', quote: 'It feels like a performance lab in my pocket. The AI coach never sleeps.', delta: '-18 lbs, HRV +22' },
]

const pricing = [
  {
    name: 'Free',
    price: '$0',
    tagline: 'Workouts, tracking, and meal scanning forever.',
    features: ['Smart workout templates', 'Macro-aware meal scanner', 'Daily readiness score', 'Weekly progress recap'],
    highlight: 'Start training today',
  },
  {
    name: 'Premium',
    price: '$19/mo',
    tagline: 'Advanced analytics & AI deep coaching.',
    features: ['Fully custom AI programming', 'Real-time biomarker nudges', 'Coach chat + habit scripts', '3D body + readiness insights'],
    highlight: 'Unlock elite performance',
  },
]

export function Landing() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0 opacity-60" style={{ background: 'radial-gradient(circle at top, rgba(139,92,246,0.35), transparent 55%)' }} />
        <header className="relative mx-auto flex max-w-6xl flex-col gap-16 px-6 pb-24 pt-20 md:flex-row md:items-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex-1 space-y-8">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.4em] text-slate-300">
              <Sparkles className="h-4 w-4 text-brand-aqua" /> FitMind
            </p>
            <div className="space-y-6">
              <motion.h1 custom={0.1} variants={fadeUp} className="text-4xl font-semibold leading-tight md:text-6xl">
                Your Personal AI Fitness & Nutrition Coach
              </motion.h1>
              <motion.p custom={0.2} variants={fadeUp} className="max-w-2xl text-lg text-slate-300">
                Workout plans, meal scanning, calorie tracking, and progress monitoring — all in one place.
              </motion.p>
            </div>
            <motion.div custom={0.3} variants={fadeUp} className="flex flex-wrap gap-4">
              <button className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-brand-neon to-brand-aqua px-6 py-3 text-sm font-semibold text-slate-950 shadow-glow">
                <Apple className="h-5 w-5" /> Download on App Store
              </button>
              <button className="flex items-center gap-3 rounded-2xl border border-white/20 px-6 py-3 text-sm font-semibold text-white">
                <Zap className="h-5 w-5 text-brand-aqua" /> Get it on Google Play
              </button>
              <button className="flex items-center gap-3 rounded-2xl border border-white/20 px-6 py-3 text-sm font-semibold text-white">
                <Trophy className="h-5 w-5 text-brand-neon" /> Join beta waitlist
              </button>
            </motion.div>
            <motion.div custom={0.4} variants={fadeUp} className="flex flex-wrap gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-brand-aqua" /> Backed by sports scientists</span>
              <span className="flex items-center gap-2"><BarChart3 className="h-4 w-4 text-brand-neon" /> 250k+ daily metrics synced</span>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.7 }} className="relative flex flex-1 justify-center">
            <div className="absolute inset-0 blur-3xl" style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.3), transparent 60%)' }} />
            <div className="relative w-full max-w-sm rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-slate-900 to-slate-950 p-6 shadow-2xl">
              <div className="rounded-[2rem] border border-white/10 bg-black/80 p-4">
                <img src={mockup} alt="FitMind mobile app" className="w-full" />
              </div>
              <div className="mt-6 space-y-2 text-center text-sm text-slate-300">
                <p className="font-semibold text-white">Daily Recovery • 94%</p>
                <p>AI Coach synced • 3 min ago</p>
              </div>
            </div>
          </motion.div>
        </header>
      </div>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.article key={feature.title} custom={index * 0.1} variants={fadeUp} className="rounded-3xl border border-white/5 bg-slate-900/60 p-6 backdrop-blur">
              <feature.icon className="h-8 w-8 text-brand-aqua" />
              <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{feature.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section className="bg-slate-900/70 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-slate-400">Competitive Edge</p>
            <h2 className="mt-4 text-3xl font-semibold">Why FitMind beats the industry</h2>
            <p className="mt-2 text-slate-300">All-in-one AI coaching + workouts + nutrition in the free version.</p>
          </motion.div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {competitors.map((competitor, index) => (
              <motion.div key={competitor.name} custom={index * 0.1} variants={fadeUp} className="rounded-3xl border border-brand-neon/20 bg-gradient-to-br from-slate-900 to-slate-950 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-400">vs</p>
                    <h3 className="text-xl font-semibold text-white">{competitor.name}</h3>
                  </div>
                  <ShieldCheck className="h-8 w-8 text-brand-aqua" />
                </div>
                <p className="mt-4 text-sm text-slate-300">{competitor.detail}</p>
                <p className="mt-4 rounded-full bg-brand-neon/10 px-4 py-2 text-xs text-brand-neon">Missing all-in-one AI</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-slate-400">How FitMind Works</p>
          <h2 className="mt-4 text-3xl font-semibold">AI adapts in four effortless steps</h2>
        </motion.div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {steps.map((step, index) => (
            <motion.div key={step.title} custom={index * 0.1} variants={fadeUp} className="rounded-3xl border border-white/5 bg-slate-900/60 p-6">
              <div className="flex items-center gap-4">
                <step.icon className="h-10 w-10 rounded-2xl bg-brand-neon/10 p-2 text-brand-neon" />
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Step {index + 1}</p>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-300">{step.detail}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-slate-900/60 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-slate-400">Transformations</p>
            <h2 className="mt-4 text-3xl font-semibold">Real humans. Real AI gains.</h2>
          </motion.div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.article key={testimonial.name} custom={index * 0.1} variants={fadeUp} className="rounded-3xl border border-white/5 bg-slate-950/80 p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-brand-neon to-brand-aqua" />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-xs text-slate-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="mt-6 text-sm text-slate-300">“{testimonial.quote}”</p>
                <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-aqua/10 px-4 py-2 text-xs text-brand-aqua">
                  <Star className="h-4 w-4" /> {testimonial.delta}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-slate-400">Memberships</p>
          <h2 className="mt-4 text-3xl font-semibold">Choose your future self</h2>
        </motion.div>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {pricing.map((plan, index) => (
            <motion.div key={plan.name} custom={index * 0.1} variants={fadeUp} className="rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900 to-slate-950 p-8 shadow-glow">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{plan.name}</p>
              <h3 className="mt-4 text-4xl font-semibold">{plan.price}</h3>
              <p className="mt-2 text-sm text-slate-300">{plan.tagline}</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-200">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-brand-aqua" /> {feature}
                  </li>
                ))}
              </ul>
              <button className="mt-8 w-full rounded-2xl border border-brand-aqua/40 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-aqua hover:text-slate-950">
                {plan.highlight}
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 bg-slate-950/90">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">FitMind</p>
            <p className="mt-2 text-sm text-slate-400">Your AI-powered fitness operating system.</p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-slate-300">
            <a href="/contact" className="hover:text-white">Contact</a>
            <a href="/privacy" className="hover:text-white">Privacy</a>
            <a href="/terms" className="hover:text-white">Terms</a>
          </div>
          <div className="flex gap-3 text-xs uppercase tracking-[0.3em] text-slate-400">
            <span>App Store</span>
            <span>Google Play</span>
            <span>IG</span>
            <span>YT</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
