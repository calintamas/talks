import React from "react";
import { StyleSheet, View } from "react-native";

import Toggler from "./Toggler";

function App() {
  const onDurationChange = React.useCallback((newDuration) => {
    console.log({ newDuration });
  }, []);

  return (
    <View style={styles.base}>
      <Toggler
        data={["1 minute", "2 minutes", "3 minutes"]}
        initialIndex={1}
        onValueChange={onDurationChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flex: 1
  }
});

export default App;
