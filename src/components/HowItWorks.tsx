import React from 'react';
import { BookOpen, Layers, Zap, Clock, Check, ShieldCheck, Code2 } from 'lucide-react';

interface HowItWorksProps {
  activeCodeLine?: number;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ activeCodeLine }) => {
  const pseudocodeLines = [
    { line: 1, text: 'procedure insertionSort(A: array of items)' },
    { line: 2, text: '  for i from 1 to length(A) - 1 do' },
    { line: 3, text: '    key = A[i]           // pick next unsorted element' },
    { line: 4, text: '    j = i - 1' },
    { line: 5, text: '    while j >= 0 and A[j] > key do' },
    { line: 6, text: '      A[j + 1] = A[j]    // shift bigger element right' },
    { line: 7, text: '      j = j - 1' },
    { line: 8, text: '    A[j + 1] = key       // insert key into open position' },
    { line: 9, text: '  end for' },
    { line: 10, text: 'end procedure' },
  ];

  return (
    <div className="w-full bg-white border border-[#CBDED1] rounded-xl p-5 sm:p-6 shadow-[0_1px_3px_rgba(20,60,40,0.06)] flex flex-col gap-8">
      {/* Section Header */}
      <div className="flex items-center gap-3 border-b border-[#CBDED1] pb-4">
        <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800">
          <BookOpen className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#132E22]">
            How Insertion Sort Works
          </h2>
          <p className="text-xs text-[#5A7A6C]">
            Intuitive playing cards mental model, pseudocode implementation, and algorithmic complexities
          </p>
        </div>
      </div>

      {/* Part 1: The Playing Cards Analogy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-[#F4F9F5] p-5 rounded-xl border border-[#CBDED1]">
        <div className="flex flex-col gap-3 text-xs text-[#2D4A3E] leading-relaxed">
          <h3 className="text-sm font-bold text-[#132E22] flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-700" />
            <span>The Playing Cards Mental Model</span>
          </h3>
          <p>
            Insertion Sort behaves exactly like sorting a hand of playing cards in your fingers:
          </p>
          <ul className="flex flex-col gap-2.5 text-[#2D4A3E]">
            <li className="flex items-start gap-2">
              <span className="font-bold text-[#132E22] shrink-0">1.</span>
              <span><strong className="text-[#132E22]">Initial card:</strong> You pick up the first card. By itself in your left hand, it is already sorted.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-orange-700 shrink-0">2.</span>
              <span><strong className="text-orange-700">Pick the Key:</strong> You draw the next card with your right hand. This is your <em>Key</em>.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-amber-700 shrink-0">3.</span>
              <span><strong className="text-amber-800">Compare & shift right:</strong> You scan the cards in your left hand from right to left. Any card larger than your key slides one slot to the right.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-emerald-700 shrink-0">4.</span>
              <span><strong className="text-emerald-800">Insert:</strong> As soon as you hit a card smaller than the key, you drop the key into the open space.</span>
            </li>
          </ul>
        </div>

        {/* Visual Mini Diagram for Cards */}
        <div className="bg-white border border-[#CBDED1] rounded-xl p-5 flex flex-col gap-3 shadow-2xs">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#5A7A6C] font-bold">
            Visual Model: Inserting Card [3]
          </span>

          <div className="flex items-center justify-center gap-2 py-4">
            {/* Hand cards */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-16 rounded-md bg-emerald-700 border border-emerald-800 flex flex-col items-center justify-center text-white font-mono font-bold text-sm shadow-xs">
                <span>5</span>
                <span className="text-[9px] text-emerald-200">♣</span>
              </div>
              <span className="text-[10px] text-[#5A7A6C] font-semibold mt-1">Shifting →</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-12 h-16 rounded-md bg-emerald-700 border border-emerald-800 flex flex-col items-center justify-center text-white font-mono font-bold text-sm shadow-xs">
                <span>8</span>
                <span className="text-[9px] text-emerald-200">♦</span>
              </div>
              <span className="text-[10px] text-[#5A7A6C] font-semibold mt-1">Shifting →</span>
            </div>

            {/* Arrow */}
            <div className="text-emerald-800 font-bold px-1 text-xs">⟵ insert</div>

            {/* Lifted Key */}
            <div className="flex flex-col items-center -translate-y-3">
              <span className="text-[10px] font-bold text-orange-700 uppercase">Key</span>
              <div className="w-12 h-16 rounded-md bg-orange-600 border border-orange-700 flex flex-col items-center justify-center text-white font-mono font-bold text-sm shadow-md ring-2 ring-orange-300">
                <span>3</span>
                <span className="text-[9px] text-orange-100">♠</span>
              </div>
              <span className="text-[10px] text-orange-700 font-semibold mt-1">Finding slot</span>
            </div>
          </div>

          <p className="text-[11px] text-[#5A7A6C] leading-normal border-t border-[#E2ECE5] pt-2">
            Notice that larger cards [5, 8] shift right to create an opening, allowing the Key (3) to be dropped directly into index 0.
          </p>
        </div>
      </div>

      {/* Part 2: Pseudocode */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs text-[#2D4A3E] font-semibold">
          <div className="flex items-center gap-1.5">
            <Code2 className="w-4 h-4 text-emerald-700" />
            <span className="font-bold text-[#132E22]">Algorithm Pseudocode</span>
          </div>
          <span className="font-mono text-emerald-800 text-[11px] font-bold">0-indexed implementation</span>
        </div>

        <div className="bg-[#0F291E] rounded-xl p-4 font-mono text-xs overflow-x-auto shadow-inner text-emerald-100 border border-emerald-950">
          {pseudocodeLines.map((lineObj) => {
            const isHighlighted = activeCodeLine === lineObj.line;
            return (
              <div
                key={lineObj.line}
                className={`flex items-center gap-4 py-1 px-2 rounded transition-colors ${
                  isHighlighted
                    ? 'bg-emerald-800/60 text-white font-bold border-l-2 border-emerald-400'
                    : 'text-emerald-200/80 hover:bg-emerald-900/40'
                }`}
              >
                <span className="w-6 text-emerald-500/70 select-none text-right text-[11px]">
                  {lineObj.line}
                </span>
                <pre className="whitespace-pre">{lineObj.text}</pre>
              </div>
            );
          })}
        </div>
      </div>

      {/* Part 3: Complexity & Properties */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-bold text-[#132E22] flex items-center gap-2">
          <Clock className="w-4 h-4 text-emerald-700" />
          <span>Time & Space Complexity</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Best Case */}
          <div className="bg-[#EAF7EE] border border-emerald-300 rounded-xl p-4 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800">Best Case</span>
              <Clock className="w-4 h-4 text-emerald-700" />
            </div>
            <span className="text-2xl font-extrabold font-mono text-emerald-950">O(n)</span>
            <p className="text-[11px] text-emerald-900 leading-normal">
              Occurs when the input is already sorted. The inner loop halts on the very first comparison, requiring 0 shifts.
            </p>
          </div>

          {/* Average Case */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-800">Average Case</span>
              <Clock className="w-4 h-4 text-amber-700" />
            </div>
            <span className="text-2xl font-extrabold font-mono text-amber-950">O(n²)</span>
            <p className="text-[11px] text-amber-900 leading-normal">
              For randomly distributed inputs, on average each element shifts through half of the sorted prefix (~n²/4 operations).
            </p>
          </div>

          {/* Worst Case */}
          <div className="bg-rose-50/70 border border-rose-200 rounded-xl p-4 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-800">Worst Case</span>
              <Clock className="w-4 h-4 text-rose-700" />
            </div>
            <span className="text-2xl font-extrabold font-mono text-rose-950">O(n²)</span>
            <p className="text-[11px] text-rose-900 leading-normal">
              Occurs when elements are reverse sorted. Every element must shift past all preceding elements (n(n-1)/2 shifts).
            </p>
          </div>

          {/* Space Complexity */}
          <div className="bg-sky-50/70 border border-sky-200 rounded-xl p-4 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-sky-800">Space Complexity</span>
              <Zap className="w-4 h-4 text-sky-700" />
            </div>
            <span className="text-2xl font-extrabold font-mono text-sky-950">O(1)</span>
            <p className="text-[11px] text-sky-900 leading-normal">
              Strictly in-place algorithm requiring only a single auxiliary memory variable to hold the active Key.
            </p>
          </div>
        </div>

        {/* Properties row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          <div className="bg-[#F4F9F5] border border-[#CBDED1] p-3.5 rounded-lg flex items-start gap-2.5">
            <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div className="flex flex-col text-xs">
              <strong className="text-[#132E22] font-bold">Stable Sorting</strong>
              <span className="text-[#5A7A6C] text-[11px] mt-0.5">
                Preserves original relative order of duplicate elements.
              </span>
            </div>
          </div>

          <div className="bg-[#F4F9F5] border border-[#CBDED1] p-3.5 rounded-lg flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div className="flex flex-col text-xs">
              <strong className="text-[#132E22] font-bold">In-Place Memory</strong>
              <span className="text-[#5A7A6C] text-[11px] mt-0.5">
                Rearranges elements directly inside the existing array without extra allocation.
              </span>
            </div>
          </div>

          <div className="bg-[#F4F9F5] border border-[#CBDED1] p-3.5 rounded-lg flex items-start gap-2.5">
            <Zap className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div className="flex flex-col text-xs">
              <strong className="text-[#132E22] font-bold">Adaptive Performance</strong>
              <span className="text-[#5A7A6C] text-[11px] mt-0.5">
                Extremely fast on nearly-sorted data; used in standard library engines (Timsort) for small partitions.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
