import * as React from 'react';

// Using Hardcoded HEX colors to avoid html2canvas oklch parsing errors
const COLORS = {
    primary: '#6366F1', // Indigo
    cyan: '#22D3EE',
    slate900: '#0B0F1A',
    slate800: '#111827',
    slate700: '#1F2937',
    slate500: '#64748b',
    slate400: '#94a3b8',
    slate200: '#e2e8f0',
    slate100: '#f1f5f9',
    slate50: '#f8fafc',
    amber500: '#f59e0b',
    rose500: '#ef4444',
    emerald500: '#10b981',
    emerald50: '#ecfdf5'
};

export const AptitudeBasicsNotesTemplate = React.forwardRef<HTMLDivElement>((_, ref) => {
    return (
        <div ref={ref} style={{ color: COLORS.slate900, backgroundColor: 'white' }} className="p-16 max-w-[900px] mx-auto font-sans leading-relaxed relative overflow-hidden">
            {/* Background Geometric Accent */}
            <div style={{ backgroundColor: COLORS.primary, opacity: 0.03 }} className="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <header style={{ borderBottom: `2px solid ${COLORS.slate100}` }} className="pb-12 mb-12 relative z-10">
                <div className="flex justify-between items-start">
                    <div>
                        <span style={{ color: COLORS.primary }} className="text-[10px] font-black uppercase tracking-[0.4em] italic block mb-3">Intelligence Protocol</span>
                        <h1 style={{ color: COLORS.slate900 }} className="text-5xl font-black italic tracking-tighter uppercase leading-none m-0">Aptitude <span style={{ color: COLORS.primary }}>Mastery</span></h1>
                        <p style={{ color: COLORS.slate500 }} className="text-sm font-bold uppercase tracking-widest mt-4">Systematic Knowledge Extraction Guide</p>
                    </div>
                    <div className="text-right">
                        <div style={{ border: `1px solid ${COLORS.primary}`, color: COLORS.primary }} className="inline-block px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest italic">
                            Ver: 4.0 Neural Sync
                        </div>
                    </div>
                </div>
            </header>

            {/* 1. Number System */}
            <section className="mb-14 relative z-10">
                <div className="flex items-center gap-4 mb-8">
                    <div style={{ backgroundColor: COLORS.slate900 }} className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black italic text-xs">01</div>
                    <h2 style={{ color: COLORS.slate900 }} className="text-2xl font-black italic uppercase tracking-tighter">Number System Core</h2>
                </div>
                <div style={{ backgroundColor: COLORS.slate50, border: `1px solid ${COLORS.slate100}` }} className="rounded-[2.5rem] p-10 mb-6">
                    <h3 style={{ color: COLORS.primary }} className="text-xs font-black uppercase tracking-widest mb-4 italic flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-indigo-500"></span> Fundamental Architecture
                    </h3>
                    <ul className="grid grid-cols-2 gap-y-3 gap-x-8 list-none p-0 m-0">
                        {['Natural, Whole, Integers', 'Prime and Composite logic', 'Factors & Global Multiples', 'Modular Divisibility Rules'].map((item, i) => (
                            <li key={i} className="text-sm font-bold text-slate-600 flex items-center gap-3">
                                <span style={{ backgroundColor: COLORS.slate200 }} className="w-1.5 h-1.5 rounded-full"></span> {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <div style={{ borderLeft: `4px solid ${COLORS.primary}`, backgroundColor: COLORS.slate50 }} className="p-6 rounded-2xl">
                        <p style={{ color: COLORS.primary }} className="text-[10px] font-black uppercase tracking-widest mb-3 italic">📌 Critical Vectors</p>
                        <p className="text-xs font-bold text-slate-500 leading-relaxed italic">• Prime: Logic divisible only by parity 1 and itself</p>
                        <p className="text-xs font-bold text-slate-500 leading-relaxed italic">• Even parity always divisible by 2-stream</p>
                    </div>
                    <div style={{ borderLeft: `4px solid ${COLORS.amber500}`, backgroundColor: '#FFFBEB' }} className="p-6 rounded-2xl">
                        <p style={{ color: COLORS.amber500 }} className="text-[10px] font-black uppercase tracking-widest mb-3 italic">⚡ Rapid Injection</p>
                        <p className="text-xs font-bold text-slate-700 leading-relaxed italic">• Div by 3: Sum of nodes divisible by 3</p>
                        <p className="text-xs font-bold text-slate-700 leading-relaxed italic">• Div by 9: Sum of nodes divisible by 9-protocol</p>
                    </div>
                </div>
            </section>

            {/* 2. Simplification */}
            <section className="mb-14 relative z-10">
                <div className="flex items-center gap-4 mb-8">
                    <div style={{ backgroundColor: COLORS.slate900 }} className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black italic text-xs">02</div>
                    <h2 style={{ color: COLORS.slate900 }} className="text-2xl font-black italic uppercase tracking-tighter">Logic Simplification</h2>
                </div>
                <div style={{ border: `1px solid ${COLORS.slate100}`, backgroundColor: 'white' }} className="rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
                        <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M2 12h20" /></svg>
                    </div>
                    <p style={{ color: COLORS.primary }} className="text-sm font-black italic mb-4 uppercase tracking-widest">Protocol: BODMAS</p>
                    <p className="text-base font-bold text-slate-600 italic leading-relaxed">
                        Priority synchronization: <span style={{ color: COLORS.slate900 }}>Bracket → Order → Division → Multiplication → Addition → Subtraction.</span>
                    </p>
                    <div style={{ backgroundColor: COLORS.slate50 }} className="mt-8 p-6 rounded-2xl border border-slate-100 flex items-center gap-4">
                        <div style={{ color: COLORS.cyan }} className="shrink-0 font-black italic text-[10px] uppercase tracking-widest">Speed Hack</div>
                        <p className="text-[11px] font-bold text-slate-500 italic">Convert fractional nodes to decimal streams | Execute approximate logic for high-velocity results.</p>
                    </div>
                </div>
            </section>

            {/* 3. Percentages */}
            <section className="mb-14 relative z-10">
                <div className="flex items-center gap-4 mb-8">
                    <div style={{ backgroundColor: COLORS.slate900 }} className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black italic text-xs">03</div>
                    <h2 style={{ color: COLORS.slate900 }} className="text-2xl font-black italic uppercase tracking-tighter">Percentage Scaling</h2>
                </div>
                <div style={{ backgroundColor: COLORS.slate900, color: 'white' }} className="rounded-[3rem] p-12 shadow-xl">
                    <div className="grid grid-cols-2 gap-10">
                        <div>
                            <p style={{ color: COLORS.cyan }} className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 italic">Scaling Matrix</p>
                            <div className="space-y-4 text-xs font-mono font-black italic text-indigo-300">
                                <p className="flex justify-between border-b border-white/5 pb-2"><span>% VALUE</span> <span>(V / T) × 100</span></p>
                                <p className="flex justify-between border-b border-white/5 pb-2"><span>INC PROTOCOL</span> <span>[(N - O) / O] × 100</span></p>
                                <p className="flex justify-between border-b border-white/5 pb-2"><span>DEC PROTOCOL</span> <span>[(O - N) / O] × 100</span></p>
                            </div>
                        </div>
                        <div style={{ backgroundColor: 'white' }} className="p-8 rounded-[2rem]">
                            <p style={{ color: COLORS.slate900 }} className="text-[10px] font-black uppercase tracking-widest mb-4 italic">Injection Shortcuts</p>
                            <div className="grid grid-cols-2 gap-4">
                                {['10%: Div/10', '20%: Div/5', '25%: Div/4', '50%: Half-Scale'].map((item, i) => (
                                    <div key={i} style={{ border: `1px solid ${COLORS.slate100}` }} className="p-3 rounded-xl text-[10px] font-black italic text-slate-500 text-center">
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4-6 Quick Sync */}
            <div className="grid grid-cols-2 gap-8 mb-14">
                <section className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                        <div style={{ backgroundColor: COLORS.slate900 }} className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black italic text-[10px]">04</div>
                        <h2 style={{ color: COLORS.slate900 }} className="text-lg font-black italic uppercase tracking-tighter">Ratio Stream</h2>
                    </div>
                    <div style={{ backgroundColor: COLORS.slate50 }} className="p-8 rounded-[2rem] border border-slate-100">
                        <p className="text-xs font-bold text-slate-600 leading-relaxed italic">
                            Stream comparison: a:b = a/b protocol.
                            <br/><br/>
                            If a:b = c:d sync → <span style={{ color: COLORS.primary }}>ad = bc logic.</span>
                        </p>
                    </div>
                </section>
                <section className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                        <div style={{ backgroundColor: COLORS.slate900 }} className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black italic text-[10px]">05</div>
                        <h2 style={{ color: COLORS.slate900 }} className="text-lg font-black italic uppercase tracking-tighter">Averages</h2>
                    </div>
                    <div style={{ backgroundColor: COLORS.slate50 }} className="p-8 rounded-[2rem] border border-slate-100">
                        <p className="text-xs font-bold text-slate-600 leading-relaxed italic">
                            Matrix: Average = (Node Sum) / (Node Count).
                            <br/><br/>
                            <span style={{ color: COLORS.emerald500 }}>Hack: Use deviation sync to reduce cycles.</span>
                        </p>
                    </div>
                </section>
            </div>

            {/* 🎯 Study Sync Order */}
            <section style={{ backgroundColor: COLORS.emerald50, border: `2px solid ${COLORS.emerald500}` }} className="p-10 rounded-[3rem] mb-14 relative z-10">
                <h2 style={{ color: COLORS.emerald500 }} className="text-xl font-black italic uppercase tracking-tighter mb-4 flex items-center gap-3">
                    🎯 Neural Sync Protocol (MANDATORY)
                </h2>
                <p className="text-sm font-black text-slate-700 italic tracking-tight leading-relaxed uppercase">
                    Numbers → Simplification → Percentages → Ratio Sync → Average Hub → Interest Vectors (SI/CI)
                </p>
            </section>

            {/* 🚀 System Finalization */}
            <section style={{ backgroundColor: COLORS.slate900 }} className="p-12 rounded-[3.5rem] text-white relative overflow-hidden z-10 shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                   <svg width="100%" height="100%"><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/></pattern><rect width="100%" height="100%" fill="url(#grid)"/></svg>
                </div>
                <h2 style={{ color: COLORS.cyan }} className="text-2xl font-black italic uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                    🚀 Mission Directives
                </h2>
                <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-[11px] font-black uppercase tracking-widest italic">
                    <p className="flex items-center gap-3 text-emerald-400">✔ Sync Formulas to Neural Core</p>
                    <p className="flex items-center gap-3 text-emerald-400">✔ Execute 30-Node daily practice</p>
                    <p className="flex items-center gap-3 text-emerald-400">✔ Scale Velocity + Precision Sync</p>
                    <p className="flex items-center gap-3 text-emerald-400">✔ Periodically Re-Calibrate Shortcuts</p>
                </div>
            </section>

            <footer style={{ color: COLORS.slate400, borderTop: `1px solid ${COLORS.slate100}` }} className="mt-20 pt-10 text-center text-[10px] font-black uppercase tracking-[0.4em] italic relative z-10">
                © 2026 Neural Architect • Restricted Intelligence Material • confidential_sync_v4
            </footer>
        </div>
    );
});

AptitudeBasicsNotesTemplate.displayName = 'AptitudeBasicsNotesTemplate';


AptitudeBasicsNotesTemplate.displayName = 'AptitudeBasicsNotesTemplate';
