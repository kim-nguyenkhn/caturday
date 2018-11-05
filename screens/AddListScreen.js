import React, { Component } from "react";
import { TextInput, View } from "react-native";
import { NavigationEvents } from "react-navigation";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { GET_LISTS_QUERY } from "./HomeScreen";

const CREATE_LIST_MUTATION = gql`
  mutation CREATE_LIST_MUTATION(
    # Define the arguments passed-in
    $title: String!
  ) {
    # Run this mutation
    createList(title: $title) {
      # Return the id once it's created
      id
    }
  }
`;

class AddListScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("listTitle")
    };
  };

  state = {
    title: ""
  };
  render() {
    // TODO: Wrap the JSX in a Mutation component
    // TODO: Define when a save should be "executed"
    // TODO: Save the list in the db
    // https://www.apollographql.com/docs/react/essentials/mutations.html
    return (
      <Mutation mutation={CREATE_LIST_MUTATION} variables={this.state}>
        {(createList, { loading, error }) => (
          <View style={{ padding: 20 }}>
            <NavigationEvents
              onWillBlur={async payload => {
                // create the List as the screen is blurring, or navigating away
                const res = await createList({
                  // Update the lists after mutating
                  refetchQueries: [{ query: GET_LISTS_QUERY }]
                });
                console.log(res);
              }}
            />
            <TextInput
              style={{ height: 40, fontSize: 20 }}
              onChangeText={title => {
                this.setState({ title });
                this.props.navigation.setParams({ title: title });
              }}
              placeholder="List Title"
              value={this.state.title}
            />
          </View>
        )}
      </Mutation>
    );
  }
}

export default AddListScreen;
