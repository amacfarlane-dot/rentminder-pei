import { useState, useCallback } from "react";

const MAX_COMPARE = 3;

export const useComparisonTray = () => {
  const [compareIds, setCompareIds] = useState<string[]>([]);

  const toggleCompare = useCallback((id: string) => {
    setCompareIds((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : prev.length < MAX_COMPARE
          ? [...prev, id]
          : prev
    );
  }, []);

  const removeFromCompare = useCallback((id: string) => {
    setCompareIds((prev) => prev.filter((i) => i !== id));
  }, []);

  const clearCompare = useCallback(() => setCompareIds([]), []);

  const isInCompare = useCallback(
    (id: string) => compareIds.includes(id),
    [compareIds]
  );

  return {
    compareIds,
    toggleCompare,
    removeFromCompare,
    clearCompare,
    isInCompare,
    isFull: compareIds.length >= MAX_COMPARE,
    count: compareIds.length,
  };
};
