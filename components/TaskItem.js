import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";

class TaskItem extends Component {
  onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    const textColor = this.props.isChecked ? "red" : "black";
    return (
      <TouchableOpacity onPress={this.onPress}>
        <View>
          <Text style={{ color: textColor }}>{this.props.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default TaskItem;
