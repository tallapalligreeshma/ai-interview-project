import Breadcrumb from "@/layouts/Breadcrumb";
import { 
    Play, 
    Send, 
    Code2, 
    Bot, 
    Info, 
    CheckCircle, 
    AlertTriangle, 
    RefreshCw,
    Terminal,
    Cpu,
    Activity,
    Zap,
    Sparkles,
    Layout
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Editor from "@monaco-editor/react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const CodingPage = () => {
    const [code, setCode] = useState(`function twoSum(nums, target) {
  // Calibrating logic vectors...
  
}`);
    const [theme, setTheme] = useState("vs-dark");
    const [isRunning, setIsRunning] = useState(false);
    const [activeTab, setActiveTab] = useState("description");

    const handleRun = () => {
        setIsRunning(true);
        setTimeout(() => setIsRunning(false), 2000);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-140px)] bg-[#0B0F1A] text-slate-200 font-sans selection:bg-indigo-500/30 overflow-hidden relative page-fade-in">
            {/* Background Ambient Gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#6366F1]/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[700px] h-[700px] bg-[#22D3EE]/10 rounded-full blur-[150px]" />
            </div>

            <header className="relative z-10 px-6 py-4 flex items-center justify-between glass-premium-blue border-b border-white/5">
                <div className="flex items-center gap-4">
                    <div className="bg-[#6366F1]/20 p-2 rounded-xl border border-[#6366F1]/30">
                        <Code2 size={20} className="text-[#6366F1]" />
                    </div>
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 italic block">Intelligence Sync</span>
                        <h2 className="text-xl font-black text-white italic tracking-tighter uppercase">Coding Diagnostic Round</h2>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="hidden md:flex items-center gap-3 bg-emerald-500/10 text-emerald-400 px-5 py-2 rounded-2xl border border-emerald-500/20 shadow-inner">
                        <Activity size={16} className="animate-pulse" />
                        <span className="font-black text-xs italic tracking-tighter uppercase">System Nominal</span>
                    </div>
                    <div className="h-10 w-[1px] bg-white/5" />
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:bg-white/5 rounded-xl border border-transparent hover:border-white/5">
                        <RefreshCw size={18} />
                    </Button>
                </div>
            </header>

            <div className="flex flex-1 gap-6 overflow-hidden mt-6 px-6 pb-6 relative z-10">
                {/* Left Panel: Problem Intelligence */}
                <div className="w-1/3 flex flex-col gap-4 overflow-hidden">
                    <Card className="glass-premium-blue border-white/5 h-full flex flex-col shadow-4xl rounded-[2.5rem] overflow-hidden">
                        <CardContent className="p-0 flex-1 flex flex-col overflow-hidden">
                             <div className="flex border-b border-white/5 bg-white/[0.02]">
                                <button 
                                    onClick={() => setActiveTab("description")}
                                    className={cn(
                                        "flex-1 px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] transition-all relative italic",
                                        activeTab === "description" 
                                        ? "text-white bg-[#6366F1]/10 border-b-2 border-[#6366F1]" 
                                        : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
                                    )}
                                >
                                    Mission Spec
                                </button>
                                <button 
                                    onClick={() => setActiveTab("hints")}
                                    className={cn(
                                        "flex-1 px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] transition-all relative italic",
                                        activeTab === "hints" 
                                        ? "text-white bg-[#6366F1]/10 border-b-2 border-[#6366F1]" 
                                        : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
                                    )}
                                >
                                    Neural Hints
                                </button>
                            </div>

                            <div className="p-10 overflow-y-auto custom-scrollbar flex-1">
                                <AnimatePresence mode="wait">
                                    {activeTab === "description" ? (
                                        <motion.div
                                            key="desc"
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            className="space-y-10"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="px-4 py-1.5 bg-emerald-500/10 text-emerald-400 text-[9px] font-black rounded-full uppercase tracking-widest border border-emerald-500/20 italic">Level: Basic Sync</span>
                                                <span className="text-slate-600 text-[10px] font-black italic uppercase tracking-widest ml-auto">Vector ID: #1042</span>
                                            </div>
                                            
                                            <div className="space-y-4">
                                                <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">Two Sum Protocol</h2>
                                                <div className="h-1 w-20 bg-gradient-to-r from-[#6366F1] to-[#22D3EE] rounded-full" />
                                            </div>

                                            <div className="prose prose-sm prose-invert text-slate-400 space-y-6 max-w-none">
                                                <p className="text-base font-bold italic leading-relaxed">
                                                    Given an array of integers <code className="text-[#22D3EE]">nums</code> and an integer <code className="text-[#22D3EE]">target</code>, return indices of the two numbers such that they add up to <code className="text-[#22D3EE]">target</code>.
                                                </p>
                                                <p className="text-sm font-bold italic text-slate-500 leading-relaxed">
                                                    "You may assume that each input would have exactly one solution, and you may not use the same element twice."
                                                </p>
                                                
                                                <div className="space-y-4 pt-4">
                                                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#6366F1] italic">Simulation Example:</h4>
                                                    <div className="bg-black/40 border border-white/5 p-6 rounded-3xl font-mono text-xs text-indigo-300 shadow-inner group">
                                                        <p className="mb-2 opacity-60"># Initializing test case 01...</p>
                                                        <p className="mb-1"><span className="text-slate-500">INPUT:</span> nums = [2,7,11,15], target = 9</p>
                                                        <p className="mb-1"><span className="text-slate-500">OUTPUT:</span> [0,1]</p>
                                                        <p className="text-[10px] text-slate-600 italic mt-4 group-hover:text-slate-400 smooth-transition">// Logic: nums[0] + nums[1] == 9, returning [0, 1]</p>
                                                    </div>
                                                </div>

                                                <div className="space-y-4 pt-4">
                                                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#22D3EE] italic">Physical Constraints:</h4>
                                                    <ul className="grid grid-cols-1 gap-3 list-none p-0">
                                                        {[
                                                            "2 ≤ nums.length ≤ 10^4",
                                                            "-10^9 ≤ nums[i] ≤ 10^9",
                                                            "-10^9 ≤ target ≤ 10^9"
                                                        ].map((c, i) => (
                                                            <li key={i} className="flex items-center gap-3 text-[11px] font-black text-slate-600 italic uppercase">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span> {c}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="hints"
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 10 }}
                                            className="space-y-8"
                                        >
                                            <div className="glass-premium-blue p-8 rounded-[2.5rem] border-[#6366F1]/20 relative overflow-hidden group shadow-inner">
                                                <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:scale-110 smooth-transition">
                                                    <Zap size={80} className="text-[#6366F1]" />
                                                </div>
                                                <div className="flex items-center gap-4 mb-4">
                                                    <div className="w-10 h-10 bg-[#6366F1]/20 rounded-2xl flex items-center justify-center text-[#6366F1] border border-[#6366F1]/20">
                                                        <Bot size={20} />
                                                    </div>
                                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#6366F1] italic">Neural Suggestion</span>
                                                </div>
                                                <p className="text-sm font-bold text-slate-300 italic leading-relaxed">
                                                    "Consider utilizing a Hash Map to store the difference between the target and current vector. This will secure the complement in O(1) cycles."
                                                </p>
                                            </div>

                                            <div className="glass-premium-blue p-8 rounded-[2.5rem] border-[#22D3EE]/20 relative overflow-hidden group shadow-inner">
                                                <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:scale-110 smooth-transition">
                                                    <Sparkles size={80} className="text-[#22D3EE]" />
                                                </div>
                                                <div className="flex items-center gap-4 mb-4">
                                                    <div className="w-10 h-10 bg-[#22D3EE]/20 rounded-2xl flex items-center justify-center text-[#22D3EE] border border-[#22D3EE]/20">
                                                        <Info size={20} />
                                                    </div>
                                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#22D3EE] italic">Optimization Hub</span>
                                                </div>
                                                <p className="text-sm font-bold text-slate-300 italic leading-relaxed">
                                                    "Validate node count parity. Although constraints ensure 2 nodes, a robust vector check is recommended."
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Panel: Editor and Output */}
                <div className="flex-1 flex flex-col gap-6 overflow-hidden">
                    {/* Editor Hub */}
                    <Card className="flex-1 glass-premium-blue border-white/5 shadow-4xl rounded-[3rem] overflow-hidden flex flex-col relative group">
                        <div className="absolute top-0 left-0 w-2 h-full bg-[#6366F1]/20 group-hover:bg-[#6366F1] smooth-transition" />
                        
                        <div className="bg-white/[0.02] p-6 flex items-center justify-between border-b border-white/5">
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-3">
                                    <Terminal size={18} className="text-[#6366F1]" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white italic">Source: logic.js</span>
                                </div>
                                <div className="h-6 w-[1px] bg-white/5" />
                                <select 
                                    className="bg-transparent border-0 text-[10px] font-black text-slate-500 focus:ring-0 cursor-pointer hover:text-[#6366F1] smooth-transition uppercase tracking-[0.3em] italic"
                                    onChange={(e) => setTheme(e.target.value)}
                                >
                                    <option value="vs-dark">Neural Dark</option>
                                    <option value="light">Light Mode</option>
                                </select>
                            </div>
                            <Button variant="ghost" size="sm" className="h-10 text-[10px] font-black text-slate-500 gap-3 uppercase tracking-widest italic hover:bg-white/5 hover:text-white rounded-2xl">
                                <RefreshCw size={14} />
                                Re-Calibrate
                            </Button>
                        </div>
                        <div className="flex-1 p-2">
                            <Editor
                                height="100%"
                                defaultLanguage="javascript"
                                theme={theme}
                                value={code}
                                onChange={(value) => setCode(value || "")}
                                options={{
                                    fontSize: 15,
                                    fontFamily: "'JetBrains Mono', monospace",
                                    minimap: { enabled: false },
                                    scrollBeyondLastLine: false,
                                    lineNumbers: "on",
                                    automaticLayout: true,
                                    padding: { top: 30, bottom: 30 },
                                    wordWrap: "on",
                                    backgroundColor: 'transparent',
                                    renderLineHighlight: 'all',
                                    cursorStyle: 'block'
                                }}
                            />
                        </div>
                    </Card>

                    {/* Output/Telemetry Hub */}
                    <Card className="h-2/5 glass-premium-blue border-white/5 shadow-4xl flex flex-col overflow-hidden rounded-[3rem] relative">
                         <div className="bg-white/[0.03] p-6 flex items-center justify-between px-10 border-b border-white/5">
                             <div className="flex items-center gap-4">
                                 <Terminal size={18} className="text-[#22D3EE]" />
                                 <span className="text-[10px] font-black uppercase font-black tracking-[0.4em] text-white italic leading-none">Command Telemetry</span>
                             </div>
                             <div className="flex items-center gap-4">
                                <Button 
                                    size="sm" 
                                    className="h-12 px-8 text-[10px] bg-white/5 hover:bg-white/10 text-white border border-white/10 gap-3 font-black uppercase tracking-[0.3em] italic rounded-2xl smooth-transition"
                                    onClick={handleRun}
                                    disabled={isRunning}
                                >
                                    <Play size={16} className={isRunning ? "animate-spin text-[#22D3EE]" : "text-[#22D3EE]"} />
                                    Run Sequence
                                </Button>
                                <Button 
                                    size="sm" 
                                    className="h-12 px-8 text-[10px] bg-[#6366F1] hover:bg-[#6366F1]/90 text-white border-0 gap-3 font-black uppercase tracking-[0.3em] italic rounded-2xl shadow-4xl smooth-transition"
                                >
                                    <Send size={16} />
                                    Push to Production
                                </Button>
                            </div>
                        </div>
                        <div className="flex-1 p-10 font-mono text-sm overflow-y-auto custom-scrollbar bg-black/40 shadow-inner">
                            {isRunning ? (
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-4 text-slate-500 animate-pulse italic">
                                        <div className="w-2 h-2 bg-[#22D3EE] rounded-full shadow-[0_0_10px_#22D3EE]" />
                                        <span>Allocating memory buffers...</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-slate-500 animate-pulse delay-75 italic">
                                        <div className="w-2 h-2 bg-[#6366F1] rounded-full" />
                                        <span>Executing test cases against neural matrix...</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <span className="text-[#6366F1] font-black italic tracking-tighter text-[10px]">[INIT]</span>
                                        <span className="text-slate-500 italic font-bold uppercase text-[11px] tracking-widest">Neural Hub Standby. Waiting for logic injection...</span>
                                    </div>
                                    
                                    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="p-6 glass-premium-blue border-emerald-500/20 rounded-[1.5rem] shadow-inner relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 smooth-transition">
                                            <CheckCircle className="text-emerald-500" size={40} />
                                        </div>
                                        <div className="flex items-center gap-4 mb-3">
                                            <CheckCircle className="text-emerald-400" size={16} />
                                            <span className="text-[10px] font-black text-white uppercase tracking-[0.4em] italic">Simulation Hub: Test 01</span>
                                            <span className="text-emerald-400 text-[10px] font-black uppercase italic ml-auto tracking-widest">Logic Verified</span>
                                        </div>
                                        <p className="text-[11px] font-bold text-slate-500 italic tracking-tight">INPUT: [2,7,11,15], target = 9 | <span className="text-emerald-500/80">OUTPUT SYNCED: [0,1]</span></p>
                                    </motion.div>

                                    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-8 glass-premium-blue border-rose-500/20 rounded-[2rem] relative overflow-hidden shadow-inner group">
                                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 smooth-transition">
                                            <AlertTriangle className="text-rose-500" size={40} />
                                        </div>
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-10 h-10 bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-500 border border-rose-500/20">
                                                <Bot size={20} />
                                            </div>
                                            <span className="text-[10px] font-black text-white uppercase tracking-[0.4em] italic">Neural Critique Hub</span>
                                        </div>
                                        <p className="text-xs font-bold text-slate-400 leading-relaxed italic pr-12">
                                            "Logic confirmed. However, parity analysis detects O(n^2) cycle overhead. Optimize to O(n) for mission-critical throughput."
                                        </p>
                                    </motion.div>
                                </div>
                            )}
                        </div>
                    </Card>
                </div>
            </div>

            <style>{`
                .page-fade-in { animation: fadeIn 0.8s ease-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                .glass-premium-blue {
                    background: rgba(17, 24, 39, 0.7);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }
                .shadow-4xl {
                    box-shadow: 0 20px 50px -20px rgba(0, 0, 0, 0.5), 0 0 1px 1px rgba(255, 255, 255, 0.05) inset;
                }
                .smooth-transition {
                    transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(99, 102, 241, 0.2);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(99, 102, 241, 0.4);
                }
            `}</style>
        </div>
    );
};

export default CodingPage;
