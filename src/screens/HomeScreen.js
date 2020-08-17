import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = ({navigation}) => {

  const todos_list = useSelector(state => state.todos.todos_list)
  const dispatch = useDispatch();
  
  console.log(todos_list)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{margin: 15}}
          onPress={() => navigation.navigate('AddTodo')}>
          <Icon name="plus" size={25} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          {todos_list.length > 0 ? (
            <FlatList
              style={styles.todoListStyle}
              data={todos_list}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({item}) => {
                return (
                  <View style={styles.todoListItemStyle}>
                    <TouchableOpacity
                      style={{flex: 1, margin: 10}}
                      onPress={() => navigation.navigate('EditTodo', { existing_todoID: item.id })}>
                      {item.isDone ? (
                        <Text
                          style={{
                            fontSize: 18,
                            textDecorationLine: 'line-through',
                            textDecorationStyle: 'solid',
                          }}>
                          {item.task}
                        </Text>
                      ) : (
                        <Text style={{fontSize: 18}}>{item.task}</Text>
                      )}
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity
                        style={{margin: 10}}
                        onPress={() => dispatch({ type: 'TOGGLE_TODO', payload: { id: item.id }})}
                        >
                        <Icon style={{color:'#5CB85C'} }name={'check'} size={20} />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{margin: 10}}
                        onPress={() => dispatch({ type: 'DELETE_TODO', payload: { id: item.id }})}
                        >
                        <Icon style={{color:'#DC3545'}} name={'times'} size={20} />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
            />
          ) : (
            <Text>You have no todos right now..</Text>
          )}
          <TouchableOpacity
            style={styles.FloatingActionButton}
            onPress={() => navigation.navigate('AddTodo')}>
            <Icon name="plus" size={25} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    padding: 10,
  },
  todoListStyle: {
    flex: 1,
    padding: 5,
  },
  todoListItemStyle: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 3,
    padding: 5,
  },
  FloatingActionButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    borderRadius: 30,
    padding: 10,
    elevation: 2,
  },
});

export default HomeScreen;
