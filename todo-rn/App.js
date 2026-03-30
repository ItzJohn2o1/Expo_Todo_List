import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { ThemeProvider, CheckBox, Input, Button } from '@rneui/themed';

export default function App() {
  const [tasks, setTasks] = useState([
    { key: "1", description: "Finish DIG todo app", completed: false },
    { key: "2", description: "Go to the gym", completed: true },
    { key: "3", description: "Study for exam", completed: false },
  ]);

  const [newTask, setNewTask] = useState("");

  const toggleTask = (key) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.key === key ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const addTask = () => {
    const trimmed = newTask.trim();
    if (!trimmed) return;
    const nextKey = (tasks.length + 1).toString();
    setTasks((prev) => [
      ...prev,
      { key: nextKey, description: trimmed, completed: false },
    ]);
    setNewTask("");
  };

  const renderItem = ({ item }) => (
    <CheckBox
      checked={item.completed}
      onPress={() => toggleTask(item.key)}
      title={
        <Text
          style={
            item.completed
              ? styles.completedText
              : styles.normalText
          }
        >
          {item.description}
        </Text>
      }
    />
  );

  return (
    <ThemeProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Todo List</Text>

        <View style={styles.inputRow}>
          <Input
            placeholder="New task"
            value={newTask}
            onChangeText={setNewTask}
            containerStyle={styles.inputContainer}
          />
          <Button title="Add" onPress={addTask} />
        </View>

        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
        />
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: "600",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputContainer: {
    flex: 1,
    paddingRight: 8,
  },
  normalText: {
    fontSize: 16,
  },
  completedText: {
    fontSize: 16,
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    color: "#777",
  },
});
