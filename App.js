import React from "react";
import { createStackNavigator } from "react-navigation";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import HomeScreen from "./screens/HomeScreen";
import AddListScreen from "./screens/AddListScreen";

const COLOR_MAGENTA = "#ca2779";
const isDev = process.env.NODE_ENV === "development";

const client = new ApolloClient({
  // TODO: need to fix this. the issue is, if we use a phone, then the phone has a different IP than the server.
  uri: isDev
    ? "http://localhost:4000/graphql"
    : "https://caturday-12345.herokuapp.com/graphql"
});

// Define routes
const RouteConfig = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    AddList: { screen: AddListScreen }
  },
  {
    initialRouteName: "Home",

    // Define shared header configs
    navigationOptions: {
      headerStyle: {
        backgroundColor: COLOR_MAGENTA,
        borderBottomWidth: 0
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
