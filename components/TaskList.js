import React, { Component } from "react";
import { FlatList } from "react-native";
import TaskItem from "./TaskItem";

class TaskList extends Component {
  state = {
    isChecked: {}
  };

  keyExtractor = (item, index) => item.id.toString();

  onPressItem = id => {
    this.setState(state => {
      // copy the map rather than modify the state
      const isChecked = state.isChecked;
      isChecked[id] = !isChecked[id]; // toggle
      return { isChecked };
    });
  };

  renderItem = ({ item }) => (
    <TaskItem
      id={item.id}
      title={item.title}
      onPressItem={this.onPressItem}
      isChecked={!!this.state.isChecked[item.id]}
    />
  );

  render() {
    const { data } = this.props;
    return (
      <FlatList
        data={data}
        extraData={this.state}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
      />
    );
  }
}

export default TaskList;
