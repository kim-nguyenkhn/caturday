import React, { Component } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
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
        <View style={styles.statusBar} />
        <View style={styles.mainContent}>
          <Mutation mutation={CLEAN_DB_MUTATION}>
            {(cleanDB, { loading, error }) => (
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
          <ScrollView>
            <Query query={GET_LISTS_QUERY}>
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
          </ScrollView>
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

// default is already used, so we use a named export
export { GET_LISTS_QUERY };
