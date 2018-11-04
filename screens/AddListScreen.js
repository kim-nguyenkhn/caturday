import React, { Component } from "react";
import { TextInput, View } from "react-native";
import gql from "graphql-tag";

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
    listTitle: ""
  };
  render() {
    // TODO: Wrap the JSX in a Mutation component
    // TODO: Define when a save should be "executed"
    // TODO: Save the list in the db
    // https://www.apollographql.com/docs/react/essentials/mutations.html
    return (
      <View style={{ padding: 20 }}>
        <TextInput
          style={{ height: 40, fontSize: 20 }}
          onChangeText={listTitle => {
            this.setState({ listTitle });
            this.props.navigation.setParams({ listTitle });
          }}
          placeholder="List name"
          value={this.state.listTitle}
        />
      </View>
    );
  }
}

export default AddListScreen;
