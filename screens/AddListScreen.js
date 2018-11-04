import React, { Component } from "react";
import { TextInput, View } from "react-native";
import gql from "graphql-tag";

const CREATE_LIST = gql``;

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
