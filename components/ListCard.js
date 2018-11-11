import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "react-native-button";

export default class ListCard extends Component {
  render() {
    const { handlePress, tabColor } = this.props;
    return (
      <View
        style={[styles.view, { borderLeftColor: tabColor || "transparent" }]}
      >
        <Button onPress={handlePress} style={styles.listCard}>
          {this.props.children}
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    borderLeftWidth: 5,
    marginBottom: 10,
    backgroundColor: "rgba(255, 255, 255, 1)",
    shadowColor: "#111",
    shadowOffset: {
      height: 3
    },
    shadowOpacity: 0.25,
    shadowRadius: 3
  },
  listCard: {
    color: "#000",
    textAlign: "left",
    fontSize: 20,
    padding: 20
  }
});
