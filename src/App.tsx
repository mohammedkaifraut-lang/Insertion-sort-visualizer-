/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { generateInsertionSortSteps, validateArrayInput } from './utils/insertionSort';
import { SortStep } from './types/sort';
import { SortVisualizer } from './components/SortVisualizer';
import { Controls } from './components/Controls';
import { LiveInfoPanel } from './components/LiveInfoPanel';
import { StepLog } from './components/StepLog';
import { HowItWorks } from './components/HowItWorks';
import { Play, Sparkles } from 'lucide-react';

export default function App() {
  const [inputVal, setInputVal] = useState<string>('5, 3, 8, 1, 9');
  const [activeArray, setActiveArray] = useState<number[]>([5, 3, 8, 1, 9]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sorting steps state
  const [steps, setSteps] = useState<SortStep[]>(() =>
    generateInsertionSortSteps([5, 3, 8, 1, 9])
  );
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1.0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize sort on array change
  const initializeSort = (numbers: number[], autoStart: boolean = false) => {
    const generatedSteps = generateInsertionSortSteps(numbers);
    setActiveArray(numbers);
    setSteps(generatedSteps);
    setCurrentStepIndex(0);
    setErrorMessage(null);
    if (autoStart) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  // Start Sort option - validates input and immediately starts animated sorting
  const handleStartSort = () => {
    const validation = validateArrayInput(inputVal);
    if (!validation.isValid) {
      setErrorMessage(validation.errorMessage || 'Invalid input array.');
      setIsPlaying(false);
      return;
    }
    setErrorMessage(null);

    const matchesCurrent =
      activeArray.length === validation.numbers.length &&
      activeArray.every((val, i) => val === validation.numbers[i]);

    if (matchesCurrent && currentStepIndex === 0) {
      setIsPlaying(true);
    } else if (matchesCurrent && currentStepIndex >= steps.length - 1) {
      setCurrentStepIndex(0);
      setIsPlaying(true);
    } else {
      initializeSort(validation.numbers, true);
    }
  };

  // Reset current sort back to step 0
  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  // Generate random array
  const handleRandomize = () => {
    const len = Math.floor(Math.random() * 3) + 5; // 5 to 7 numbers
    const nums: number[] = [];
    for (let i = 0; i < len; i++) {
      nums.push(Math.floor(Math.random() * 95) + 3);
    }
    const valString = nums.join(', ');
    setInputVal(valString);
    initializeSort(nums, false);
  };

  // Presets
  const handleSelectPreset = (presetKey: string) => {
    let presetNums: number[] = [];
    switch (presetKey) {
      case 'example':
        presetNums = [5, 3, 8, 1, 9];
        break;
      case 'worst':
        presetNums = [9, 7, 5, 3, 1];
        break;
      case 'best':
        presetNums = [1, 2, 4, 6, 8];
        break;
      case 'max':
        presetNums = [42, 17, 88, 3, 65, 29, 51];
        break;
      default:
        presetNums = [5, 3, 8, 1, 9];
    }
    setInputVal(presetNums.join(', '));
    initializeSort(presetNums, false);
  };

  // Navigation steps
  const handlePrevStep = () => {
    setIsPlaying(false);
    setCurrentStepIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextStep = () => {
    setIsPlaying(false);
    setCurrentStepIndex((prev) => Math.min(steps.length - 1, prev + 1));
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      if (currentStepIndex >= steps.length - 1) {
        setCurrentStepIndex(0);
      }
      setIsPlaying(true);
    }
  };

  // Auto-play interval logic
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const intervalMs = Math.round(1100 / speed);
    timerRef.current = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev >= steps.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, intervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, speed, steps.length]);

  const currentStep = useMemo(() => {
    return steps[currentStepIndex] || steps[0];
  }, [steps, currentStepIndex]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EDF5F0] via-[#E6F0E9] to-[#DFECE2] text-[#132E22] flex flex-col font-sans selection:bg-emerald-600/20 selection:text-emerald-950">
      {/* Top Bar Header */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-[#CBDED1] px-4 sm:px-8 py-3.5 flex items-center justify-between gap-8 shadow-2xs">
        {/* Brand wordmark */}
        <a
          href="#"
          className="text-base sm:text-lg font-bold tracking-tight text-[#132E22] flex items-center gap-2.5 whitespace-nowrap shrink-0 hover:text-emerald-800 transition-colors"
        >
          <div className="w-7 h-7 rounded-lg bg-emerald-700 flex items-center justify-center text-white font-extrabold text-xs shadow-xs">
            IS
          </div>
          <span>Insertion Sort Visualizer</span>
        </a>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-[#2D4A3E]">
          <a
            href="#visualizer"
            className="hover:text-[#132E22] transition-colors whitespace-nowrap shrink-0"
          >
            Visualizer
          </a>
          <a
            href="#metrics"
            className="hover:text-[#132E22] transition-colors whitespace-nowrap shrink-0"
          >
            Live Metrics
          </a>
          <a
            href="#log"
            className="hover:text-[#132E22] transition-colors whitespace-nowrap shrink-0"
          >
            Execution Log
          </a>
          <a
            href="#how-it-works"
            className="hover:text-[#132E22] transition-colors whitespace-nowrap shrink-0"
          >
            How It Works
          </a>
        </nav>

        {/* Top bar Start Sort primary action */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleStartSort}
            className="px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-600 rounded-lg transition-all shadow-xs active:scale-95 whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Start Sort</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-10">
        {/* Main Heading & Subtitle */}
        <section className="flex flex-col gap-2.5 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Sorting Simulation</span>
            <span className="text-[#A3C2AE]">·</span>
            <span className="text-[#3D5E50] font-sans">O(n) best case to O(n²) average</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#132E22] text-balance">
            Insertion Sort Visualizer
          </h1>

          <p className="text-sm text-[#2D4A3E] leading-relaxed max-w-2xl font-medium">
            Watch numbers lift as the active key, compare against sorted left
            elements, and shift smoothly into their sorted slots. Enter your own
            custom 5 to 7 numbers or explore presets below.
          </p>
        </section>

        {/* Controls Deck */}
        <section id="controls" className="w-full">
          <Controls
            inputVal={inputVal}
            setInputVal={setInputVal}
            errorMessage={errorMessage}
            onStartSort={handleStartSort}
            onReset={handleReset}
            onRandomize={handleRandomize}
            onPrevStep={handlePrevStep}
            onNextStep={handleNextStep}
            onTogglePlay={handleTogglePlay}
            isPlaying={isPlaying}
            canPrev={currentStepIndex > 0}
            canNext={currentStepIndex < steps.length - 1}
            speed={speed}
            setSpeed={setSpeed}
            onSelectPreset={handleSelectPreset}
          />
        </section>

        {/* Visual Stage & Live Info */}
        <div id="visualizer" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Visualizer Bars Canvas (7 cols on desktop) */}
          <section className="lg:col-span-7 flex flex-col gap-6">
            <SortVisualizer
              currentStep={currentStep}
              allValues={activeArray}
            />
          </section>

          {/* Live Info Panel & Metrics (5 cols on desktop) */}
          <section id="metrics" className="lg:col-span-5 flex flex-col gap-6">
            <LiveInfoPanel
              currentStep={currentStep}
              originalArray={activeArray}
            />
          </section>
        </div>

        {/* Step-by-Step Log */}
        <section id="log" className="w-full">
          <StepLog
            steps={steps}
            currentStepIndex={currentStepIndex}
            onSelectStep={(idx) => {
              setIsPlaying(false);
              setCurrentStepIndex(idx);
            }}
          />
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full">
          <HowItWorks activeCodeLine={currentStep.codeLine} />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#CBDED1] bg-white/70 backdrop-blur-xs py-6 px-4 sm:px-8 mt-12 text-center text-xs text-[#5A7A6C]">
        <p>
          Insertion Sort Visualizer — An interactive educational tool for understanding in-place adaptive sorting.
        </p>
      </footer>
    </div>
  );
}
