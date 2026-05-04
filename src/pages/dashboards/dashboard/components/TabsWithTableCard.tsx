import LatestRegisteredTable from "@/components/tables/LatestRegisteredTable";
import LatestSubscribeTable from "@/components/tables/LatestSubscribeTable";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const InterviewHistoryCard = () => {
    return (
        <Card className="overflow-hidden glass-premium-blue border-white/5 rounded-[2rem] shadow-2xl relative">
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#6366F1]/5 blur-[80px] rounded-full pointer-events-none" />
            <CardContent className="p-0">
                <Tabs defaultValue="latestInterviews" className="w-full">
                    <TabsList className='bg-white/[0.02] p-2 border-b border-white/5 h-auto rounded-none justify-start w-full flex gap-2'>
                        <TabsTrigger
                            value="latestInterviews"
                            className='py-4 px-8 font-black text-[10px] uppercase tracking-[0.2em] inline-flex items-center gap-3 text-slate-500 data-[state=active]:text-white data-[state=active]:bg-[#6366F1]/20 rounded-xl smooth-transition border border-transparent data-[state=active]:border-[#6366F1]/30'
                        >
                            Latest Simulations
                            <span className="text-white px-2.5 py-1 bg-[#6366F1] rounded-lg text-[9px] font-black leading-none ml-1 shadow-[0_0_10px_rgba(99,102,241,0.5)]">20</span>
                        </TabsTrigger>
                        <TabsTrigger
                            value="savedReports"
                            className='py-4 px-8 font-black text-[10px] uppercase tracking-[0.2em] inline-flex items-center gap-3 text-slate-500 data-[state=active]:text-white data-[state=active]:bg-[#8B5CF6]/20 rounded-xl smooth-transition border border-transparent data-[state=active]:border-[#8B5CF6]/30'
                        >
                            Performance Intelligence
                            <span className="text-white px-2.5 py-1 bg-[#8B5CF6] rounded-lg text-[9px] font-black leading-none ml-1 shadow-[0_0_10px_rgba(139,92,246,0.5)]">08</span>
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="latestInterviews" className="m-0 border-0 outline-none p-4">
                        <div className="rounded-2xl overflow-hidden border border-white/5 bg-white/[0.01]">
                            <LatestRegisteredTable />
                        </div>
                    </TabsContent>
                    <TabsContent value="savedReports" className="m-0 border-0 outline-none p-4">
                        <div className="rounded-2xl overflow-hidden border border-white/5 bg-white/[0.01]">
                            <LatestSubscribeTable />
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
};

export default InterviewHistoryCard;