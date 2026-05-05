import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, StopCircle, Volume2, ArrowRight, Activity, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import { useNavigate, useLocation } from "react-router-dom";

import { aiService } from "@/lib/AiService";
import { toast } from "react-toastify";

const dummyQuestion = "Tell me about a time you had to overcome a significant technical challenge.";

const VoiceInterviewPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const selectedRole = location.state?.role;
    
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [feedback, setFeedback] = useState<any>(null);
    const [question, setQuestion] = useState(dummyQuestion);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (selectedRole) {
            fetchRoleQuestion();
        }
    }, [selectedRole]);

    const fetchRoleQuestion = async () => {
        setIsLoading(true);
        try {
            const data = await aiService.generateModuleResponse("technical_mock", {
                role: selectedRole?.title,
                difficulty: 'Medium'
            });
            setQuestion(data.question || `Tell me about your experience as a ${selectedRole.title}.`);
        } catch (err) {
            console.error(err);
            setQuestion(`Explain your core skills in ${selectedRole?.title}.`);
        } finally {
            setIsLoading(false);
        }
    };

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

            recognitionRef.current.onerror = (event: any) => {
                console.error("Speech recognition error", event.error);
                setIsListening(false);
            };
            
            recognitionRef.current.onend = () => {
                // If it ends but we were still listening (e.g. silence timeout), we might auto-submit or pause.
                if(isListening) setIsListening(false); // simple handling for now
            }
        }
        
        return () => {
            if(recognitionRef.current) {
                recognitionRef.current.stop();
            }
            if(synthRef.current) {
                synthRef.current.cancel();
            }
        }
    }, [isListening]);

    const toggleListening = () => {
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
            toast.error("Please record your answer first.");
            return;
        }
        
        setIsAnalyzing(true);

        try {
            const result = await aiService.analyzeVoiceResponse(transcript);
            
            setFeedback({
                score: result.confidenceScore * 10,
                confidence: result.confidenceScore,
                fluency: result.clarityFluencyFeedback,
                grammar: result.grammarCorrections,
                text: result.improvedVersion,
                decision: result.confidenceScore >= 8 ? 'Hire' : result.confidenceScore >= 5 ? 'Maybe' : 'Not Hire'
            });

            // Read feedback automatically
            if (synthRef.current && result.improvedVersion) {
                const utterance = new SpeechSynthesisUtterance("Here is an improved version of your response: " + result.improvedVersion);
                synthRef.current.speak(utterance);
            }
        } catch (error: any) {
            console.error("Voice Analysis Error:", error);
            toast.error("Evaluation failed. Please try again.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="flex flex-col min-h-[calc(100vh-140px)] bg-[#0B0F1A] p-6 lg:p-12 relative overflow-hidden dark text-white">
            
            {/* Background Neon Elements */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col gap-10 mt-6 min-h-[70vh] items-center justify-center">
                
                <div className="text-center space-y-4">
                    <Badge variant="outline" className="text-cyan-400 border-cyan-400/30 uppercase tracking-widest bg-cyan-400/10 px-4 py-1 gap-2">
                        <Activity size={16} /> Live {selectedRole?.title || 'Voice'} Analysis
                    </Badge>
                    <h2 className="text-3xl lg:text-4xl font-black text-white leading-tight">
                        {isLoading ? "Generating your challenge..." : question}
                    </h2>
                </div>

                <AnimatePresence mode="wait">
                    {!feedback ? (
                        <motion.div 
                            key="recording-view"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            className="w-full max-w-3xl glass-dark border border-white/10 rounded-[3rem] p-12 flex flex-col items-center gap-12 shadow-2xl relative"
                        >
                            {/* Live Waveform (Mocked with CSS animation when active) */}
                            <div className="h-16 flex items-end justify-center gap-2">
                                {[...Array(12)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={isListening ? { height: ["20%", "100%", "20%"] } : { height: "20%" }}
                                        transition={{ duration: 0.8, repeat: isListening ? Infinity : 0, delay: i * 0.05, ease: "easeInOut" }}
                                        className="w-3 bg-cyan-400 rounded-full opacity-80"
                                        style={{ height: '20%' }}
                                    />
                                ))}
                            </div>

                            <button 
                                onClick={toggleListening}
                                className="relative group focus:outline-none"
                            >
                                {isListening && (
                                    <motion.div 
                                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="absolute inset-0 bg-cyan-500 rounded-full -z-10"
                                    />
                                )}
                                <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${isListening ? 'bg-cyan-500 shadow-[0_0_40px_rgba(6,182,212,0.6)]' : 'bg-slate-800 border border-slate-700 hover:border-cyan-500/50 hover:bg-slate-700 group-hover:scale-105'}`}>
                                    {isListening ? <StopCircle size={48} className="text-white" /> : <Mic size={48} className="text-cyan-400" />}
                                </div>
                            </button>

                            <div className="w-full min-h-[120px] bg-black/30 rounded-2xl p-6 border border-white/5 font-medium text-slate-300 text-center relative overflow-hidden">
                                {isListening && <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-[shimmer_2s_infinite]" />}
                                {transcript || <span className="text-slate-600 italic">Press the microphone and start speaking...</span>}
                            </div>

                            <Button 
                                onClick={handleSubmit}
                                disabled={!transcript || isAnalyzing}
                                className="w-full h-16 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-black uppercase tracking-widest text-sm transition-all"
                            >
                                {isAnalyzing ? "Analyzing Voice & Content..." : "Submit Response"}
                            </Button>
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="feedback-view"
                            initial={{ opacity: 0, scale: 0.9, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            className="w-full max-w-3xl glass-dark border border-white/10 rounded-[3rem] p-12 flex flex-col items-center text-center gap-8 shadow-2xl relative"
                        >
                            <div className="absolute top-6 right-6">
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="rounded-full bg-white/5 hover:bg-white/10 text-cyan-400"
                                    onClick={() => {
                                        if (synthRef.current) {
                                            if (synthRef.current.speaking) {
                                                synthRef.current.cancel();
                                            } else {
                                                const utterance = new SpeechSynthesisUtterance(feedback.text);
                                                synthRef.current.speak(utterance);
                                            }
                                        }
                                    }}
                                >
                                    <Volume2 size={20} />
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full text-left">
                                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                                    <span className="text-[10px] font-black uppercase text-cyan-400 tracking-widest">Fluency & Clarity</span>
                                    <p className="text-xs text-slate-300 italic">"{feedback.fluency}"</p>
                                </div>
                                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                                    <span className="text-[10px] font-black uppercase text-purple-400 tracking-widest">Grammar Analysis</span>
                                    <p className="text-xs text-slate-300 italic">"{feedback.grammar}"</p>
                                </div>
                            </div>

                            <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 text-left w-full space-y-3">
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase text-cyan-400 tracking-widest">
                                    <Sparkles size={14} /> AI Improved Version
                                </div>
                                <p className="text-sm font-medium text-white/90 leading-relaxed italic">
                                    "{feedback.text}"
                                </p>
                            </div>

                            <div className="flex gap-4 w-full mt-6">
                                <Button 
                                    variant="outline"
                                    onClick={() => { setFeedback(null); setTranscript(""); }}
                                    className="flex-1 h-14 rounded-xl border-white/10 text-white hover:bg-white/5 font-black uppercase tracking-widest text-xs"
                                >
                                    Try Again
                                </Button>
                                <Button 
                                    onClick={() => navigate('/interview/result')}
                                    className="flex-[2] h-14 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-black uppercase tracking-widest text-xs group"
                                >
                                    Next Challenge <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            
            <style>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </div>
    );
};

export default VoiceInterviewPage;
