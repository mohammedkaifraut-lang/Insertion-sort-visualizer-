/**
 * Type definitions for Insertion Sort visualization
 */

export type ElementStatus = 'sorted' | 'key' | 'comparing' | 'shifting' | 'unsorted' | 'placed';

export interface VisualBar {
  id: string;             // Persistent identifier across steps
  value: number;          // Numeric value
  status: ElementStatus;  // Color and highlight state
  isLifted: boolean;      // True if elevated as key
  isShifted: boolean;     // True if currently shifting position
}

export type StepType = 
  | 'initial'
  | 'pick_key'
  | 'compare'
  | 'shift'
  | 'insert'
  | 'pass_complete'
  | 'finished';

export interface SortStep {
  stepIndex: number;
  totalSteps: number;
  passNumber: number;         // 1 to N-1 (or 0 for initial)
  totalPasses: number;
  type: StepType;
  keyVal: number | null;
  keyOriginalIndex: number | null;
  comparingIndex: number | null;
  shiftedIndex: number | null;
  targetIndex: number | null;
  sortedBoundary: number;      // index up to which elements are in the sorted sub-array
  bars: VisualBar[];           // State of all bars at this step
  arraySnapshot: number[];     // Current values in order
  description: string;         // Plain-English narrative for the log
  codeLine: number;            // 1-indexed line for pseudocode highlighting
  comparisonsSoFar: number;
  shiftsSoFar: number;
  isPassEnd?: boolean;
}

export interface SortMetrics {
  totalComparisons: number;
  totalShifts: number;
  initialArray: number[];
  finalArray: number[];
  caseType: 'best' | 'worst' | 'average';
}
