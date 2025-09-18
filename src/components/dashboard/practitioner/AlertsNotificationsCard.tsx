import React from 'react';
import { 
  AlertTriangle, 
  MessageSquare, 
  Thermometer 
} from 'lucide-react';

interface Alert {
  id: string;
  type: 'warning' | 'info' | 'attention';
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  timestamp: string;
  source: string;
  buttonText: string;
  buttonColor: string;
}

const alerts: Alert[] = [
  {
    id: '1',
    type: 'warning',
    icon: AlertTriangle,
    title: "Ravi's stiffness worsening — consider adjusting Abhyanga pressure",
    description: 'Added 15 min ago · From assistant notes',
    timestamp: '15 min ago',
    source: 'assistant notes',
    buttonText: 'Review',
    buttonColor: 'border-amber-200 text-amber-700 hover:bg-amber-100'
  },
  {
    id: '2',
    type: 'info',
    icon: MessageSquare,
    title: 'Neha reported improved sleep after Shirodhara',
    description: 'Today · Self report',
    timestamp: 'Today',
    source: 'self report',
    buttonText: 'Acknowledge',
    buttonColor: 'border-sky-200 text-sky-700 hover:bg-sky-100'
  },
  {
    id: '3',
    type: 'attention',
    icon: Thermometer,
    title: 'Priya shows post-session soreness; consider gentler stretches',
    description: 'Yesterday · Therapist note',
    timestamp: 'Yesterday',
    source: 'therapist note',
    buttonText: 'Adjust Plan',
    buttonColor: 'border-rose-200 text-rose-700 hover:bg-rose-100'
  }
];

const getAlertStyles = (type: Alert['type']) => {
  switch (type) {
    case 'warning':
      return {
        container: 'border-amber-200 bg-amber-50/60',
        icon: 'border-amber-200 bg-amber-100 text-amber-700'
      };
    case 'info':
      return {
        container: 'border-sky-200 bg-sky-50/60',
        icon: 'border-sky-200 bg-sky-100 text-sky-700'
      };
    case 'attention':
      return {
        container: 'border-rose-200 bg-rose-50/60',
        icon: 'border-rose-200 bg-rose-100 text-rose-700'
      };
    default:
      return {
        container: 'border-slate-200 bg-slate-50/60',
        icon: 'border-slate-200 bg-slate-100 text-slate-700'
      };
  }
};

const AlertsNotificationsCard: React.FC = () => {
  return (
    <section className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="px-5 pt-5">
        <h2 className="text-lg tracking-tight font-semibold text-slate-900">Alerts & Notifications</h2>
        <p className="text-xs text-slate-500 mt-0.5">Flagged symptoms, adjustments, special notes</p>
      </div>
      <div className="px-5 pb-4">
        <div className="mt-4 space-y-3">
          {alerts.map((alert) => {
            const IconComponent = alert.icon;
            const styles = getAlertStyles(alert.type);
            
            return (
              <div key={alert.id} className={`flex items-start gap-3 rounded-xl border ${styles.container} p-3 transition-all duration-200 hover:shadow-sm cursor-pointer group`}>
                <div className={`h-9 w-9 rounded-lg border ${styles.icon} flex items-center justify-center`}>
                  <IconComponent className="h-4.5 w-4.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium tracking-tight text-slate-900">{alert.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{alert.description}</p>
                </div>
                <button className={`inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs ${alert.buttonColor} transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:ring-offset-1 active:scale-95 hover:shadow-sm`}>
                  {alert.buttonText}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AlertsNotificationsCard;
