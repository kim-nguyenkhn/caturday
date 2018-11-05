import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "react-native-button";

export default class ListCard extends Component {
  render() {
    const { handlePress } = this.props;
    return (
      <View style={[styles.view, { borderLeftColor: generateRandomColor() }]}>
        <Button onPress={handlePress} style={styles.listCard}>
          {this.props.children}
        </Button>
      </View>
    );
  }
}

const generateRandomColor = () => {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const styles = StyleSheet.create({
  view: {
    borderLeftWidth: 5,
    marginBottom: 10,
    backgroundColor: "#fff",
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
