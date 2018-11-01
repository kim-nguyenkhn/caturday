/**
 * Notes:
 * Expo StatusBar: https://docs.expo.io/versions/latest/guides/configuring-statusbar
 */

import React from "react";
import { StyleSheet, Text, StatusBar, View } from "react-native";
import { Constants } from "expo";
import { createStackNavigator } from "react-navigation";
import Button from "react-native-button";

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Caturday"
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <View style={styles.statusBar} />
        <View style={styles.navBar}>
          <Text style={styles.navBarText}>Caturday</Text>
        </View>
        <View style={styles.mainContent}>
          <View style={styles.buttonView}>
            <Button
              onPress={() => navigate("AddList", { data: "Cats" })}
              style={{
                color: "#000",
                backgroundColor: "#fff",
                fontSize: 25,
                borderWidth: 1,
                textAlign: "left",
                padding: 20
              }}
            >
              + New List
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

class AddListScreen extends React.Component {
  render() {
    return (
      <View>
        <Text> textInComponent </Text>
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
  },
  navBar: {
    height: 51,
    backgroundColor: COLOR_MAGENTA,
    justifyContent: "center",
    alignItems: "center"
  },
  navBarText: {
    color: "#fff",
    fontSize: 20
  },

  mainContent: {
    padding: 20,
    backgroundColor: "#fff"
  }
});

// Define routes
const App = createStackNavigator({
  Home: { screen: HomeScreen },
  AddList: { screen: AddListScreen }
});
export default App;
