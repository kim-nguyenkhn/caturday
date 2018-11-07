import React, { Component } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { NavigationEvents } from "react-navigation";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { GET_LISTS_QUERY } from "./HomeScreen";
import TaskList from "../components/TaskList";

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
    title: "",
    tasks: [
      { id: 1, title: "Buy a kitty", isChecked: false },
      { id: 2, title: "Feed a kitty", isChecked: false },
      { id: 3, title: "Pet a kitty", isChecked: false }
    ]
  };
  render() {
    return (
      <Mutation mutation={CREATE_LIST_MUTATION} variables={this.state}>
        {(createList, { loading, error }) => (
          <View style={{ padding: 20 }}>
            <NavigationEvents
              onWillBlur={async () => {
                // Do some validation
                if (this.state.title) {
                  // create the List as the screen is blurring, or navigating away
                  const res = await createList({
                    // Update the lists after mutating
                    refetchQueries: [{ query: GET_LISTS_QUERY }]
                  });
                  console.log(res);
                }
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
            {/* TODO: Add some mechanism to add tasks to this list */}
            <TaskList data={this.state.tasks} />
          </View>
        )}
      </Mutation>
    );
  }
}

export default AddListScreen;
