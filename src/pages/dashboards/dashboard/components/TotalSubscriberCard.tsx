import BarLightChart from '@/components/charts/BarLightChart';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUp } from "lucide-react";

const InterviewAttemptsCard = () => {
    return (
        <Card className="card">
            <CardContent className="card-body p-0">
                <h6 className="mb-0 font-semibold text-lg">Interview Attempts</h6>
                <div className="flex items-center gap-2 mb-5 mt-4">
                    <h6 className="font-semibold mb-0">342</h6>
                    <span className="text-sm font-semibold rounded-full bg-green-100 dark:bg-green-600/25 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-600/50 px-2 py-1.5 line-height-1 flex items-center gap-1">
                        15% <ArrowUp width={14} height={14} />
                    </span>
                    - Total sessions
                </div>

                <BarLightChart chartHeight={235} chartBorderRadius={6} />

            </CardContent>
        </Card>
    );
};

export default InterviewAttemptsCard;