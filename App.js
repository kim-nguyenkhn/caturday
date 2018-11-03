import React from "react";
import { createStackNavigator } from "react-navigation";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import HomeScreen from "./screens/HomeScreen";
import AddListScreen from "./screens/AddListScreen";

const COLOR_MAGENTA = "#ca2779";
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

// Define routes
const RouteConfig = createStackNavigator(
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

const ApolloApp = () => (
  <ApolloProvider client={client}>
    <RouteConfig />
  </ApolloProvider>
);

export default ApolloApp;
