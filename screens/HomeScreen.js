import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Query } from "react-apollo";
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
        <View style={styles.statusBar} />
        {/* TODO: This should be a scrollview methinks */}
        <View style={styles.mainContent}>
          <ListCard handlePress={this.handlePress}>+ New List</ListCard>
          <Query query={GET_LISTS}>
            {({ loading, error, data }) => {
              if (loading) return <Text>Loading...</Text>;
              if (error) {
                console.log(error);
                return <Text>Error</Text>;
              }
              // TODO: https://www.apollographql.com/docs/react/essentials/queries.html
              console.log(data);
              return (
                <View>
                  {data.lists.map(list => (
                    <ListCard key={list.id}>{list.title}</ListCard>
                  ))}
                </View>
              );
            }}
          </Query>
        </View>
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
    height: Constants.statusBarHeight
  },
  mainContent: {
    padding: 20,
    backgroundColor: "#fff"
  }
});

export default HomeScreen;
