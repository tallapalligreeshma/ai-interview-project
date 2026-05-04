import LazyWrapper from "@/components/LazyWrapper";
import Breadcrumb from "@/layouts/Breadcrumb";
import { lazy } from "react";
const CourseActivityCard = lazy(() => import("./components/CourseActivityCard"))
const CoursesCard = lazy(() => import("./components/CoursesCard"))
const StudentProgressCard = lazy(() => import("./components/StudentProgressCard"))
const TopCategoriesCard = lazy(() => import("./components/TopCategoriesCard"))
const TopInstructorsCard = lazy(() => import("./components/TopInstructorsCard"))
const TrafficSourceCard = lazy(() => import("./components/TrafficSourceCard"))
const WidgetsAverageChart = lazy(() => import("./components/WidgetsAverageChart"))

const Lms = () => {
    return (
        <div className="flex-1 w-full min-h-screen bg-[#0B0F1A] text-slate-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden page-fade-in p-6 lg:p-10">
            {/* Background Ambient Gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#6366F1]/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[700px] h-[700px] bg-[#8B5CF6]/10 rounded-full blur-[150px]" />
            </div>

            <div className="relative z-10 w-full space-y-10">
                <div className="flex flex-col gap-2 border-b border-white/5 pb-8">
                    <h1 className="text-4xl font-black text-white tracking-tighter italic uppercase">
                        Academy <span className="text-gradient-cyan">Intelligence</span>
                    </h1>
                    <p className="text-slate-500 text-xs font-black uppercase tracking-[0.3em]">
                        Advanced Learning Management System
                    </p>
                </div>

                <div className="grid grid-cols-1 2xl:grid-cols-12 gap-8">
                    <div className="col-span-12 2xl:col-span-8">
                        <LazyWrapper>
                            <div className="glass-premium-blue rounded-[2.5rem] p-8 border-white/5 shadow-2xl overflow-hidden">
                                <WidgetsAverageChart />
                            </div>
                        </LazyWrapper>
                    </div>
                    <div className="col-span-12 md:col-span-6 2xl:col-span-4">
                        <LazyWrapper>
                            <div className="h-full">
                                <TrafficSourceCard />
                            </div>
                        </LazyWrapper>
                    </div>
                    <div className="col-span-12 md:col-span-6 2xl:col-span-4">
                        <LazyWrapper>
                            <TopCategoriesCard />
                        </LazyWrapper>
                    </div>
                    <div className="col-span-12 md:col-span-6 2xl:col-span-4">
                        <LazyWrapper>
                            <TopInstructorsCard />
                        </LazyWrapper>
                    </div>
                    <div className="col-span-12 md:col-span-6 2xl:col-span-4">
                        <LazyWrapper>
                            <StudentProgressCard />
                        </LazyWrapper>
                    </div>
                    <div className="col-span-12 2xl:col-span-8">
                        <LazyWrapper>
                            <CoursesCard />
                        </LazyWrapper>
                    </div>
                    <div className="col-span-12 2xl:col-span-4">
                        <LazyWrapper>
                            <CourseActivityCard />
                        </LazyWrapper>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Lms;