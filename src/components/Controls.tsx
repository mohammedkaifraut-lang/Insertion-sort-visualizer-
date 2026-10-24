import React from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Dice5,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Sliders,
} from 'lucide-react';

interface ControlsProps {
  inputVal: string;
  setInputVal: (val: string) => void;
  errorMessage: string | null;
  onStartSort: () => void;
  onReset: () => void;
  onRandomize: () => void;
  onPrevStep: () => void;
  onNextStep: () => void;
  onTogglePlay: () => void;
  isPlaying: boolean;
  canPrev: boolean;
  canNext: boolean;
  speed: number;
  setSpeed: (speed: number) => void;
  onSelectPreset: (presetKey: string) => void;
}

export const Controls: React.FC<ControlsProps> = ({
  inputVal,
  setInputVal,
  errorMessage,
  onStartSort,
  onReset,
  onRandomize,
  onPrevStep,
  onNextStep,
  onTogglePlay,
  isPlaying,
  canPrev,
  canNext,
  speed,
  setSpeed,
  onSelectPreset,
}) => {
  return (
    <div className="w-full bg-white border border-[#CBDED1] rounded-xl p-5 sm:p-6 shadow-[0_1px_3px_rgba(20,60,40,0.06)] flex flex-col gap-6">
      {/* Input Section & Start Sort Action */}
      <div className="flex flex-col gap-2.5">
        <label className="text-sm font-bold text-[#132E22] flex items-center justify-between">
          <span>Array Input (5 to 7 numbers)</span>
          <span className="text-xs text-[#5A7A6C] font-normal">
            Separated by commas or spaces
          </span>
        </label>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          <div className="relative flex-1">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') onStartSort();
              }}
              placeholder="e.g. 5, 3, 8, 1, 9"
              className={`w-full bg-[#F8FBF9] border px-3.5 py-2.5 rounded-lg text-sm font-mono text-[#132E22] placeholder-[#7E9C8E] focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                errorMessage
                  ? 'border-rose-400 focus:ring-rose-400/40'
                  : 'border-[#CBDED1] focus:ring-emerald-600/30 focus:border-emerald-600'
              }`}
            />
          </div>

          <div className="flex items-center gap-2">
            {/* Start Sort as the primary action */}
            <button
              onClick={onStartSort}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-600 active:bg-emerald-800 text-white rounded-lg text-xs font-bold shadow-sm transition-all whitespace-nowrap cursor-pointer active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Start Sort</span>
            </button>

            <button
              onClick={onRandomize}
              title="Generate random array of 5 to 7 numbers"
              className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 bg-white hover:bg-[#F2F8F4] text-[#2D4A3E] border border-[#CBDED1] rounded-lg text-xs font-semibold shadow-2xs transition-colors cursor-pointer active:scale-95"
            >
              <Dice5 className="w-4 h-4 text-emerald-700" />
              <span className="hidden sm:inline">Random</span>
            </button>

            <button
              onClick={onReset}
              title="Reset sort to beginning"
              className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 bg-white hover:bg-[#F2F8F4] text-[#2D4A3E] border border-[#CBDED1] rounded-lg text-xs font-semibold shadow-2xs transition-colors cursor-pointer active:scale-95"
            >
              <RotateCcw className="w-4 h-4 text-amber-700" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Validation Error Message */}
        {errorMessage && (
          <div className="flex items-center gap-2 px-3 py-2 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 animate-fadeIn">
            <span className="font-semibold text-rose-800">Error:</span>
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-bold text-[#3D5E50] flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
          <span>Quick Presets</span>
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            onClick={() => onSelectPreset('example')}
            className="px-3 py-2 text-xs bg-[#F4F9F5] hover:bg-[#EAF3EC] border border-[#CBDED1] hover:border-[#A3C2AE] rounded-lg text-[#132E22] font-medium transition-all text-left flex flex-col cursor-pointer shadow-2xs"
          >
            <span className="text-[#132E22] font-bold truncate">Example</span>
            <span className="text-[11px] text-[#5A7A6C] font-mono">5, 3, 8, 1, 9</span>
          </button>

          <button
            onClick={() => onSelectPreset('worst')}
            className="px-3 py-2 text-xs bg-[#F4F9F5] hover:bg-[#EAF3EC] border border-[#CBDED1] hover:border-[#A3C2AE] rounded-lg text-[#132E22] font-medium transition-all text-left flex flex-col cursor-pointer shadow-2xs"
          >
            <span className="text-rose-700 font-bold truncate">Reverse Sorted</span>
            <span className="text-[11px] text-[#5A7A6C] font-mono">9, 7, 5, 3, 1 (Worst)</span>
          </button>

          <button
            onClick={() => onSelectPreset('best')}
            className="px-3 py-2 text-xs bg-[#F4F9F5] hover:bg-[#EAF3EC] border border-[#CBDED1] hover:border-[#A3C2AE] rounded-lg text-[#132E22] font-medium transition-all text-left flex flex-col cursor-pointer shadow-2xs"
          >
            <span className="text-emerald-700 font-bold truncate">Already Sorted</span>
            <span className="text-[11px] text-[#5A7A6C] font-mono">1, 2, 4, 6, 8 (Best)</span>
          </button>

          <button
            onClick={() => onSelectPreset('max')}
            className="px-3 py-2 text-xs bg-[#F4F9F5] hover:bg-[#EAF3EC] border border-[#CBDED1] hover:border-[#A3C2AE] rounded-lg text-[#132E22] font-medium transition-all text-left flex flex-col cursor-pointer shadow-2xs"
          >
            <span className="text-sky-700 font-bold truncate">7 Numbers</span>
            <span className="text-[11px] text-[#5A7A6C] font-mono">42, 17, 88, 3, 65, 29, 51</span>
          </button>
        </div>
      </div>

      {/* Playback & Step Controls */}
      <div className="pt-4 border-t border-[#CBDED1] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Step Buttons & Auto Play */}
        <div className="flex items-center gap-2">
          <button
            onClick={onPrevStep}
            disabled={!canPrev}
            className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
              canPrev
                ? 'bg-white hover:bg-[#F2F8F4] text-[#2D4A3E] border-[#CBDED1] shadow-2xs active:scale-95'
                : 'opacity-40 cursor-not-allowed bg-[#F8FBF9] text-[#7E9C8E] border-[#CBDED1]'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Prev Step</span>
          </button>

          <button
            onClick={onTogglePlay}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white transition-all shadow-sm active:scale-95 cursor-pointer ${
              isPlaying
                ? 'bg-amber-600 hover:bg-amber-500'
                : 'bg-emerald-700 hover:bg-emerald-600'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-white" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>Auto-play</span>
              </>
            )}
          </button>

          <button
            onClick={onNextStep}
            disabled={!canNext}
            className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
              canNext
                ? 'bg-white hover:bg-[#F2F8F4] text-[#2D4A3E] border-[#CBDED1] shadow-2xs active:scale-95'
                : 'opacity-40 cursor-not-allowed bg-[#F8FBF9] text-[#7E9C8E] border-[#CBDED1]'
            }`}
          >
            <span>Next Step</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Speed Slider */}
        <div className="flex items-center gap-3 bg-[#F4F9F5] px-3.5 py-2 rounded-lg border border-[#CBDED1]">
          <Sliders className="w-4 h-4 text-[#5A7A6C] shrink-0" />
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center justify-between gap-4 text-[11px] text-[#3D5E50] font-mono">
              <span className="font-semibold">Playback Speed</span>
              <span className="text-emerald-700 font-bold">{speed}x</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.5"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-28 sm:w-36 h-1.5 bg-[#CBDED1] rounded-lg appearance-none cursor-pointer accent-emerald-700"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
