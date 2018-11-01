/**
 * Notes:
 * Expo StatusBar: https://docs.expo.io/versions/latest/guides/configuring-statusbar
 */

import React from "react";
import { StyleSheet, Button, Text, StatusBar, View } from "react-native";
import { Constants } from "expo";

class App extends React.Component {
  handlePress = e => {
    console.log("pressed");
  };

  render() {
    return (
      <View>
        <View style={styles.statusBar} />
      </View>
    );
  }
}

const COLOR_MAGENTA = "#ca2779";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  statusBar: {
    height: Constants.statusBarHeight
  }
});

export default App;
