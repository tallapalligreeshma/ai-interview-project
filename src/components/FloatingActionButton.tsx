import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const FloatingActionButton = () => {
    const navigate = useNavigate();

    return (
        <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-8 right-8 z-[110]"
        >
            <Button 
                onClick={() => navigate("/interview")}
                className="h-14 w-14 sm:w-auto sm:px-6 rounded-full shadow-[0_10px_30px_rgba(var(--primary),0.3)] flex items-center gap-2 group overflow-hidden bg-primary text-white"
            >
                <div className="relative">
                    <Mic size={24} className="group-hover:scale-110 transition-transform" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-ping"></div>
                </div>
                <span className="hidden sm:inline font-bold tracking-tight">Start Interview</span>
            </Button>
        </motion.div>
    );
};

export default FloatingActionButton;
