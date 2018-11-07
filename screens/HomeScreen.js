import React, { Component } from "react";
import {
  ImageBackground,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from "react-native";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Constants } from "expo";
import ListCard from "../components/ListCard";

const GET_LISTS_QUERY = gql`
  query GET_LISTS_QUERY {
    lists {
      id
      title
    }
  }
`;

const CLEAN_DB_MUTATION = gql`
  mutation CLEAN_DB_MUTATION {
    cleanDB # simply clean the DB, and expect no response
  }
`;

class HomeScreen extends Component {
  static navigationOptions = {
    title: "Caturday"
  };

  handlePress = () => {
    const { navigate } = this.props.navigation;
    navigate("AddList", { data: "Cats" });
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <ImageBackground
          source={require("../assets/kittybackground.png")}
          style={styles.mainContent}
          imageStyle={{
            resizeMode: "cover"
          }}
        >
          <Mutation mutation={CLEAN_DB_MUTATION}>
            {(cleanDB, { loading, error }) => (
              // TODO: Perhaps make this a statusBar button
              <ListCard
                handlePress={async () => {
                  const res = await cleanDB({
                    refetchQueries: [{ query: GET_LISTS_QUERY }]
                  });
                  console.log(res);
                }}
              >
                &gt;CLEAN DB&lt;
              </ListCard>
            )}
          </Mutation>
          <ListCard handlePress={this.handlePress}>+ New List</ListCard>
          <Query query={GET_LISTS_QUERY}>
            {({ loading, error, data }) => {
              if (loading) return <Text>Loading...</Text>;
              if (error) {
                console.log(error);
                return <Text>Error</Text>;
              }
              return (
                <ScrollView
                  refreshControl={
                    // TODO: pull-to-refresh, this doesn't seem to work well
                    // Also, does this even make sense with our UX? lol
                    <RefreshControl
                      refreshing={data.networkStatus === 4}
                      onRefresh={data.refresh}
                    />
                  }
                >
                  {data.lists.map(list => (
                    <ListCard key={list.id}>{list.title}</ListCard>
                  ))}
                </ScrollView>
              );
            }}
          </Query>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  statusBar: {
    // height: Constants.statusBarHeight
  },
  mainContent: {
    padding: 20,
    backgroundColor: "#fff",
    width: "100%",
    height: "100%"
  }
});

export default HomeScreen;

// default is already used, so we use a named export
export { GET_LISTS_QUERY };
