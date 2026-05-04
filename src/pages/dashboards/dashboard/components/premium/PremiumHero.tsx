import { Button } from "@/components/ui/button";
import { Sparkles, Mic, Zap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const PremiumHero = () => {
  return (
    <div className="relative min-h-[500px] w-full rounded-[2.5rem] overflow-hidden bg-[#050a1f] border border-white/5 shadow-2xl flex flex-col items-center justify-center p-8 md:p-20 text-center">
      {/* Animated Mesh Gradient Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[70%] bg-primary/20 rounded-full blur-[120px] animate-mesh" />
        <div className="absolute top-[10%] -right-[10%] w-[50%] h-[60%] bg-purple-600/20 rounded-full blur-[120px] animate-mesh [animation-delay:2s]" />
        <div className="absolute -bottom-[20%] left-[20%] w-[40%] h-[50%] bg-cyan-400/10 rounded-full blur-[100px] animate-mesh [animation-delay:4s]" />
      </div>

      {/* Particles/Stars Layer */}
      <div className="absolute inset-0 z-0 particles-bg opacity-40" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-cyan-400 font-bold text-[10px] uppercase tracking-[0.2em] mb-8"
        >
          <Sparkles size={14} className="animate-pulse" />
          <span>Next-Gen AI Interviewer is Live</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight mb-6"
        >
          Ready for your next <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-primary to-purple-500 text-glow">
            Interview?
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12 font-medium leading-relaxed"
        >
          Experience the future of interview prep. Get real-time AI feedback, Master technical rounds, and land your dream job with total confidence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 w-full max-w-xl mx-auto"
        >
          <Button
            size="lg"
            className="flex-1 h-16 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-lg shadow-[0_0_30px_rgba(59,130,246,0.5)] border-none group transition-all"
          >
            <Mic size={20} className="mr-2 group-hover:scale-110 transition-transform" />
            Start Interview
          </Button>
          <div className="flex gap-4 flex-1">
            <Button
              variant="outline"
              size="lg"
              className="flex-1 h-16 rounded-2xl bg-white/5 border-white/10 hover:bg-white/10 text-white font-bold"
            >
              <Zap size={20} className="mr-2 text-yellow-400" />
              Practice
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-16 w-16 rounded-2xl bg-white/5 border-white/10 hover:bg-white/10 text-white flex items-center justify-center p-0"
            >
              <ArrowRight size={20} />
            </Button>
          </div>
        </motion.div>

        {/* Floating Icons for Aesthetic */}
        <motion.div 
            animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -left-12 top-1/4 hidden lg:block p-4 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl"
        >
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Sparkles size={24} />
            </div>
        </motion.div>
        
        <motion.div 
            animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="absolute -right-10 bottom-1/4 hidden lg:block p-4 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl"
        >
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-400">
                <Zap size={24} />
            </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PremiumHero;
