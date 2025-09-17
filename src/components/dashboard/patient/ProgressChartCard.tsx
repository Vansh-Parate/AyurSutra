import React, { useEffect, useRef } from 'react'

interface ProgressChartCardProps {
  labels: string[]
  data: number[]
}

const ProgressChartCard: React.FC<ProgressChartCardProps> = ({ labels, data }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    // lightweight sparkline without Chart.js
    const dpr = window.devicePixelRatio || 1
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    canvas.width = Math.floor(width * dpr)
    canvas.height = Math.floor(height * dpr)
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.scale(dpr, dpr)
    ctx.clearRect(0, 0, width, height)
    // axes
    const padding = 8
    const maxY = 10
    const minY = 0
    const xs = (i: number) => padding + (i * (width - padding * 2)) / (data.length - 1 || 1)
    const ys = (v: number) => padding + ((maxY - v) * (height - padding * 2)) / (maxY - minY)
    // fill
    ctx.beginPath()
    data.forEach((v, i) => {
      const x = xs(i)
      const y = ys(v)
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    })
    ctx.lineTo(width - padding, height - padding)
    ctx.lineTo(padding, height - padding)
    ctx.closePath()
    ctx.fillStyle = 'rgba(16,185,129,0.15)'
    ctx.fill()
    // line
    ctx.beginPath()
    data.forEach((v, i) => {
      const x = xs(i)
      const y = ys(v)
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    })
    ctx.strokeStyle = 'rgb(16,185,129)'
    ctx.lineWidth = 2
    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'
    ctx.stroke()
  }, [labels, data])

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
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"></canvas>
        </div>
      </div>
    </div>
  )
}

export default ProgressChartCard


