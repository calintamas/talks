import PropTypes from "prop-types";
import React from "react";

import { useToggler } from "./useToggler";
import TogglerUI from "./TogglerUI";

function Toggler({ data, initialIndex, onValueChange }) {
  const { next, prev, currentValue, isLowerBound, isUpperBound } = useToggler({
    data,
    initialIndex,
    onValueChange,
  });

  return (
    <TogglerUI
      currentValue={currentValue}
      onNext={next}
      onPrev={prev}
      isLowerBound={isLowerBound}
      isUpperBound={isUpperBound}
    />
  );
}

Toggler.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any),
  initialIndex: PropTypes.number,
  onValueChange: PropTypes.func,
};

Toggler.defaultProps = {
  data: [],
  initialIndex: 0,
  onValueChange: () => {},
};

export default Toggler;
