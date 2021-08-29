/* eslint-env jest */

import { renderHook, act } from "@testing-library/react-hooks";

import { useToggler } from "../useToggler";

const setup = (options) => {
  const data = [1, 2, 3];
  const initialIndex = 0;
  const utils = renderHook(() =>
    useToggler({
      data,
      initialIndex,
      ...options,
    })
  );
  return {
    data,
    initialIndex,
    ...utils,
  };
};

describe("test useToggler hook", () => {
  it("returns defaults", () => {
    const { result } = setup({
      data: undefined,
      initialIndex: undefined,
    });
    const { next, prev, currentValue, isLowerBound, isUpperBound } =
      result.current;

    expect(currentValue).toBe(undefined);
    expect(isLowerBound).toBe(true);
    expect(isUpperBound).toBe(false);
    expect(typeof next).toBe("function");
    expect(typeof prev).toBe("function");
  });

  it("goes to next value", () => {
    const { result, data, initialIndex } = setup();
    expect(result.current.currentValue).toBe(data[initialIndex]);

    act(() => {
      result.current.next();
    });
    expect(result.current.currentValue).toBe(data[initialIndex + 1]);
    expect(result.current.isLowerBound).toBe(false);
    expect(result.current.isUpperBound).toBe(false);
  });

  it("goes to previous value", () => {
    const initialIndex = 1;
    const { result, data } = setup({
      initialIndex,
    });
    expect(result.current.currentValue).toBe(data[initialIndex]);

    act(() => {
      result.current.prev();
    });
    expect(result.current.currentValue).toBe(data[initialIndex - 1]);
    expect(result.current.isLowerBound).toBe(true);
    expect(result.current.isUpperBound).toBe(false);
  });

  it("reaches lower bound", () => {
    const { result, data, initialIndex } = setup();
    expect(result.current.currentValue).toBe(data[initialIndex]);

    act(() => {
      result.current.prev();
    });
    expect(result.current.currentValue).toBe(data[initialIndex]);
    expect(result.current.isLowerBound).toBe(true);
    expect(result.current.isUpperBound).toBe(false);
  });

  it("reaches upper bound", () => {
    const { result, data, initialIndex } = setup();
    expect(result.current.currentValue).toBe(data[initialIndex]);

    act(() => {
      result.current.next();
      result.current.next();
    });
    expect(result.current.currentValue).toBe(data[initialIndex + 2]);
    expect(result.current.isLowerBound).toBe(false);
    expect(result.current.isUpperBound).toBe(true);
  });

  it("calls onValueChange with the right arguments", () => {
    const onValueChange = jest.fn();
    const { result, data, initialIndex } = setup({
      onValueChange,
    });
    expect(result.current.currentValue).toBe(data[initialIndex]);

    act(() => {
      result.current.next();
    });
    expect(result.current.currentValue).toBe(data[initialIndex + 1]);
    expect(onValueChange).toHaveBeenCalledWith(data[initialIndex + 1]);
  });

  it("is not going out of bounds (lower bound)", () => {
    const { result, data, initialIndex } = setup();
    expect(result.current.currentValue).toBe(data[initialIndex]);

    act(() => {
      result.current.prev();
    });
    expect(result.current.currentValue).toBe(data[initialIndex]);
    expect(result.current.isLowerBound).toBe(true);
    expect(result.current.isUpperBound).toBe(false);

    // Try to go to "previous" value again
    act(() => {
      result.current.prev();
    });
    expect(result.current.currentValue).toBe(data[initialIndex]);
    expect(result.current.isLowerBound).toBe(true);
    expect(result.current.isUpperBound).toBe(false);
  });

  it("is not going out of bounds (upper bound)", () => {
    const { result, data, initialIndex } = setup();
    expect(result.current.currentValue).toBe(data[initialIndex]);

    act(() => {
      result.current.next();
      result.current.next();
    });
    expect(result.current.currentValue).toBe(data[initialIndex + 2]);
    expect(result.current.isLowerBound).toBe(false);
    expect(result.current.isUpperBound).toBe(true);

    // Try to go to "next" value again
    act(() => {
      result.current.next();
    });
    expect(result.current.currentValue).toBe(data[initialIndex + 2]);
    expect(result.current.isLowerBound).toBe(false);
    expect(result.current.isUpperBound).toBe(true);
  });
});
