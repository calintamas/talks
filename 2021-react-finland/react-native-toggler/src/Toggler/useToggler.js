import React from "react";

import { bound } from "../utils/number";

function useToggler({ data = [], initialIndex = 0, onValueChange = () => {} }) {
  const [index, setIndex] = React.useState(initialIndex);
  const count = data.length - 1;

  const next = React.useCallback(() => {
    setIndex((i) => bound(i + 1, 0, count));
  }, [count]);

  const prev = React.useCallback(() => {
    setIndex((i) => bound(i - 1, 0, count));
  }, [count]);

  const currentValue = data[index];
  const isLowerBound = index === 0;
  const isUpperBound = index === count;

  React.useEffect(() => {
    onValueChange(currentValue);
  }, [currentValue, onValueChange]);

  return {
    next,
    prev,
    currentValue,
    isLowerBound,
    isUpperBound,
  };
}

export { useToggler };
