import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const TreatmentProgressCard: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      // Destroy existing chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Create new chart
      chartInstance.current = new Chart(chartRef.current, {
        type: 'doughnut',
        data: {
          labels: ['On Track', 'Improving', 'Needs Attention'],
          datasets: [{
            data: [8, 5, 2],
            backgroundColor: ['#10B981', '#0EA5E9', '#F59E0B'],
            borderWidth: 2,
            borderColor: '#ffffff',
            hoverBorderColor: '#ffffff',
            hoverOffset: 4,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          cutout: '68%',
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              titleColor: '#fff',
              bodyColor: '#e2e8f0',
              borderColor: '#475569',
              borderWidth: 1,
              padding: 10,
              displayColors: false
            }
          }
        }
      });
    }

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="px-5 pt-5">
        <h2 className="text-lg tracking-tight font-semibold text-slate-900">Treatment Progress</h2>
        <p className="text-xs text-slate-500 mt-0.5">Today's patient status</p>
      </div>
      {/* Chart wrapper: keep canvas inside a dedicated container */}
      <div className="px-5 pb-4">
        <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 p-3">
          <div className="relative mx-auto" style={{ maxWidth: '220px' }}>
            <div className="aspect-square">
              <div className="w-full h-full">
                <canvas ref={chartRef}></canvas>
              </div>
            </div>
          </div>
          {/* Legend */}
          <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
            <div className="flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-2 py-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              <div className="min-w-0">
                <p className="text-slate-700">On Track</p>
                <p className="text-[10px] text-slate-500">8 patients</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-sky-100 bg-sky-50 px-2 py-1.5">
              <span className="h-2 w-2 rounded-full bg-sky-500"></span>
              <div className="min-w-0">
                <p className="text-slate-700">Improving</p>
                <p className="text-[10px] text-slate-500">5 patients</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-amber-100 bg-amber-50 px-2 py-1.5">
              <span className="h-2 w-2 rounded-full bg-amber-500"></span>
              <div className="min-w-0">
                <p className="text-slate-700">Needs Attention</p>
                <p className="text-[10px] text-slate-500">2 patients</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TreatmentProgressCard;
