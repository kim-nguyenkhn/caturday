import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import Button from "react-native-button";
import { Constants } from "expo";

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
