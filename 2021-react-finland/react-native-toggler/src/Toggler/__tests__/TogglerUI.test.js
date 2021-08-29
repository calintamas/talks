// @ts-nocheck
/* eslint-env jest */

import { render } from "@testing-library/react-native";
import React from "react";

import TogglerUI from "../TogglerUI";

const setup = (props) => {
  const onNext = jest.fn();
  const onPrev = jest.fn();
  const currentValue = "foo";
  const isLowerBound = false;
  const isUpperBound = false;

  const utils = render(
    <TogglerUI
      onNext={onNext}
      onPrev={onPrev}
      currentValue={currentValue}
      isLowerBound={isLowerBound}
      isUpperBound={isUpperBound}
      {...props}
    />
  );

  const prevButton = utils.queryByText("<");
  const nextButton = utils.queryByText(">");

  return {
    onNext,
    onPrev,
    currentValue,
    isLowerBound,
    isUpperBound,
    prevButton,
    nextButton,
    ...utils,
  };
};

describe("test TogglerUI component", () => {
  it("renders defaults", () => {
    const { prevButton, nextButton, currentValue, queryByText } = setup();

    expect(prevButton).toBeTruthy();
    expect(nextButton).toBeTruthy();
    expect(queryByText(currentValue)).toBeTruthy();
  });

  it("renders previous button disabled", () => {
    const { nextButton, prevButton } = setup({
      isLowerBound: true,
    });
    expect(prevButton).toBeTruthy();
    expect(prevButton).toBeDisabled();

    expect(nextButton).toBeTruthy();
    expect(nextButton).not.toBeDisabled();
  });

  it("renders next button disabled", () => {
    const { nextButton, prevButton } = setup({
      isUpperBound: true,
    });
    expect(nextButton).toBeTruthy();
    expect(nextButton).toBeDisabled();

    expect(prevButton).toBeTruthy();
    expect(prevButton).not.toBeDisabled();
  });

  it("renders both buttons disabled", () => {
    const { nextButton, prevButton } = setup({
      isUpperBound: true,
      isLowerBound: true,
    });
    expect(nextButton).toBeTruthy();
    expect(nextButton).toBeDisabled();

    expect(prevButton).toBeTruthy();
    expect(prevButton).toBeDisabled();
  });
});
