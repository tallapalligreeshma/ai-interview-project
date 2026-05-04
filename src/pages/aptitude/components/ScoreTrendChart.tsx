import ReactApexChart from 'react-apexcharts';
import { Card } from "@/components/ui/card";
export default function ScoreTrendChart() {
    // Mock data for score trend
    const series = [{
        name: 'Aptitude Score',
        data: [45, 52, 48, 65, 59, 72, 68]
    }];

    const options: any = {
        chart: {
            height: 350,
            type: 'area',
            toolbar: { show: false },
            zoom: { enabled: false },
            background: 'transparent'
        },
        dataLabels: { enabled: false },
        stroke: {
            curve: 'smooth',
            width: 3,
            colors: ['#3b82f6']
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.45,
                opacityTo: 0.05,
                stops: [20, 100, 100, 100],
                colorStops: [
                    { offset: 0, color: '#3b82f6', opacity: 0.4 },
                    { offset: 100, color: '#3b82f6', opacity: 0 }
                ]
            }
        },
        grid: {
            borderColor: '#f1f5f9',
            strokeDashArray: 4,
            xaxis: { lines: { show: true } },
            yaxis: { lines: { show: false } }
        },
        xaxis: {
            categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: {
                style: {
                    colors: '#94a3b8',
                    fontSize: '12px',
                    fontWeight: 600
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#94a3b8',
                    fontSize: '12px',
                    fontWeight: 600
                }
            }
        },
        tooltip: {
            theme: 'dark',
            x: { show: false }
        }
    };

    return (
        <Card className="p-8 bg-white dark:bg-slate-900 border-neutral-100 dark:border-slate-800 rounded-[2.5rem] shadow-sm">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-xl font-black text-neutral-900 dark:text-white uppercase tracking-tight">Performance Trend</h3>
                    <p className="text-sm font-medium text-neutral-500">Weekly aptitude score progression</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-green-50 dark:bg-green-900/10 text-green-600 rounded-lg">
                    <span className="text-xs font-black">+12% Since Monday</span>
                </div>
            </div>
            
            <div id="chart">
                <ReactApexChart options={options} series={series} type="area" height={280} />
            </div>
        </Card>
    );
}
