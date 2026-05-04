import { motion } from "framer-motion";
import { Bot, User, Sparkles, MessageSquare } from "lucide-react";

const conversation = [
  {
    role: "ai",
    message: "Welcome to your AI Mock Interview! I'm Coach Alpha. Today we'll discuss React fundamentals. Can you explain the difference between UseMemo and UseCallback?",
  },
  {
    role: "user",
    message: "UseMemo is for memoizing values, especially expensive calculations, while UseCallback is for memoizing function definitions to prevent unnecessary re-renders of child components.",
  },
  {
    role: "ai",
    message: "Excellent! Your explanation is precise. A common follow-up: When would using these hooks actually hurt performance? (Live Feedback: 92% Accuracy)",
    highlight: true,
  },
];

const DemoInterviewUI = () => {
  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
          <MessageSquare className="text-cyan-400" />
          AI Interview <span className="text-primary">Simulation</span>
        </h2>
        <p className="text-slate-400 font-medium">Experience real-time adaptive questioning and instant feedback layers.</p>
      </div>

      <div className="bg-slate-900/60 backdrop-blur-2xl border border-white/5 rounded-[2rem] overflow-hidden p-8 flex flex-col gap-8 shadow-2xl relative">
        {/* Glow behind the UI */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[40%] bg-primary/10 blur-[100px] pointer-events-none" />

        <div className="flex flex-col gap-6 relative z-10">
          {conversation.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: item.role === "ai" ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`flex gap-4 ${item.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border border-white/10 ${
                item.role === "ai" ? "bg-white/5 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]" : "bg-primary text-white"
              }`}>
                {item.role === "ai" ? <Bot size={24} /> : <User size={24} />}
              </div>
              
              <div className={`max-w-[80%] p-6 rounded-3xl ${
                item.role === "ai" 
                ? "bg-white/5 text-slate-200 rounded-tl-none border-l-2 border-cyan-400/50" 
                : "bg-primary/10 text-white rounded-tr-none border-r-2 border-primary/50 text-right"
              }`}>
                <p className="text-sm md:text-base leading-relaxed font-medium">
                  {item.message}
                </p>
                {item.highlight && (
                  <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2">
                    <Sparkles size={14} className="text-yellow-400 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">
                      Real-time analysis active
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mock Input Area */}
        <div className="mt-4 pt-6 border-t border-white/5 flex gap-4">
          <div className="flex-1 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center px-6 text-slate-500 font-medium text-sm italic">
            AI is waiting for your analysis...
          </div>
          <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg">
            <Sparkles size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoInterviewUI;
