import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "react-native-button";

export default class ListCard extends Component {
  render() {
    const { handlePress } = this.props;
    return (
      <View>
        <Button onPress={handlePress} style={styles.listCard}>
          {this.props.children}
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listCard: {
    color: "#000",
    backgroundColor: "#fff",
    fontSize: 25,
    // borderWidth: 1,
    // borderColor: "#aaa",
    borderLeftWidth: 5,
    borderLeftColor: "green",
    textAlign: "left",
    padding: 20,
    marginBottom: 10,
    shadowColor: "#111",
    shadowOffset: {
      height: 3
    },
    shadowOpacity: 0.25,
    shadowRadius: 3
  }
});
