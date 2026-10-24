import { SortStep, VisualBar } from '../types/sort';

interface InternalItem {
  id: string;
  value: number;
}

/**
 * Generates every discrete visualization step of the Insertion Sort algorithm
 */
export function generateInsertionSortSteps(inputNumbers: number[]): SortStep[] {
  const n = inputNumbers.length;
  if (n === 0) return [];

  // Generate unique IDs for all items using original index and value
  const items: InternalItem[] = inputNumbers.map((val, idx) => ({
    id: `item-${idx}-${val}`,
    value: val,
  }));

  const steps: SortStep[] = [];
  let comparisons = 0;
  let shifts = 0;
  const totalPasses = Math.max(1, n - 1);

  // Helper to clone visual bars from current items array
  const createBars = (
    currentList: InternalItem[],
    options: {
      sortedBoundary: number;
      keyItemId?: string | null;
      comparingIndex?: number | null;
      shiftingIndex?: number | null;
      isLifted?: boolean;
    }
  ): VisualBar[] => {
    return currentList.map((item, index) => {
      const isKey = options.keyItemId === item.id;
      const isComp = options.comparingIndex === index;
      const isShift = options.shiftingIndex === index;
      const isSorted = !isKey && index <= options.sortedBoundary;

      let status: VisualBar['status'] = 'unsorted';
      if (isKey) {
        status = 'key';
      } else if (isComp) {
        status = 'comparing';
      } else if (isShift) {
        status = 'shifting';
      } else if (isSorted) {
        status = 'sorted';
      } else {
        status = 'unsorted';
      }

      return {
        id: `bar-slot-${index}-${item.id}`,
        value: item.value,
        status,
        isLifted: isKey && !!options.isLifted,
        isShifted: isShift,
      };
    });
  };

  // Step 0: Initial state
  // Index 0 is trivially sorted in insertion sort
  const initialBars = createBars(items, { sortedBoundary: 0 });
  steps.push({
    stepIndex: 0,
    totalSteps: 0,
    passNumber: 0,
    totalPasses,
    type: 'initial',
    keyVal: null,
    keyOriginalIndex: null,
    comparingIndex: null,
    shiftedIndex: null,
    targetIndex: null,
    sortedBoundary: 0,
    bars: initialBars,
    arraySnapshot: items.map((x) => x.value),
    description: `Initial array: [${items.map((x) => x.value).join(', ')}]. The first element (${items[0].value}) is trivially sorted.`,
    codeLine: 1,
    comparisonsSoFar: 0,
    shiftsSoFar: 0,
  });

  // Working copy of items
  const arr: InternalItem[] = [...items];

  for (let i = 1; i < n; i++) {
    const passNum = i;
    const keyItem = arr[i];
    const keyVal = keyItem.value;

    // Substep A: Pick Key
    steps.push({
      stepIndex: steps.length,
      totalSteps: 0,
      passNumber: passNum,
      totalPasses,
      type: 'pick_key',
      keyVal,
      keyOriginalIndex: i,
      comparingIndex: null,
      shiftedIndex: null,
      targetIndex: null,
      sortedBoundary: i - 1,
      bars: createBars(arr, {
        sortedBoundary: i - 1,
        keyItemId: keyItem.id,
        isLifted: true,
      }),
      arraySnapshot: arr.map((x) => x.value),
      description: `Pass ${passNum}: Selected Key = ${keyVal} at index ${i}. Lifted up for insertion into the sorted section [${arr
        .slice(0, i)
        .map((x) => x.value)
        .join(', ')}].`,
      codeLine: 2,
      comparisonsSoFar: comparisons,
      shiftsSoFar: shifts,
    });

    let j = i - 1;
    let keyPos = i;

    while (j >= 0) {
      comparisons++;

      // Substep B: Compare
      steps.push({
        stepIndex: steps.length,
        totalSteps: 0,
        passNumber: passNum,
        totalPasses,
        type: 'compare',
        keyVal,
        keyOriginalIndex: i,
        comparingIndex: j,
        shiftedIndex: null,
        targetIndex: null,
        sortedBoundary: i - 1,
        bars: createBars(arr, {
          sortedBoundary: i - 1,
          keyItemId: keyItem.id,
          comparingIndex: j,
          isLifted: true,
        }),
        arraySnapshot: arr.map((x) => x.value),
        description: `Pass ${passNum}: Compare Key (${keyVal}) with ${arr[j].value} at position ${j}.`,
        codeLine: 4,
        comparisonsSoFar: comparisons,
        shiftsSoFar: shifts,
      });

      if (arr[j].value > keyVal) {
        // Shift right: arr[j] moves to keyPos (j + 1)
        shifts++;
        const shiftedValue = arr[j].value;
        const shiftingItem = arr[j];

        arr[j + 1] = shiftingItem;
        arr[j] = keyItem; // Key smoothly slides into slot j
        keyPos = j;

        // Substep C: Shift
        steps.push({
          stepIndex: steps.length,
          totalSteps: 0,
          passNumber: passNum,
          totalPasses,
          type: 'shift',
          keyVal,
          keyOriginalIndex: i,
          comparingIndex: null,
          shiftedIndex: j + 1,
          targetIndex: null,
          sortedBoundary: i - 1,
          bars: createBars(arr, {
            sortedBoundary: i - 1,
            keyItemId: keyItem.id,
            shiftingIndex: j + 1,
            isLifted: true,
          }),
          arraySnapshot: arr.map((x) => x.value),
          description: `Pass ${passNum}: ${shiftedValue} > ${keyVal} → Shift ${shiftedValue} right to position ${j + 1}.`,
          codeLine: 5,
          comparisonsSoFar: comparisons,
          shiftsSoFar: shifts,
        });

        j--;
      } else {
        // No shift needed, position found
        break;
      }
    }

    // Substep D: Insert key into final slot (keyPos)
    const insertPos = j + 1;
    arr[insertPos] = keyItem;

    const currentArray = arr.map((x) => x.value);
    steps.push({
      stepIndex: steps.length,
      totalSteps: 0,
      passNumber: passNum,
      totalPasses,
      type: 'insert',
      keyVal,
      keyOriginalIndex: i,
      comparingIndex: null,
      shiftedIndex: null,
      targetIndex: insertPos,
      sortedBoundary: i,
      bars: createBars(arr, {
        sortedBoundary: i,
        keyItemId: null,
        isLifted: false,
      }),
      arraySnapshot: currentArray,
      description: `Pass ${passNum}: Insert Key (${keyVal}) at position ${insertPos} → [${currentArray.join(', ')}].`,
      codeLine: 7,
      comparisonsSoFar: comparisons,
      shiftsSoFar: shifts,
      isPassEnd: true,
    });
  }

  // Final Step: Array completely sorted
  const finalArray = arr.map((x) => x.value);
  steps.push({
    stepIndex: steps.length,
    totalSteps: 0,
    passNumber: totalPasses,
    totalPasses,
    type: 'finished',
    keyVal: null,
    keyOriginalIndex: null,
    comparingIndex: null,
    shiftedIndex: null,
    targetIndex: null,
    sortedBoundary: n - 1,
    bars: arr.map((item, index) => ({
      id: `bar-slot-${index}-${item.id}`,
      value: item.value,
      status: 'sorted',
      isLifted: false,
      isShifted: false,
    })),
    arraySnapshot: finalArray,
    description: `Sorting complete! All ${n} elements are sorted: [${finalArray.join(', ')}].`,
    codeLine: 8,
    comparisonsSoFar: comparisons,
    shiftsSoFar: shifts,
    isPassEnd: true,
  });

  // Patch totalSteps in each step
  const total = steps.length;
  steps.forEach((step) => {
    step.totalSteps = total;
  });

  return steps;
}

