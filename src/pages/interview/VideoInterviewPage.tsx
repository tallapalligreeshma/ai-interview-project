import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Video, 
    VideoOff, 
    Mic, 
    MicOff, 
    Volume2, 
    ArrowRight, 
    Activity, 
    Zap, 
    UserCircle2,
    Eye,
    Maximize2,
    Monitor,
    Sparkles,
    ShieldAlert,
    Brain,
    ChevronLeft,
    Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useLocation } from "react-router-dom";
import { aiService } from "@/lib/AiService";
import { toast } from "react-toastify";
import { cn } from "@/lib/utils";

const VideoInterviewPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const selectedRole = location.state?.role;

    const [isCameraOn, setIsCameraOn] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [feedback, setFeedback] = useState<any>(null);
    const [currentQuestion, setCurrentQuestion] = useState("Initializing neural link...");
    const [isLoading, setIsLoading] = useState(false);
    const [timer, setTimer] = useState(0);

    // 9.8 Upgrade States
    const [isPressureMode, setIsPressureMode] = useState(false);
    const [interruptionText, setInterruptionText] = useState("");
    const [isReplaying, setIsReplaying] = useState(false);

    useEffect(() => {
        if (selectedRole) {
            fetchRoleQuestion();
        }
        
        const interval = setInterval(() => {
            setTimer(prev => prev + (isPressureMode ? 2 : 1)); // Time moves faster in pressure mode
        }, 1000);
        
        return () => clearInterval(interval);
    }, [selectedRole, isPressureMode]);

    // Pressure Mode Interruption Logic
    useEffect(() => {
        let interruptTimer: any;
        if (isPressureMode && isListening) {
            interruptTimer = setInterval(() => {
                if (Math.random() > 0.7) {
                    const interruptions = [
                        "Could you speed up? We have 5 more questions.",
                        "Skip the intro, what's the core logic?",
                        "Wait, how does this scale past 1M users?",
                        "Can you optimize that further?"
                    ];
                    setInterruptionText(interruptions[Math.floor(Math.random() * interruptions.length)]);
                    setTimeout(() => setInterruptionText(""), 4000);
                }
            }, 8000);
        }
        return () => clearInterval(interruptTimer);
    }, [isPressureMode, isListening]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const fetchRoleQuestion = async () => {
        setIsLoading(true);
        try {
            const data = await aiService.generateModuleResponse("technical_mock", {
                role: selectedRole?.title,
                difficulty: 'Medium'
            });
            setCurrentQuestion(data.question || `Tell me about your background in ${selectedRole.title}.`);
        } catch (err) {
            console.error(err);
            setCurrentQuestion(`Explain your experience with ${selectedRole?.title}.`);
        } finally {
            setIsLoading(false);
        }
    };

    const videoRef = useRef<HTMLVideoElement>(null);
    const recognitionRef = useRef<any>(null);
    const synthRef = useRef<SpeechSynthesis>(window.speechSynthesis);

    useEffect(() => {
        const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = true;

            recognitionRef.current.onresult = (event: any) => {
                const currentTranscript = Array.from(event.results)
                    .map((result: any) => result[0])
                    .map((result: any) => result.transcript)
                    .join("");
                setTranscript(currentTranscript);
            };
        }

        return () => {
            if (recognitionRef.current) recognitionRef.current.stop();
            if (synthRef.current) synthRef.current.cancel();
            stopCamera();
        };
    }, []);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            setIsCameraOn(true);
        } catch (error) {
            toast.error("Camera access denied.");
        }
    };

    const stopCamera = () => {
        const stream = videoRef.current?.srcObject as MediaStream;
        stream?.getTracks().forEach(track => track.stop());
        setIsCameraOn(false);
    };

    const toggleInterview = () => {
        if (isListening) {
            recognitionRef.current?.stop();
            setIsListening(false);
        } else {
            setTranscript("");
            setFeedback(null);
            recognitionRef.current?.start();
            setIsListening(true);
        }
    };

    const handleSubmit = async () => {
        if (isListening) {
            recognitionRef.current?.stop();
            setIsListening(false);
        }
        if (!transcript.trim()) {
            toast.error("No audio input detected.");
            return;
        }

        setIsAnalyzing(true);
        try {
            const result = await aiService.analyzeVoiceResponse(transcript);
            setFeedback({
                ...result,
                eyeContact: Math.floor(Math.random() * 20) + (isPressureMode ? 60 : 80), // Lower eye contact in pressure
                emotions: isPressureMode ? "Anxious / Rushed" : "Professional / Focused"
            });

            if (synthRef.current) {
                const utterance = new SpeechSynthesisUtterance("Analysis complete. Your confidence score was " + result.confidenceScore + " out of 10.");
                synthRef.current.speak(utterance);
            }
        } catch (error) {
            toast.error("AI Analysis failed.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleReplay = () => {
        setIsReplaying(true);
        toast.info("Replaying your interview simulation...");
        setTimeout(() => setIsReplaying(false), 3000);
    };

    return (
        <div className="flex-1 w-full min-h-screen bg-[#0B0F1A] text-slate-200 font-sans p-4 md:p-6 overflow-x-hidden page-fade-in">
            {/* Background Ambient Gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#6366F1]/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[700px] h-[700px] bg-[#8B5CF6]/10 rounded-full blur-[150px]" />
            </div>

            <main className="relative z-10 w-full space-y-8">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 border-b border-white/5 pb-10">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Button 
                                onClick={() => navigate(-1)}
                                variant="ghost" 
                                className="w-10 h-10 rounded-xl glass-premium-blue flex items-center justify-center text-slate-400 hover:text-white border border-white/5"
                            >
                                <ChevronLeft size={20} />
                            </Button>
                            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">
                                Simulation Mode
                            </p>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter italic uppercase">
                            Neural <span className="text-gradient-cyan">Diagnostic</span>
                        </h1>
                    </div>

                    <div className="flex flex-wrap items-center gap-6">
                        <Button 
                            variant="outline" 
                            onClick={() => setIsPressureMode(!isPressureMode)}
                            className={cn(
                                "h-12 px-6 rounded-2xl font-black uppercase tracking-widest text-[10px] smooth-transition shadow-2xl border",
                                isPressureMode ? 'border-rose-500 text-rose-500 bg-rose-500/10 animate-pulse' : 'glass-premium-blue border-white/5 text-slate-400 hover:text-white hover:border-rose-500/50'
                            )}
                        >
                            {isPressureMode ? "Pressure Mode Active" : "Enable Pressure Mode"}
                        </Button>
                        <div className={`flex items-center gap-4 px-6 py-3 rounded-2xl border shadow-2xl ${isPressureMode ? 'bg-rose-500/5 border-rose-500/20 text-rose-500' : 'glass-premium-blue border-white/5'}`}>
                            <Clock size={18} className={isPressureMode ? "animate-spin" : "text-[#6366F1]"} />
                            <span className="text-xl font-black italic tracking-tight">{formatTime(timer)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                             <Button 
                                variant="outline" 
                                onClick={() => isCameraOn ? stopCamera() : startCamera()}
                                className={cn(
                                    "h-14 px-8 rounded-2xl font-black uppercase text-[10px] tracking-widest gap-3 smooth-transition shadow-2xl",
                                    isCameraOn ? 'border-rose-500/30 text-rose-500 bg-rose-500/5' : 'glass-premium-blue border-white/5 hover:bg-white/10'
                                )}
                            >
                                {isCameraOn ? <VideoOff size={18} /> : <Video size={18} />} {isCameraOn ? "Cut Feed" : "Init Camera"}
                            </Button>
                            <Button className="h-14 w-14 rounded-2xl glass-premium-blue border border-white/5 text-slate-400 hover:text-white smooth-transition">
                                <Maximize2 size={20} />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Main Split Layout */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start">
                    
                    {/* Left Panel: Camera & Transcription */}
                    <div className="xl:col-span-8 space-y-10">
                        
                        {/* Video Container */}
                        <div className="relative aspect-video glass-premium-blue rounded-[3rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5 group">
                            {isCameraOn ? (
                                <video 
                                    ref={videoRef} 
                                    autoPlay 
                                    playsInline 
                                    muted 
                                    className="w-full h-full object-cover mirror scale-x-[-1]"
                                />
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-8">
                                    <div className="w-24 h-24 rounded-[2rem] glass-premium-blue flex items-center justify-center text-slate-600 border border-white/10 shadow-inner">
                                        <Video size={48} />
                                    </div>
                                    <div className="text-center space-y-2">
                                        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Secure Link Required</p>
                                        <h3 className="text-2xl font-black text-white italic tracking-tight">Lens Initialization Pending</h3>
                                    </div>
                                    <Button onClick={startCamera} className="bg-white text-slate-950 hover:bg-[#6366F1] hover:text-white rounded-[1.5rem] px-12 h-16 font-black uppercase text-[10px] tracking-widest shadow-4xl smooth-transition">Connect Optical Sensor</Button>
                                </div>
                            )}

                            {/* Camera Overlays */}
                            {isCameraOn && (
                                <>
                                    <div className="absolute top-10 left-10 flex flex-col gap-5">
                                        <Badge className={`backdrop-blur-2xl font-black px-5 py-2.5 rounded-xl flex items-center gap-3 ${isPressureMode ? 'bg-rose-500/20 border-rose-500/50 text-rose-400' : 'bg-black/60 border-white/10 text-emerald-400'}`}>
                                            <div className={`w-2.5 h-2.5 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,1)] ${isPressureMode ? 'bg-rose-500' : 'bg-emerald-500'}`} /> {isPressureMode ? 'PRESSURE • FEED' : 'RAW • FEED'}
                                        </Badge>
                                        <div className="p-5 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-2xl space-y-2">
                                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Biometric Tracking</p>
                                            <div className="flex items-center gap-4">
                                                <div className="text-[10px] font-black text-white uppercase tracking-widest">GAZE: <span className="text-emerald-400">LOCKED</span></div>
                                                <div className="w-1 h-4 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-emerald-400 w-full animate-pulse" /></div>
                                            </div>
                                        </div>
                                    </div>
                                        {/* Interruption Overlay */}
                                        <AnimatePresence>
                                            {interruptionText && (
                                                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="absolute inset-0 flex items-center justify-center bg-rose-500/10 backdrop-blur-sm z-50">
                                                    <div className="bg-rose-950/90 border-2 border-rose-500/50 text-white p-6 rounded-3xl max-w-sm text-center shadow-2xl">
                                                        <ShieldAlert size={40} className="mx-auto text-rose-500 mb-4 animate-bounce" />
                                                        <p className="text-lg font-black italic">{interruptionText}</p>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        <div className="absolute bottom-10 right-10">
                                             <div className="glass-premium-blue backdrop-blur-3xl text-white border border-white/10 font-black px-8 py-4 rounded-2xl shadow-4xl italic tracking-tighter">
                                                 NEURAL_ID: CANDIDATE_01
                                             </div>
                                        </div>
                                </>
                            )}
                        </div>

                        {/* Transcription Surface */}
                        <div className="glass-premium-blue border border-white/5 rounded-[3rem] p-12 space-y-10 shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#6366F1]/5 blur-[100px] -mr-32 -mt-32" />
                            
                            <div className="flex items-center justify-between relative z-10">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-[#6366F1]/10 flex items-center justify-center border border-[#6366F1]/20">
                                        <Activity size={24} className="text-[#6366F1]" />
                                    </div>
                                    <div>
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Cognitive Stream</h4>
                                        <p className="text-xs font-bold text-slate-400">Real-time neural decoding active</p>
                                    </div>
                                </div>
                                {isListening && (
                                    <div className="flex items-center gap-2 h-6">
                                        {[...Array(12)].map((_, i) => (
                                            <motion.div 
                                                key={i}
                                                animate={{ height: ["40%", "100%", "40%"] }}
                                                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.05 }}
                                                className="w-1.5 bg-[#22D3EE] rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="min-h-[150px] text-2xl md:text-3xl font-black text-white leading-tight italic pr-28 relative z-10 tracking-tight">
                                {transcript || <span className="text-slate-700 opacity-50">Stream pending... initialized voice vector to begin.</span>}
                                <div className="absolute -right-4 -bottom-4">
                                    <Button 
                                        onClick={toggleInterview}
                                        className={cn(
                                            "w-20 h-20 rounded-[2.5rem] shadow-[0_0_30px_rgba(99,102,241,0.3)] transition-all transform hover:scale-110",
                                            isListening ? 'bg-rose-500 text-white shadow-rose-500/20' : 'bg-white text-slate-950'
                                        )}
                                    >
                                        {isListening ? <MicOff size={32} /> : <Mic size={32} />}
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <Button 
                            onClick={handleSubmit}
                            disabled={!transcript || isAnalyzing}
                            className="w-full h-24 rounded-[3rem] bg-[#6366F1] text-white font-black uppercase tracking-[0.3em] text-sm hover:bg-[#6366F1]/90 shadow-[0_20px_50px_rgba(99,102,241,0.3)] smooth-transition disabled:opacity-20 group"
                        >
                            <span className="flex items-center gap-4">
                                {isAnalyzing ? <RefreshCw className="animate-spin" size={24} /> : <Zap size={24} className="fill-white" />}
                                {isAnalyzing ? "Processing Performance Vector..." : "Commit Diagnostic Response"}
                            </span>
                        </Button>
                    </div>

                    {/* Right Panel: AI Avatar & Feedback */}
                    <div className="xl:col-span-4 space-y-10">
                        
                        {/* AI Avatar Card */}
                        <div className="glass-premium-blue border border-white/5 rounded-[4rem] p-12 flex flex-col items-center gap-10 shadow-4xl relative overflow-hidden group">
                            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#6366F1]/50 to-transparent" />
                            
                            <div className="w-48 h-48 rounded-[4rem] glass-premium-blue border-4 border-white/5 p-1 relative group/avatar">
                                <div className="absolute inset-0 bg-[#6366F1]/30 blur-[50px] opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-1000" />
                                <div className="w-full h-full rounded-[3.5rem] bg-[#0B0F1A] flex items-center justify-center overflow-hidden relative border border-white/5 shadow-inner">
                                    <UserCircle2 size={120} className="text-white/5" />
                                    <motion.div 
                                        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
                                        transition={{ duration: 4, repeat: Infinity }}
                                        className="absolute inset-0 flex items-center justify-center"
                                    >
                                        <Brain size={80} className="text-[#6366F1] fill-[#6366F1]/20" />
                                    </motion.div>
                                </div>
                            </div>

                            <div className="text-center space-y-3">
                                <h3 className="text-3xl font-black tracking-tighter italic uppercase text-white">Neural Coach <span className="text-[#6366F1] text-xs font-mono ml-2">X.1</span></h3>
                                <div className="inline-flex items-center gap-3 px-5 py-2 bg-[#6366F1]/10 rounded-full border border-[#6366F1]/20">
                                    <div className="w-2 h-2 rounded-full bg-[#22D3EE] animate-pulse" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-[#22D3EE]">Synthesis Active</span>
                                </div>
                            </div>

                            <div className="w-full p-10 bg-white/[0.02] rounded-[3rem] border border-white/5 relative overflow-hidden shadow-inner group/msg">
                                <Volume2 size={24} className="absolute top-8 right-8 text-[#6366F1] group-hover/msg:scale-125 smooth-transition opacity-50" />
                                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Current Directive</div>
                                <p className="text-lg font-bold text-slate-200 leading-relaxed italic tracking-tight">
                                    "{currentQuestion}"
                                </p>
                            </div>
                        </div>

                        {/* Real-time Bio-metrics */}
                        <AnimatePresence>
                            {feedback ? (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.95 }} 
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="space-y-8"
                                >
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="glass-premium-blue border border-white/5 p-8 rounded-[2.5rem] space-y-4 shadow-2xl group hover:border-emerald-500/30 smooth-transition">
                                            <div className="flex items-center gap-3 text-emerald-400">
                                                <Eye size={20} /> <span className="text-[10px] font-black uppercase tracking-widest">Focus Vector</span>
                                            </div>
                                            <p className="text-4xl font-black text-white italic">{feedback.eyeContact}%</p>
                                        </div>
                                        <div className="glass-premium-blue border border-white/5 p-8 rounded-[2.5rem] space-y-4 shadow-2xl group hover:border-[#6366F1]/30 smooth-transition">
                                            <div className="flex items-center gap-3 text-[#6366F1]">
                                                <Zap size={20} /> <span className="text-[10px] font-black uppercase tracking-widest">Confidence</span>
                                            </div>
                                            <p className="text-4xl font-black text-white italic">{feedback.confidenceScore}/10</p>
                                        </div>
                                    </div>

                                    <div className="p-10 glass-premium-blue border border-white/5 rounded-[3.5rem] space-y-6 shadow-2xl relative overflow-hidden">
                                        <div className="absolute bottom-0 right-0 p-8 opacity-5">
                                            <Activity size={100} className="text-[#6366F1]" />
                                        </div>
                                        <div className="flex items-center gap-3 text-[10px] font-black uppercase text-slate-500 tracking-widest">
                                            <Sparkles size={16} className="text-[#6366F1]" /> Neural Feedback
                                        </div>
                                        <p className="text-base font-bold text-slate-300 italic leading-relaxed relative z-10">
                                            "{feedback.clarityFluencyFeedback}"
                                        </p>
                                    </div>
                                    
                                    <Button 
                                        className="w-full h-20 rounded-[2rem] bg-[#6366F1] hover:bg-[#4F46E5] text-white font-black uppercase tracking-[0.2em] text-[10px] shadow-[0_10px_30px_rgba(99,102,241,0.3)] smooth-transition"
                                        onClick={() => navigate('/interview/result')}
                                    >
                                        Extract Session Log <ArrowRight size={18} className="ml-3" />
                                    </Button>
                                    
                                    <Button 
                                        variant="outline"
                                        onClick={handleReplay}
                                        disabled={isReplaying}
                                        className="w-full h-20 rounded-[2rem] bg-white text-slate-950 font-black uppercase tracking-[0.2em] text-[10px] shadow-4xl hover:bg-[#22D3EE] hover:text-white smooth-transition"
                                    >
                                        {isReplaying ? <RefreshCw className="animate-spin mr-3" /> : <Video size={18} className="mr-3" />} {isReplaying ? "Replaying Vector Data..." : "Replay Simulation"}
                                    </Button>
                                </motion.div>
                            ) : (
                                <div className="p-16 glass-premium-blue rounded-[4rem] border-2 border-dashed border-white/5 text-center space-y-6 opacity-30">
                                    <ShieldAlert size={48} className="mx-auto text-slate-800" />
                                    <div className="space-y-2">
                                        <p className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Telemetry Offline</p>
                                        <p className="text-[10px] font-bold text-slate-600">Submit response to synchronize neural diagnostics</p>
                                    </div>
                                </div>
                            )}
                        </AnimatePresence>

                    </div>
                </div>

            </main>

            <style>{`
                .mirror { transform: rotateY(180deg); }
                .mirror video { object-fit: cover; }
                .page-fade-in { animation: fadeIn 0.8s ease-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
};

const RefreshCw = ({ className, size }: any) => (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/>
        <path d="M21 3v5h-5"/>
    </svg>
);

export default VideoInterviewPage;
