import { Sparkles, Compass, ShieldCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <div className="relative min-h-[450px] w-full rounded-[2.5rem] overflow-hidden bg-[#050a1f] border border-white/5 shadow-2xl flex flex-col items-center justify-center p-8 md:p-16 text-center">
      {/* Background Decorative Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[5%] w-[50%] h-[60%] bg-blue-600/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[50%] bg-purple-600/10 rounded-full blur-[100px] animate-pulse [animation-delay:2s]" />
        <div className="absolute -bottom-[10%] left-[20%] w-[30%] h-[40%] bg-cyan-400/5 rounded-full blur-[80px]" />
      </div>

      {/* Grid Pattern Layer */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`, backgroundSize: '40px 40px' }} />

      {/* Content */}
      <div className="relative z-10 max-w-4xl flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-cyan-400 font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em] mb-8"
        >
          <Sparkles size={14} className="animate-pulse" />
          <span>AI Coach is Active 💡</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight mb-10 font-heading"
        >
          Your journey to your dream job <br className="hidden md:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-primary to-purple-500">
            starts here ⭐
          </span>
        </motion.h1>

        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1, delay: 0.4 }}
           className="space-y-10"
        >
          <div className="flex flex-col gap-6">
            <p className="text-lg md:text-xl text-white font-bold tracking-tight">
              Consistency is the fuel for professional growth 🚀
            </p>

            <p className="text-base md:text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium">
              Sharpen your technical edge and refine your behavioral delivery. 
              Use your personalized path 🎯 to master complex concepts 🧠 
              and simulate real-world challenges 💼 until excellence 
              becomes your default state.
            </p>
          </div>

          {/* New Slogans / Mission Pillars Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-white/10">
            <div className="flex flex-col items-center gap-3 p-4 rounded-[1.5rem] bg-white/5 border border-white/5 backdrop-blur-sm transition-all hover:bg-white/10 group">
              <div className="w-12 h-12 rounded-full bg-cyan-400/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                <Sparkles size={24} />
              </div>
              <h3 className="text-white font-black text-sm uppercase tracking-widest">Learn. Practice. Prove. ✅</h3>
              <p className="text-xs text-slate-500 font-bold">The most recommended path to success.</p>
            </div>

            <div className="flex flex-col items-center gap-3 p-4 rounded-[1.5rem] bg-white/5 border border-white/5 backdrop-blur-sm transition-all hover:bg-white/10 group">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Compass size={24} />
              </div>
              <h3 className="text-white font-black text-sm uppercase tracking-widest">Build Confidence</h3>
              <p className="text-xs text-slate-500 font-bold">Learn the skills. Prove your potential.</p>
            </div>

            <div className="flex flex-col items-center gap-3 p-4 rounded-[1.5rem] bg-white/5 border border-white/5 backdrop-blur-sm transition-all hover:bg-white/10 group">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                <Zap size={24} />
              </div>
              <h3 className="text-white font-black text-sm uppercase tracking-widest">Get Hired</h3>
              <p className="text-xs text-slate-500 font-bold">Practice with AI. Improve your skills.</p>
            </div>
          </div>

          <div className="pt-8 inline-block">
            <p className="text-sm md:text-base text-cyan-400/80 font-bold italic tracking-wide pulse">
              Your future self will thank you for today's effort 🔥
            </p>
          </div>
        </motion.div>

      </div>

      {/* Subtle Floating Elements */}
      <div className="absolute top-1/4 left-10 opacity-20 hidden lg:block animate-bounce [animation-duration:5s]">
        <Compass className="text-white" size={40} strokeWidth={1} />
      </div>
      <div className="absolute bottom-1/4 right-10 opacity-20 hidden lg:block animate-bounce [animation-duration:4s]">
        <ShieldCheck className="text-white" size={40} strokeWidth={1} />
      </div>
      <div className="absolute top-1/3 right-20 opacity-10 hidden lg:block animate-pulse">
        <Zap className="text-white" size={30} strokeWidth={1} />
      </div>
    </div>
  );
};

export default HeroSection;
