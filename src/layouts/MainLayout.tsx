import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import Footer from './Footer';
import Header from './Header';
import SidebarLayout from './SidebarLayout';


const MainLayout = () => {
    return (
        <SidebarLayout>
            <div className="flex flex-col min-h-full relative font-sans overflow-hidden dark bg-[#0B0F1A] text-white">
                {/* Neon Background Accents */}
                <div className="absolute top-[10%] -right-48 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none opacity-60 animate-pulse"></div>
                <div className="absolute bottom-[10%] -left-48 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none opacity-60"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/[0.03] rounded-full blur-[160px] pointer-events-none"></div>
                
                <Header />
                <div className="dashboard-body flex-1 relative z-10 transition-all duration-500">
                    <div className="w-full h-full">
                        <Suspense fallback={
                            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                                <Loader2 className="w-10 h-10 animate-spin text-[#22D3EE] opacity-50" />
                                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#6366F1] animate-pulse">Synchronizing Career Intelligence...</div>
                            </div>
                        }>
                            <Outlet />
                        </Suspense>
                    </div>
                </div>
                <Footer />
            </div>
        </SidebarLayout>
    );
};

export default MainLayout;
