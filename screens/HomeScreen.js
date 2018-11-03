import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Button from "react-native-button";
import { Constants } from "expo";

const GET_LISTS = gql`
  {
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

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={styles.statusBar} />
        <View style={styles.mainContent}>
          <View>
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
                    <Text key={list.id}>{list.title}</Text>
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