/**
 * Classifies the case complexity based on input and counts
 */
export function analyzeSortComplexity(
  originalArray: number[],
  comparisons: number,
  shifts: number
): {
  type: 'best' | 'worst' | 'average';
  summary: string;
} {
  const n = originalArray.length;
  if (n <= 1) {
    return {
      type: 'best',
      summary: 'Trivially sorted array.',
    };
  }

  // Check if originally already sorted
  let isSorted = true;
  for (let i = 0; i < n - 1; i++) {
    if (originalArray[i] > originalArray[i + 1]) {
      isSorted = false;
      break;
    }
  }

  if (isSorted && shifts === 0) {
    return {
      type: 'best',
      summary: `Best case: already sorted. Only ${comparisons} comparisons (1 per pass) and 0 shifts occurred, running in O(n) linear time.`,
    };
  }

  // Check if originally strictly reversed
  let isReversed = true;
  for (let i = 0; i < n - 1; i++) {
    if (originalArray[i] < originalArray[i + 1]) {
      isReversed = false;
      break;
    }
  }

  const maxPossibleShifts = (n * (n - 1)) / 2;
  if (isReversed || shifts === maxPossibleShifts) {
    return {
      type: 'worst',
      summary: `Worst case: reverse sorted. Maximum ${comparisons} comparisons and ${shifts} shifts occurred, running in O(n²) quadratic time.`,
    };
  }

  return {
    type: 'average',
    summary: `Average case: partially ordered data. Solved with ${comparisons} comparisons and ${shifts} shifts in O(n²) time.`,
  };
}

/**
 * Validates user string input:
 * Expects 5 to 7 numbers separated by commas or spaces.
 */
export function validateArrayInput(inputStr: string): {
  isValid: boolean;
  numbers: number[];
  errorMessage?: string;
} {
  const trimmed = inputStr.trim();
  if (!trimmed) {
    return {
      isValid: false,
      numbers: [],
      errorMessage: 'Please enter 5 to 7 numbers separated by commas or spaces.',
    };
  }

  // Split by commas, spaces, or tabs
  const tokens = trimmed.split(/[\s,]+/).filter((t) => t.length > 0);

  if (tokens.length < 5) {
    return {
      isValid: false,
      numbers: [],
      errorMessage: `Too few numbers (${tokens.length}). Please enter between 5 and 7 numbers.`,
    };
  }

  if (tokens.length > 7) {
    return {
      isValid: false,
      numbers: [],
      errorMessage: `Too many numbers (${tokens.length}). Please enter between 5 and 7 numbers.`,
    };
  }

  const parsedNumbers: number[] = [];
  for (const token of tokens) {
    const num = Number(token);
    if (isNaN(num) || !Number.isFinite(num)) {
      return {
        isValid: false,
        numbers: [],
        errorMessage: `"${token}" is not a valid number. All values must be numbers.`,
      };
    }
    // Limit to reasonable integers for clear bar display
    if (!Number.isInteger(num)) {
      return {
        isValid: false,
        numbers: [],
        errorMessage: `Please enter whole integers (found "${token}").`,
      };
    }
    if (num < 1 || num > 999) {
      return {
        isValid: false,
        numbers: [],
        errorMessage: `Values should be positive integers between 1 and 999 (found ${num}).`,
      };
    }
    parsedNumbers.push(num);
  }

  return {
    isValid: true,
    numbers: parsedNumbers,
  };
}
