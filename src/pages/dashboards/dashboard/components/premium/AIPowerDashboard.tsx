
import DailyPlanSection from "./DailyPlanSection";
import FocusSummarySection from "./FocusSummarySection";
import AnalyticsAISection from "./AnalyticsAISection";

const AIPowerDashboard = () => {
    return (
        <div className="w-full h-full min-h-screen bg-[#F8FAFC] rounded-[3rem] p-4 lg:p-12 overflow-hidden">
            <div className="max-w-[1600px] mx-auto h-full grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                {/* LEFT PANEL - DAILY PLAN */}
                <div className="lg:col-span-3 xl:col-span-3 min-h-[600px]">
                    <DailyPlanSection />
                </div>

                {/* CENTER PANEL - FOCUS SUMMARY */}
                <div className="lg:col-span-6 xl:col-span-6">
                    <FocusSummarySection />
                </div>

                {/* RIGHT PANEL - ANALYTICS & AI */}
                <div className="lg:col-span-3 xl:col-span-3">
                    <AnalyticsAISection />
                </div>

            </div>
        </div>
    );
};

export default AIPowerDashboard;
