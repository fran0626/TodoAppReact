import React from "react";
import { useLocalStorage } from "./useLocalStorage";

const TodoContext = React.createContext();

function TodoProvider({children}){
    const [searchValue, setSearchValue] = React.useState('');

    // const [todos, saveTodos] = useLocalStorage('ToDos_V1', []);
    // Esta línea da error porque { item, saveItem } es un objeto, por lo que debes extraer item y saveItem correctamente. [todos, saveTodos] esperaría que useLocalStorage devolviera un array, lo cual no es el caso
    const { 
      item: todos, 
      saveItem: saveTodos,
      loading,
      error
    } = useLocalStorage('ToDos_V1', []);

    const [openModal, setOpenModal] = React.useState(false);
  
    //Estados derivados: dependen de otro estado
    const completedTodos = todos.filter((todo) => !!todo.completed).length;
    const totalTodos = todos.length;
  
    const searchedTodos = todos.filter((todo) => {
      const noTildes = (text) => {
        return text ? text.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : '';
      };
    
      const todoText = noTildes(todo.text?.toLowerCase() || '');
      const searchText = noTildes(searchValue?.toLowerCase() || '');
    
      return todoText.includes(searchText);
    });    
  
    const addTodo = (text) => {
      const newTodos = [...todos];
      newTodos.push({text, completed: false});
      saveTodos(newTodos);
    };
  
    const completeTodo = (text) => {
      const newTodos = [...todos];
      const todoIndex = newTodos.findIndex(
        todo => todo.text === text
      );
      newTodos[todoIndex].completed = !newTodos[todoIndex].completed;
      saveTodos(newTodos);
    };
  
    const deleteTodo = (text) => {
      const newTodos = [...todos];
      const todoIndex = newTodos.findIndex(
        todo => todo.text === text
      );
      newTodos.splice(todoIndex, 1); //Se agrega cuántas posiciones queremos quitar
      saveTodos(newTodos);
    };
    return(
        <TodoContext.Provider value={{completedTodos, totalTodos, searchValue, setSearchValue, searchedTodos, completeTodo, deleteTodo, addTodo, loading, error, openModal, setOpenModal}}>
            {children}
        </TodoContext.Provider>
    );
}

export {TodoContext, TodoProvider};