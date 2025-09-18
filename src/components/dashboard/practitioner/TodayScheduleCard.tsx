import React from 'react';
import { 
  Clock, 
  ChevronRight, 
  ArrowRight,
  Stethoscope,
  Leaf,
  Droplet,
  HeartPulse
} from 'lucide-react';

interface Appointment {
  id: string;
  patientName: string;
  treatmentType: string;
  treatmentCategory: string;
  location: string;
  timeSlot: string;
  icon: React.ComponentType<{ className?: string }>;
  statusColor: string;
}

const appointments: Appointment[] = [
  {
    id: '1',
    patientName: 'Ravi Kumar',
    treatmentType: 'Abhyanga',
    treatmentCategory: 'Oil therapy',
    location: 'Room 2',
    timeSlot: '09:00–09:45',
    icon: Stethoscope,
    statusColor: 'bg-sky-50 text-sky-700 border-sky-100'
  },
  {
    id: '2',
    patientName: 'Aarav Shah',
    treatmentType: 'Diet Consult',
    treatmentCategory: 'Nutrition',
    location: 'Telehealth',
    timeSlot: '10:00–10:30',
    icon: Leaf,
    statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-100'
  },
  {
    id: '3',
    patientName: 'Neha Verma',
    treatmentType: 'Shirodhara',
    treatmentCategory: 'Head oil therapy',
    location: 'Room 1',
    timeSlot: '11:15–12:00',
    icon: Droplet,
    statusColor: 'bg-amber-50 text-amber-700 border-amber-100'
  },
  {
    id: '4',
    patientName: 'Priya Nair',
    treatmentType: 'Follow-up',
    treatmentCategory: 'Musculoskeletal',
    location: 'Clinic',
    timeSlot: '13:30–14:00',
    icon: HeartPulse,
    statusColor: 'bg-rose-50 text-rose-700 border-rose-100'
  }
];

const TodayScheduleCard: React.FC = () => {
  return (
    <section className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between px-5 pt-5">
        <h2 className="text-lg tracking-tight font-semibold text-slate-900">Today's Schedule</h2>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-1 text-xs">
            <Clock className="h-3.5 w-3.5" />
            {appointments.length} appointments
          </span>
        </div>
      </div>
      <div className="px-5 pb-2">
        <div className="mt-4 divide-y divide-slate-100">
          {appointments.map((appointment) => {
            const IconComponent = appointment.icon;
            return (
              <div key={appointment.id} className="flex items-center justify-between gap-4 py-3.5 hover:bg-slate-50 rounded-xl px-3 transition-all duration-200 cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg border border-slate-200 bg-white flex items-center justify-center">
                    <IconComponent className="h-4.5 w-4.5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium tracking-tight text-slate-900">{appointment.patientName}</p>
                      <span className={`inline-flex items-center rounded-md ${appointment.statusColor} px-1.5 py-0.5 text-[11px]`}>
                        {appointment.treatmentType}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">{appointment.location} · {appointment.treatmentCategory}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-600">{appointment.timeSlot}</span>
                  <button className="h-9 w-9 inline-flex items-center justify-center rounded-lg border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:ring-offset-1 active:scale-95 hover:shadow-sm group-hover:bg-emerald-50 group-hover:border-emerald-200" aria-label="Details">
                    <ChevronRight className="h-4.5 w-4.5 group-hover:text-emerald-600 transition-colors duration-200" />
                  </button>
                </div>
              </div>
            );
          })}
          {/* View all */}
          <div className="flex justify-end py-3.5">
            <button className="text-sm text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:ring-offset-1 active:scale-95 hover:gap-2">
              View full schedule
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TodayScheduleCard;
