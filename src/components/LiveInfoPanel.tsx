import React from 'react';
import { SortStep } from '../types/sort';
import { analyzeSortComplexity } from '../utils/insertionSort';
import { CheckCircle2, GitCompare, ArrowRightLeft, Key, Layers } from 'lucide-react';

interface LiveInfoPanelProps {
  currentStep: SortStep;
  originalArray: number[];
}

export const LiveInfoPanel: React.FC<LiveInfoPanelProps> = ({ currentStep, originalArray }) => {
  const isFinished = currentStep.type === 'finished';
  const progressPct =
    currentStep.totalSteps > 1
      ? Math.round((currentStep.stepIndex / (currentStep.totalSteps - 1)) * 100)
      : 0;

  const complexityAnalysis = isFinished
    ? analyzeSortComplexity(
        originalArray,
        currentStep.comparisonsSoFar,
        currentStep.shiftsSoFar
      )
    : null;

  return (
    <div className="w-full bg-white border border-[#CBDED1] rounded-xl p-5 sm:p-6 shadow-[0_1px_3px_rgba(20,60,40,0.06)] flex flex-col gap-5">
      {/* Top Header & Step Progress Bar */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs text-[#2D4A3E]">
          <span className="font-extrabold uppercase tracking-wider text-[#3D5E50]">
            Sort Progress
          </span>
          <span className="font-mono text-emerald-800 font-bold">
            Step {currentStep.stepIndex + 1} of {currentStep.totalSteps} ({progressPct}%)
          </span>
        </div>

        {/* Progress Bar Track */}
        <div className="w-full h-2.5 bg-[#E2ECE5] rounded-full overflow-hidden border border-[#CBDED1]">
          <div
            className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-300 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Metrics 4-Box Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Pass Number */}
        <div className="bg-[#F4F9F5] border border-[#CBDED1] p-3.5 rounded-lg flex items-center gap-3">
          <div className="p-2 rounded-md bg-emerald-100 border border-emerald-200 text-emerald-800 shrink-0">
            <Layers className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] text-[#5A7A6C] font-semibold">Pass Number</span>
            <span className="text-base font-extrabold text-[#132E22] font-mono">
              {currentStep.passNumber === 0 ? 'Init' : `${currentStep.passNumber} / ${currentStep.totalPasses}`}
            </span>
          </div>
        </div>

        {/* Current Key */}
        <div className="bg-[#F4F9F5] border border-[#CBDED1] p-3.5 rounded-lg flex items-center gap-3">
          <div className="p-2 rounded-md bg-orange-100 border border-orange-200 text-orange-700 shrink-0">
            <Key className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] text-[#5A7A6C] font-semibold">Current Key</span>
            <span className="text-base font-extrabold text-orange-700 font-mono">
              {currentStep.keyVal !== null ? currentStep.keyVal : '—'}
            </span>
          </div>
        </div>

        {/* Comparisons */}
        <div className="bg-[#F4F9F5] border border-[#CBDED1] p-3.5 rounded-lg flex items-center gap-3">
          <div className="p-2 rounded-md bg-amber-100 border border-amber-200 text-amber-800 shrink-0">
            <GitCompare className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] text-[#5A7A6C] font-semibold">Comparisons</span>
            <span className="text-base font-extrabold text-amber-800 font-mono tabular-nums">
              {currentStep.comparisonsSoFar}
            </span>
          </div>
        </div>

        {/* Shifts */}
        <div className="bg-[#F4F9F5] border border-[#CBDED1] p-3.5 rounded-lg flex items-center gap-3">
          <div className="p-2 rounded-md bg-emerald-100 border border-emerald-200 text-emerald-800 shrink-0">
            <ArrowRightLeft className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] text-[#5A7A6C] font-semibold">Shifts (Writes)</span>
            <span className="text-base font-extrabold text-emerald-800 font-mono tabular-nums">
              {currentStep.shiftsSoFar}
            </span>
          </div>
        </div>
      </div>

      {/* Final Result Card when complete */}
      {isFinished && complexityAnalysis && (
        <div className="p-4 rounded-xl bg-[#EAF7EE] border border-emerald-300 flex flex-col gap-2.5 animate-fadeIn shadow-2xs">
          <div className="flex items-center gap-2 text-emerald-950 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
            <span>Sorted Array: [{currentStep.arraySnapshot.join(', ')}]</span>
          </div>
          <div className="text-xs text-[#2D4A3E] flex flex-wrap items-center gap-x-4 gap-y-1 font-mono">
            <span>Total Comparisons: <strong className="text-amber-800">{currentStep.comparisonsSoFar}</strong></span>
            <span>Total Shifts: <strong className="text-emerald-800">{currentStep.shiftsSoFar}</strong></span>
          </div>
          <p className="text-xs text-[#2D4A3E] leading-relaxed border-t border-emerald-200 pt-2 font-medium">
            {complexityAnalysis.summary}
          </p>
          <div className="text-[11px] text-[#5A7A6C]">
            <span className="text-[#132E22] font-bold">Rule of thumb: </span>
            Best case: already sorted (O(n), 0 shifts). Worst case: reverse sorted (O(n²), maximum shifts).
          </div>
        </div>
      )}
    </div>
  );
};
