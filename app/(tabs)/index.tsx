import React, { useState } from 'react';
import { tasks as initialTasks } from '@/components/tasks';
import { StyleSheet, View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  const [taskInput, setTaskInput] = useState('');
  const [items, setItems] = useState<string[]>(initialTasks);
  const [checkedItems, setCheckedItems] = useState<boolean[]>(initialTasks.map(() => false));

  const toggleCheckbox = (id: number) => {
    setCheckedItems(prev => prev.map((item, i) => i === id ? !item : item));
    if (checkedItems[id]) { 
      setItems(prev => prev.filter((item, i) => i !== id));
    }
  };

  const handleAddTask = () => {
    const trimmed = taskInput.trim();
    if (!trimmed) return;
    setItems(prev => [...prev, trimmed]);
    setCheckedItems(prev => [...prev, false]);
    setTaskInput('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.myText}>Home</Text>
      <TextInput
        id="taskInput"
        placeholder="Enter your task"
        style={styles.input}
        value={taskInput}
        onChangeText={setTaskInput}
      />
      <Button
        title="Add Task"
        onPress={handleAddTask}
      />
      
      <FlatList
        style={styles.myFlatList}
        data={items}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => toggleCheckbox(index)}>
            <Text style={{ textDecorationLine: checkedItems[index] ? 'line-through' : 'none', color: checkedItems[index] ? 'red' : 'black' }}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:'20%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    marginBottom: 8,
    width: 300,
    height: 40,
    borderRadius: 10,
  },
  myFlatList: {
    width: 300,
    height: 400,
    fontSize: 25,
    borderRadius: 10,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  myText: {
    color: 'Red',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    marginBottom:10,
  },
});
