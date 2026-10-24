import React, { useEffect, useRef } from 'react';
import { SortStep } from '../types/sort';
import { ListCollapse, ChevronRight } from 'lucide-react';

interface StepLogProps {
  steps: SortStep[];
  currentStepIndex: number;
  onSelectStep: (index: number) => void;
}

export const StepLog: React.FC<StepLogProps> = ({
  steps,
  currentStepIndex,
  onSelectStep,
}) => {
  const activeStepRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to active step
  useEffect(() => {
    if (activeStepRef.current && containerRef.current) {
      activeStepRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [currentStepIndex]);

  return (
    <div className="w-full bg-white border border-[#CBDED1] rounded-xl p-5 sm:p-6 shadow-[0_1px_3px_rgba(20,60,40,0.06)] flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#CBDED1] pb-3">
        <div className="flex items-center gap-2">
          <ListCollapse className="w-4 h-4 text-emerald-700" />
          <h3 className="text-sm font-bold text-[#132E22]">
            Step-by-Step Execution Log
          </h3>
        </div>
        <span className="text-xs text-[#5A7A6C] font-mono font-semibold">
          {currentStepIndex + 1} of {steps.length} logged
        </span>
      </div>

      {/* Scrollable Log Container */}
      <div
        ref={containerRef}
        className="max-h-[300px] overflow-y-auto pr-1 flex flex-col gap-2 rounded-lg"
      >
        {steps.map((step, idx) => {
          const isActive = idx === currentStepIndex;
          const isPassed = idx < currentStepIndex;
          const isPassEnd = step.isPassEnd;

          return (
            <div
              key={`step-${idx}-${step.type}`}
              ref={isActive ? activeStepRef : null}
              onClick={() => onSelectStep(idx)}
              className={`p-3 rounded-lg border text-xs transition-all cursor-pointer flex flex-col gap-1.5 ${
                isActive
                  ? 'bg-[#EAF7EE] border-emerald-400 shadow-xs ring-1 ring-emerald-500/30'
                  : isPassed
                  ? 'bg-[#F8FBF9] border-[#CBDED1] text-[#2D4A3E] hover:border-[#A3C2AE] hover:text-[#132E22]'
                  : 'bg-white border-[#E2ECE5] text-[#7E9C8E] hover:text-[#3D5E50]'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 font-mono">
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      isActive
                        ? 'bg-emerald-700 text-white'
                        : 'bg-[#E2ECE5] text-[#2D4A3E]'
                    }`}
                  >
                    Step {idx + 1}
                  </span>
                  <span className="text-[#5A7A6C] text-[11px] font-semibold">
                    {step.passNumber > 0 ? `Pass ${step.passNumber}` : 'Init'}
                  </span>
                </div>

                {isActive && (
                  <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-800">
                    <span>Active</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>

              {/* Message text */}
              <p
                className={`leading-relaxed ${
                  isActive ? 'text-[#132E22] font-semibold' : 'text-[#2D4A3E]'
                }`}
              >
                {step.description}
              </p>

              {/* Array state snapshot on pass end or insertion */}
              {isPassEnd && (
                <div className="mt-1 pt-1.5 border-t border-[#CBDED1] flex items-center gap-2 text-[11px] font-mono">
                  <span className="text-emerald-800 font-bold">
                    Array after Pass {step.passNumber}:
                  </span>
                  <span className="text-[#132E22] bg-[#EAF7EE] px-2 py-0.5 rounded border border-emerald-300 font-bold">
                    [{step.arraySnapshot.join(', ')}]
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
