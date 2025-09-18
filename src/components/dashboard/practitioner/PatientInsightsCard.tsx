import React from 'react';

interface Patient {
  id: string;
  name: string;
  dosha: string;
  doshaColor: string;
  treatmentPlan: string;
  status: string;
  statusColor: string;
  avatar: string;
}

const patients: Patient[] = [
  {
    id: '1',
    name: 'Ravi Kumar',
    dosha: 'Vata',
    doshaColor: 'bg-cyan-50 text-cyan-700 border-cyan-100',
    treatmentPlan: 'Plan: Abhyanga + gentle stretches',
    status: 'stiffness',
    statusColor: 'text-amber-700 bg-amber-50 border-amber-100',
    avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=96&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Neha Verma',
    dosha: 'Pitta',
    doshaColor: 'bg-amber-50 text-amber-700 border-amber-100',
    treatmentPlan: 'Plan: Shirodhara + cooling diet',
    status: 'stable',
    statusColor: 'text-emerald-700 bg-emerald-50 border-emerald-100',
    avatar: 'https://images.unsplash.com/photo-1546525848-3ce03ca516f6?q=80&w=96&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'Aarav Shah',
    dosha: 'Kapha',
    doshaColor: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    treatmentPlan: 'Plan: Diet consult + daily walk',
    status: 'improving',
    statusColor: 'text-sky-700 bg-sky-50 border-sky-100',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=96&auto=format&fit=crop'
  }
];

const PatientInsightsCard: React.FC = () => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="px-5 pt-5">
        <h2 className="text-lg tracking-tight font-semibold text-slate-900">Patient Insights</h2>
        <p className="text-xs text-slate-500 mt-0.5">Key patients under treatment today</p>
      </div>
      <div className="px-5 pb-4">
        <div className="mt-4 space-y-3">
          {patients.map((patient) => (
            <div key={patient.id} className="flex items-center gap-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-white p-3 transition-all duration-200 cursor-pointer group hover:shadow-sm">
              <img className="h-10 w-10 rounded-lg object-cover border border-slate-200 group-hover:border-emerald-200 transition-colors duration-200" src={patient.avatar} alt={patient.name} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium tracking-tight text-slate-900 truncate">{patient.name}</p>
                  <span className={`inline-flex items-center rounded-md ${patient.doshaColor} px-1.5 py-0.5 text-[11px]`}>
                    {patient.dosha}
                  </span>
                </div>
                <p className="text-xs text-slate-500 truncate">{patient.treatmentPlan}</p>
              </div>
              <span className={`inline-flex items-center gap-1 text-xs ${patient.statusColor} rounded-md px-2 py-1`}>
                <span className="h-1.5 w-1.5 rounded-full bg-current"></span>
                {patient.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PatientInsightsCard;
