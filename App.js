import React from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from 'expo-vector-icons'

export default function App() {

  const [todo, setTodo] = React.useState('');
  const [allTodos, setAllTodos] = React.useState([]);
  const [filter, setFilter] = React.useState('all');

  const addTodo = () => {
    setAllTodos([...allTodos, { todo, isChecked: false }])
  }

  const handleFiltration = () => {

    const filterdTasks =
      (filter === 'checked')
        ? allTodos.filter((item) => {
          return item.isChecked
        })
        : (filter === 'unchecked')
          ? allTodos.filter((item) => {
            return !item.isChecked
          })
          : allTodos

    return filterdTasks
  }

  const setCheckbox = (index) => {
    setAllTodos(
      allTodos.map((item,idx)=>{
      if(idx === index) return {...item, isChecked : !item.isChecked};
      return item 
    }))}

  return (
    <View style={styles.container}>
      
      <Text style={{fontSize: 40, fontWeight: 'bold'}} > Baby Shark </Text>
      <Text style={{fontSize: 30, fontWeight: 'bold'}} > ToDo dododo </Text>
      <Text></Text>
      <Text></Text>
      <View style={styles.childContainer}>

        <TextInput
          style={styles.textField}
          placeholder='Tyoe here to add new ToDo'
          value={todo}
          onChangeText={setTodo}
          returnKeyType="done"
          // onSubmitEditing={addTodo}
          blurOnSubmit={true}
          clearButtonMode="unless-editing" // ???????
        />

        <TouchableOpacity onPress={addTodo}>
          <FontAwesome name="plus-circle" size='40' />
        </TouchableOpacity>

      </View >

      <View style={styles.childContainer}>
        {/* style active button ??????? */} 

        <TouchableOpacity style={styles.bottun} onPress={() => { setFilter('all');  }}>
          <Text > ALL </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottun} onPress={() => { setFilter('checked');  }} >
          <Text > checked </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottun} onPress={() => { setFilter('unchecked'); }} >
          <Text > unchecked </Text>
        </TouchableOpacity>

      </View>

      <FlatList
        data={handleFiltration()}

        renderItem={({ item , index}) => {
          return (
            <TouchableOpacity 
              style={{flex: 1, flexDirection: 'row'}}
              onPress={()=> setCheckbox(index)}
              >

                <FontAwesome name={item.isChecked? 'check-circle' : 'check-circle-o'} size='25'/>
                <Text style={{fontSize: 20}}>{item.todo}</Text>
                {/* , {textDecoration:item.isChecked?'line-through':'none'} */}
            </TouchableOpacity>  
          )
        }}

        keyExtractor={(_, index) => String(index)}

        ListEmptyComponent={<Text>No ToDo added yet</Text>}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 75,
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // padding:'20px'
  },
  childContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '80%',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  textField: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    flexGrow: 1,
    backgroundColor: 'white',
    paddingRight: 15,
     fontSize: 17,
  },
  bottun: {
    height: 50,
    justifyContent: 'center',
    borderRadius: 40,
    backgroundColor: 'white',
    flexBasis: 90,
    alignContent: "center",
    justifyContent: 'center'
  }
});
