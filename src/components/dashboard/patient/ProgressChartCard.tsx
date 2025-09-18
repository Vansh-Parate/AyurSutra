import React, { useEffect, useRef, useState } from 'react'

interface ProgressChartCardProps {
  labels: string[]
  data: number[]
}

const ProgressChartCard: React.FC<ProgressChartCardProps> = ({ labels, data }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; value: number; label: string } | null>(null)

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
    const padding = 20
    const maxY = 10
    const minY = 0
    const xs = (i: number) => padding + (i * (width - padding * 2)) / (data.length - 1 || 1)
    const ys = (v: number) => padding + ((maxY - v) * (height - padding * 2)) / (maxY - minY)
    
    // Y-axis labels (points)
    ctx.font = '10px system-ui'
    ctx.fillStyle = '#64748b'
    ctx.textAlign = 'right'
    for (let i = 0; i <= 5; i++) {
      const value = i * 2
      const y = ys(value)
      ctx.fillText(value.toString(), padding - 5, y + 3)
    }
    
    // X-axis labels (days)
    ctx.textAlign = 'center'
    labels.forEach((label, i) => {
      const x = xs(i)
      ctx.fillText(label, x, height - 5)
    })
    
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
    
    // data points
    data.forEach((v, i) => {
      const x = xs(i)
      const y = ys(v)
      ctx.beginPath()
      ctx.arc(x, y, 3, 0, 2 * Math.PI)
      ctx.fillStyle = 'rgb(16,185,129)'
      ctx.fill()
      ctx.strokeStyle = 'white'
      ctx.lineWidth = 1
      ctx.stroke()
    })
  }, [labels, data])

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const padding = 20
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    const maxY = 10
    const minY = 0
    
    const xs = (i: number) => padding + (i * (width - padding * 2)) / (data.length - 1 || 1)
    const ys = (v: number) => padding + ((maxY - v) * (height - padding * 2)) / (maxY - minY)
    
    // Check if mouse is near any data point
    for (let i = 0; i < data.length; i++) {
      const pointX = xs(i)
      const pointY = ys(data[i])
      const distance = Math.sqrt((x - pointX) ** 2 + (y - pointY) ** 2)
      
      if (distance <= 8) {
        setHoveredPoint({
          x: pointX,
          y: pointY,
          value: data[i],
          label: labels[i]
        })
        return
      }
    }
    setHoveredPoint(null)
  }

  const handleMouseLeave = () => {
    setHoveredPoint(null)
  }

  return (
    <div className="col-span-12 xl:col-span-5 rounded-xl border border-emerald-100 bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg className="h-4 w-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 3v18h18"/><path d="M7 13l3 3 7-7"/></svg>
          <span className="text-[14px] font-medium tracking-tight text-slate-900">Progress Visualization</span>
        </div>
        <span className="text-[11px] text-slate-500">Last 2 weeks</span>
      </div>
      <div className="mt-2 text-[13px] text-slate-600">Joint stiffness over time (lower is better)</div>
      <div className="mt-3 rounded-lg border border-slate-100 p-2 bg-white">
        <div className="relative h-40">
          <canvas 
            ref={canvasRef} 
            className="absolute inset-0 w-full h-full cursor-pointer" 
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          />
          {hoveredPoint && (
            <div 
              className="absolute bg-slate-800 text-white text-xs px-2 py-1 rounded shadow-lg pointer-events-none z-10"
              style={{
                left: hoveredPoint.x - 20,
                top: hoveredPoint.y - 30,
                transform: 'translateX(-50%)'
              }}
            >
              {hoveredPoint.label}: {hoveredPoint.value}/10
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProgressChartCard


