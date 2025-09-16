import React from 'react';
import StepCard from '../StepCard';

interface ReviewStepProps {
  data: Record<string, any>;
  onBack: () => void;
  onFinish: () => void;
  onEditStep: (stepIndex: number) => void;
  finishPath?: string;
}

const ReviewStep: React.FC<ReviewStepProps> = ({ data, onBack, onFinish, onEditStep, finishPath }) => {
  const getDisplayValue = (key: string, value: string) => {
    const displayMap: Record<string, Record<string, string>> = {
      body: {
        light: 'Light / Lean',
        medium: 'Medium / Proportionate', 
        sturdy: 'Sturdy / Solid'
      },
      skin: {
        dry: 'Dry skin, thin hair',
        normal: 'Normal skin, thick hair',
        oily: 'Oily skin, thick hair'
      },
      digestion: {
        irregular: 'Irregular appetite, variable digestion',
        sharp: 'Strong appetite, sharp digestion', 
        slow: 'Steady appetite, slow digestion'
      },
      energy: {
        variable: 'Variable energy, quick bursts',
        intense: 'High energy, intense activity',
        steady: 'Steady energy, regular activity'
      },
      sleep: {
        light: 'Light sleep, 6–7 hours',
        moderate: 'Moderate sleep, 7–8 hours',
        heavy: 'Deep sleep, 8+ hours'
      },
      climate: {
        warm: 'Prefers warmer weather',
        cold: 'Prefers cooler weather',
        damp: 'Prefers dry climate'
      },
      mind: {
        anxious: 'Anxious, creative; occasional worry',
        irritable: 'Focused, determined; occasional impatience',
        calm: 'Calm, steady; occasional sluggishness'
      }
    };
    
    return displayMap[key]?.[value] || value;
  };

  const stepIcons: Record<string, string> = {
    body: 'ruler',
    skin: 'sparkles', 
    digestion: 'flame',
    energy: 'zap',
    sleep: 'moon',
    climate: 'thermometer',
    mind: 'smile'
  };

  const stepLabels: Record<string, string> = {
    body: 'Body Frame',
    skin: 'Skin & Hair',
    digestion: 'Appetite & Digestion', 
    energy: 'Energy & Activity',
    sleep: 'Sleep Patterns',
    climate: 'Temperature & Climate',
    mind: 'Mind & Emotions'
  };

  const steps = ['body', 'skin', 'digestion', 'energy', 'sleep', 'climate', 'mind'];

  return (
    <StepCard
      title="Review your profile"
      subtitle="Confirm your answers and finish to view your personalized insights."
      canContinue={true}
      isLast={true}
      onBack={onBack}
      onFinish={onFinish}
      hideSkip={true}
      finishPath={finishPath}
    >
      <div className="space-y-2.5 md:space-y-3">
        {steps.map((stepKey, index) => {
          const value = data[stepKey];
          if (!value) return null;
          
          return (
            <div 
              key={stepKey}
              className="flex items-start md:items-center justify-between rounded-lg md:rounded-xl border border-emerald-100 bg-white hover:bg-emerald-50/60 transition p-3 md:p-4"
            >
              <div className="flex items-start md:items-center gap-2.5 md:gap-3 flex-1 min-w-0">
                <i data-lucide={stepIcons[stepKey]} className="h-3.5 w-3.5 md:h-4 md:w-4 text-emerald-600 shrink-0 mt-0.5 md:mt-0"></i>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-[11px] md:text-[13px] text-slate-500">{stepLabels[stepKey]}</span>
                  <span className="text-[12px] md:text-[14px] font-medium tracking-tight text-slate-900 leading-tight">
                    {getDisplayValue(stepKey, value)}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => onEditStep(index)}
                className="inline-flex items-center gap-1 md:gap-1.5 text-[10px] md:text-[12px] px-2 md:px-2.5 py-1 md:py-1.5 rounded-md md:rounded-lg border border-slate-200 hover:border-slate-300 text-slate-700 bg-white hover:bg-slate-50 transition shrink-0 ml-2"
              >
                <i data-lucide="pencil" className="h-3 w-3 md:h-3.5 md:w-3.5"></i>
                <span className="font-medium hidden sm:inline">Edit</span>
              </button>
            </div>
          );
        })}
      </div>
    </StepCard>
  );
};

export default ReviewStep;

