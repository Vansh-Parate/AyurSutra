import React, { useState } from 'react'

interface TreatmentTimelineProps {
  totalDays: number
  currentDay: number
}

interface CalendarEvent {
  day: number
  time: string
  treatment: string
  status: 'completed' | 'today' | 'upcoming'
}

const TreatmentTimeline: React.FC<TreatmentTimelineProps> = ({ totalDays, currentDay }) => {
  const [selectedDay, setSelectedDay] = useState(currentDay)
  
  // Generate calendar events for the treatment timeline
  const events: CalendarEvent[] = Array.from({ length: totalDays }, (_, i) => {
    const day = i + 1
    let status: 'completed' | 'today' | 'upcoming'
    if (day < currentDay) {
      status = 'completed'
    } else if (day === currentDay) {
      status = 'today'
    } else {
      status = 'upcoming'
    }
    const treatments = ['Abhyanga', 'Swedana', 'Shirodhara', 'Nasya', 'Basti']
    const times = ['09:00', '10:30', '14:00', '16:00', '18:30']
    
    return {
      day,
      time: times[i % times.length],
      treatment: treatments[i % treatments.length],
      status
    }
  })

  const selectedEvent = events.find(e => e.day === selectedDay)
  const weeks = Math.ceil(totalDays / 7)
  
  return (
    <div className="col-span-12 xl:col-span-7 rounded-xl border border-emerald-100 bg-white p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <svg className="h-4 w-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
          <span className="text-[14px] font-medium tracking-tight text-slate-900">Treatment Schedule</span>
        </div>
        <span className="text-[12px] text-slate-600">Week 1 of {weeks}</span>
      </div>
      
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 mb-4">
        {/* Day headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-[11px] font-medium text-slate-500 py-2">
            {day}
          </div>
        ))}
        
        {/* Calendar days */}
        {Array.from({ length: 7 * weeks }, (_, i) => {
          const day = i + 1
          if (day > totalDays) return <div key={day} className="h-8"></div>
          
          const event = events.find(e => e.day === day)
          const isSelected = selectedDay === day
          const state = event?.status || 'upcoming'
          
          let dayClasses: string
          if (state === 'completed') {
            dayClasses = 'bg-emerald-100 text-emerald-700 border-emerald-200'
          } else if (state === 'today') {
            dayClasses = 'bg-amber-100 text-amber-800 border-amber-300'
          } else {
            dayClasses = 'bg-slate-50 text-slate-600 border-slate-200'
          }
            
          const selectedClasses = isSelected ? 'ring-2 ring-emerald-400 ring-offset-1' : ''
          
          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`h-8 w-full rounded-lg border text-[12px] font-medium transition-all hover:scale-105 ${dayClasses} ${selectedClasses}`}
            >
              {day}
            </button>
          )
        })}
      </div>
      
      {/* Selected Day Details */}
      {selectedEvent && (
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg p-3 border border-emerald-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[13px] font-medium text-slate-900">
              Day {selectedEvent.day} - {selectedEvent.treatment}
            </span>
            <span className={`px-2 py-1 rounded-full text-[11px] font-medium ${
              (() => {
                if (selectedEvent.status === 'completed') return 'bg-emerald-100 text-emerald-700'
                if (selectedEvent.status === 'today') return 'bg-amber-100 text-amber-700'
                return 'bg-slate-100 text-slate-600'
              })()
            }`}>
              {(() => {
                if (selectedEvent.status === 'completed') return 'Completed'
                if (selectedEvent.status === 'today') return 'Today'
                return 'Upcoming'
              })()}
            </span>
          </div>
          <div className="flex items-center gap-2 text-[12px] text-slate-600">
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            <span>{selectedEvent.time}</span>
            <svg className="h-3.5 w-3.5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s8-7.6 8-13a8 8 0 1 0-16 0c0 5.4 8 13 8 13z"/><circle cx="12" cy="8" r="3"/></svg>
            <span>Wellness Center</span>
          </div>
        </div>
      )}
      
      {/* Legend */}
      <div className="mt-3 flex items-center gap-4 text-[11px] text-slate-600">
        <span className="inline-flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-100 border border-emerald-200"></span>
          Completed
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-100 border border-amber-300"></span>
          Today
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-50 border border-slate-200"></span>
          Upcoming
        </span>
      </div>
    </div>
  )
}

export default TreatmentTimeline


