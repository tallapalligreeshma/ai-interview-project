import DonutThreeSeriesChart from '@/components/charts/DonutThreeSeriesChart';
import CustomSelect from '@/components/shared/CustomSelect';
import { Card, CardContent } from '@/components/ui/card';

const SkillDistributionCard = () => {
    return (
        <Card className="card">
            <CardContent className="card-body p-0">
                <div className="flex items-center justify-between">
                    <h6 className="mb-0 font-semibold text-lg">Skill Distribution</h6>
                    <CustomSelect
                        placeholder="Overall"
                        options={["Overall", "Last Interview", "Monthly"]}
                    />
                </div>

                <div className="apexcharts-tooltip-z-none mt-2">
                    <DonutThreeSeriesChart
                        onChartHeight={270}
                        chartSeries={[70, 50, 30]}
                        chartColors={["#3B82F6", "#F59E0B", "#10B981"]}
                    />
                </div>

                <ul className="flex flex-wrap items-center justify-between mt-4 gap-3">
                    <li className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-[2px] bg-blue-500"></span>
                        <span className="text-neutral-500 dark:text-neutral-300 text-sm font-normal">JS/TS:
                            <span className="text-neutral-500 dark:text-neutral-300 font-semibold"> 70%</span>
                        </span>
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-[2px] bg-yellow-500"></span>
                        <span className="text-neutral-500 dark:text-neutral-300 text-sm font-normal">React:
                            <span className="text-neutral-500 dark:text-neutral-300 font-semibold"> 50%</span>
                        </span>
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-[2px] bg-green-500"></span>
                        <span className="text-neutral-500 dark:text-neutral-300 text-sm font-normal">DSA:
                            <span className="text-neutral-500 dark:text-neutral-300 font-semibold"> 30%</span>
                        </span>
                    </li>
                </ul>

            </CardContent>
        </Card>
    );
};

export default SkillDistributionCard;