/**
 * Notes:
 * Expo StatusBar: https://docs.expo.io/versions/latest/guides/configuring-statusbar
 */

// import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import HomeScreen from "./screens/HomeScreen";
import AddListScreen from "./screens/AddListScreen";

const COLOR_MAGENTA = "#ca2779";

// Define routes
const App = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    AddList: { screen: AddListScreen }
  },
  {
    // Define shared header configs
    initialRouteName: "Home",
    navigationOptions: {
      headerStyle: {
        backgroundColor: COLOR_MAGENTA
      },
      headerTintColor: "#fff"
    }
  }
);
export default App;
