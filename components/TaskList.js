import React, { Component } from "react";
import { FlatList } from "react-native";
import TaskItem from "./TaskItem";

class TaskList extends Component {
  state = {
    isChecked: {}
  };

  _keyExtractor = (item, index) => item.id.toString();

  _onPressItem = id => {
    console.log("onPressItem");
    this.setState(state => {
      // copy the map rather than modify the state
      const isChecked = state.isChecked;
      isChecked[id] = !isChecked[id]; // toggle
      return { isChecked };
    });
  };

  _renderItem = ({ item }) => (
    <TaskItem
      id={item.id}
      title={item.title}
      onPressItem={this._onPressItem}
      isChecked={!!this.state.isChecked[item.id]}
    />
  );

  render() {
    const { data } = this.props;
    return (
      <FlatList
        data={data}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}

export default TaskList;
