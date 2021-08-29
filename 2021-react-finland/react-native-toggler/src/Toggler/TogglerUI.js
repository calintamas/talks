import PropTypes from "prop-types";
import React from "react";
import { View, Text, Button } from "react-native";

import styles from "./styles";

function TogglerUI({
  onNext,
  onPrev,
  currentValue,
  isLowerBound,
  isUpperBound,
}) {
  return (
    <View style={styles.base}>
      <Button
        testID="prevButton"
        title="<"
        onPress={onPrev}
        disabled={isLowerBound}
      />
      <Text style={styles.text}>{currentValue}</Text>
      <Button
        testID="nextButton"
        title=">"
        onPress={onNext}
        disabled={isUpperBound}
      />
    </View>
  );
}

TogglerUI.propTypes = {
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  currentValue: PropTypes.string.isRequired,
  isLowerBound: PropTypes.bool,
  isUpperBound: PropTypes.bool,
};

TogglerUI.defaultProps = {
  isUpperBound: false,
  isLowerBound: false,
};

export default TogglerUI;
