import { useCallback } from "react";

export default function useStepHandler(setactiveStep) {
  return useCallback(
    (step) => {
      if (step === "next") setactiveStep((prev) => prev + 1);
      else setactiveStep((prev) => prev - 1);
    },
    [setactiveStep]
  );
}
