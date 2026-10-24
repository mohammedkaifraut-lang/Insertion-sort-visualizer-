import React from 'react';
import { SortStep } from '../types/sort';

interface SortVisualizerProps {
  currentStep: SortStep;
  allValues: number[];
}

export const SortVisualizer: React.FC<SortVisualizerProps> = ({ currentStep, allValues }) => {
  const bars = currentStep.bars;
  const n = bars.length;

  // Compute min and max for responsive height scaling
  const maxVal = Math.max(...allValues, 1);
  const minVal = Math.min(...allValues, 1);

  const getBarHeight = (val: number) => {
    if (maxVal === minVal) return 140;
    const ratio = (val - minVal) / (maxVal - minVal);
    return Math.round(64 + ratio * 146);
  };

  // Color mapping based on status
  const getBarColorClasses = (status: string, isLifted: boolean) => {
    switch (status) {
      case 'key':
        return {
          bg: 'bg-[#EA580C] text-white',
          border: 'border-orange-600 shadow-[0_4px_14px_rgba(234,88,12,0.35)]',
          label: 'Key',
          badgeBg: 'bg-orange-100 text-orange-800 border-orange-300 font-bold',
        };
      case 'comparing':
        return {
          bg: 'bg-[#FACC15] text-slate-950',
          border: 'border-yellow-400 ring-2 ring-yellow-400/40 shadow-[0_4px_12px_rgba(250,204,21,0.3)]',
          label: 'Comparing',
          badgeBg: 'bg-yellow-100 text-yellow-900 border-yellow-300 font-bold',
        };
      case 'shifting':
        return {
          bg: 'bg-amber-400 text-slate-950',
          border: 'border-amber-400 ring-2 ring-amber-400/30 shadow-[0_4px_12px_rgba(251,191,36,0.3)]',
          label: 'Shift →',
          badgeBg: 'bg-amber-100 text-amber-900 border-amber-300 font-bold',
        };
      case 'sorted':
        return {
          bg: 'bg-[#16A34A] text-white',
          border: 'border-emerald-700 shadow-[0_4px_12px_rgba(22,163,74,0.25)]',
          label: 'Sorted',
          badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold',
        };
      case 'unsorted':
      default:
        return {
          bg: 'bg-[#38BDF8] text-slate-950',
          border: 'border-sky-400 shadow-xs',
          label: 'Unsorted',
          badgeBg: 'bg-sky-100 text-sky-800 border-sky-300 font-bold',
        };
    }
  };

  const boundaryIndex = currentStep.sortedBoundary;

  return (
    <div className="w-full bg-white border border-[#CBDED1] rounded-xl p-5 sm:p-6 shadow-[0_1px_3px_rgba(20,60,40,0.06)] flex flex-col gap-6">
      {/* Top Header & Contextual Indicator */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#CBDED1] pb-4">
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-wider font-extrabold text-[#3D5E50]">
            Array Visualization
          </span>
          <span className="text-[#A3C2AE]">·</span>
          <span className="text-xs text-[#5A7A6C] font-mono font-semibold">
            {n} Elements
          </span>
        </div>

        {currentStep.keyVal !== null && (
          <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-orange-50 border border-orange-200 text-xs text-orange-900">
            <span className="w-2 h-2 rounded-full bg-orange-600 animate-pulse" />
            <span className="font-bold">Active Key:</span>
            <span className="font-mono text-sm font-extrabold text-orange-700">{currentStep.keyVal}</span>
          </div>
        )}
      </div>

      {/* Lift Zone & Visual Canvas */}
      <div className="relative w-full min-h-[340px] pt-14 pb-4 flex flex-col justify-end items-center bg-[#F2F8F4] rounded-xl border border-[#CBDED1] overflow-x-auto px-4">
        {/* Lift zone guideline */}
        <div className="absolute top-4 left-6 right-6 border-b border-dashed border-[#A3C2AE] flex items-center justify-between pointer-events-none">
          <span className="text-[11px] font-mono text-[#5A7A6C] uppercase tracking-wider pb-1 font-semibold">
            ↑ Key Lift & Insertion Track
          </span>
          {currentStep.keyVal !== null && (
            <span className="text-[11px] font-mono text-orange-700 font-bold pb-1">
              Elevated Key = {currentStep.keyVal}
            </span>
          )}
        </div>

        {/* Bars Container */}
        <div className="flex items-end justify-center gap-3 sm:gap-4 md:gap-6 w-full max-w-3xl relative h-[250px] mb-2">
          {bars.map((bar, index) => {
            const height = getBarHeight(bar.value);
            const styleConfig = getBarColorClasses(bar.status, bar.isLifted);
            const isDividerAfter = index === boundaryIndex && index < n - 1;

            return (
              <React.Fragment key={`bar-slot-${index}`}>
                {/* Single Bar Column */}
                <div className="flex flex-col items-center group relative min-w-[44px] sm:min-w-[56px] md:min-w-[64px]">
                  {/* Floating Lifted Badge or Marker when key */}
                  {bar.isLifted && (
                    <div className="absolute -top-14 z-20 flex flex-col items-center transition-all duration-300 animate-bounce">
                      <span className="bg-orange-600 text-white font-extrabold text-[11px] px-2.5 py-0.5 rounded shadow-md uppercase tracking-wider">
                        Key
                      </span>
                      <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-orange-600" />
                    </div>
                  )}

                  {/* The Vertical Bar */}
                  <div
                    style={{ height: `${height}px` }}
                    className={`w-full rounded-t-lg font-mono font-bold flex flex-col justify-between items-center py-2 border transition-all duration-300 ease-out select-none ${
                      styleConfig.bg
                    } ${styleConfig.border} ${
                      bar.isLifted
                        ? '-translate-y-12 scale-[1.04] shadow-xl z-10 ring-4 ring-orange-400/40'
                        : bar.isShifted
                        ? 'translate-x-2 transition-transform duration-300'
                        : 'translate-y-0'
                    }`}
                  >
                    {/* Top value badge */}
                    <span className="text-sm sm:text-base font-extrabold tracking-tight">
                      {bar.value}
                    </span>

                    {/* Subtle status glyph inside tall bars */}
                    {height > 100 && (
                      <span className="text-[10px] font-bold opacity-90 uppercase tracking-wider">
                        {bar.status === 'key' ? 'KEY' : ''}
                      </span>
                    )}

                    {/* Bottom bar indicator line */}
                    <div className="w-3/4 h-1 rounded bg-black/15" />
                  </div>

                  {/* Index and Status Label below bar */}
                  <div className="mt-2.5 flex flex-col items-center gap-1">
                    <span className="text-xs font-mono text-[#3D5E50] font-bold">
                      [{index}]
                    </span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded border ${styleConfig.badgeBg}`}
                    >
                      {styleConfig.label}
                    </span>
                  </div>
                </div>

                {/* Vertical Divider Line between Sorted and Unsorted */}
                {isDividerAfter && (
                  <div className="relative flex flex-col items-center h-[260px] justify-center px-1">
                    <div className="h-full border-r-2 border-dashed border-emerald-600" />
                    <div className="absolute -top-3 whitespace-nowrap bg-emerald-50 border border-emerald-400 text-emerald-900 text-[10px] px-2 py-0.5 rounded font-mono font-bold shadow-xs">
                      Sorted Boundary
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F4F9F5] p-3.5 rounded-lg border border-[#CBDED1]">
        <div className="flex items-center gap-2.5">
          <span className="w-3.5 h-3.5 rounded bg-[#16A34A] border border-emerald-700 shrink-0 shadow-xs" />
          <div className="flex flex-col text-xs">
            <span className="font-bold text-[#132E22]">Sorted Section</span>
            <span className="text-[11px] text-[#5A7A6C]">Ordered left subarray</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="w-3.5 h-3.5 rounded bg-[#EA580C] border border-orange-600 shrink-0 shadow-xs" />
          <div className="flex flex-col text-xs">
            <span className="font-bold text-[#132E22]">Key Element</span>
            <span className="text-[11px] text-[#5A7A6C]">Lifted for insertion</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="w-3.5 h-3.5 rounded bg-[#FACC15] border border-yellow-500 shrink-0 shadow-xs" />
          <div className="flex flex-col text-xs">
            <span className="font-bold text-[#132E22]">Comparing</span>
            <span className="text-[11px] text-[#5A7A6C]">Compared against Key</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="w-3.5 h-3.5 rounded bg-[#38BDF8] border border-sky-400 shrink-0 shadow-xs" />
          <div className="flex flex-col text-xs">
            <span className="font-bold text-[#132E22]">Unsorted Section</span>
            <span className="text-[11px] text-[#5A7A6C]">Awaiting processing</span>
          </div>
        </div>
      </div>
    </div>
  );
};
