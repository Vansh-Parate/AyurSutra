import React, { useEffect, useRef } from 'react'

const ProgressChart: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    // Lazy load Chart.js only in browser
    import('chart.js/auto').then(({ default: Chart }) => {
      const ctx = canvasRef.current!
      const labels = ['Day 1', 'Day 3', 'Day 5', 'Day 7', 'Day 9', 'Day 11', 'Day 13']
      const data = [8, 7, 6.5, 6, 5.2, 4.6, 4.0]
      new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: 'Stiffness',
            data,
            tension: 0.35,
            borderColor: 'rgb(16,185,129)',
            backgroundColor: 'rgba(16,185,129,0.15)',
            fill: true,
            pointRadius: 3,
            pointBackgroundColor: 'rgb(16,185,129)',
            pointBorderColor: 'white',
            pointBorderWidth: 1.5,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { beginAtZero: true, grid: { color: 'rgba(148,163,184,0.15)' }, ticks: { color: '#475569', stepSize: 2 }, max: 10 },
            x: { grid: { display: false }, ticks: { color: '#475569' } }
          },
          plugins: { legend: { display: false } },
          interaction: { intersect: false, mode: 'index' }
        }
      })
    }).catch(() => {})
  }, [])

  return (
    <div className="col-span-12 xl:col-span-5 rounded-xl border border-emerald-100 bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <i data-lucide="line-chart" className="h-4 w-4 text-emerald-600"></i>
          <span className="text-[14px] font-medium tracking-tight text-slate-900">Progress Visualization</span>
        </div>
        <span className="text-[11px] text-slate-500">Last 2 weeks</span>
      </div>
      <div className="mt-2 text-[13px] text-slate-600">Joint stiffness over time (lower is better)</div>
      <div className="mt-3 rounded-lg border border-slate-100 p-2 bg-white">
        <div className="relative h-40">
          <canvas ref={canvasRef} className="absolute inset-0" />
        </div>
      </div>
    </div>
  )
}

export default ProgressChart


