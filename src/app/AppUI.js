import React from "react";
import { TodoCounter } from '../TodoCounter/TodoCounter';
import { TodoSearch } from '../TodoSearch/TodoSearch';
import { TodoList } from '../TodoList/TodoList';
import { TodoItem } from '../TodoItem/TodoItem';
import { CreateTodoButton } from '../CreateTodoButton/CreateTodoButton';
import { TodosLoading } from "../TodosLoading/TodosLoading";
import { TodosError } from "../TodosError/TodosError";
import { EmptyTodos } from "../EmptyTodos/EmptyTodos";
import { TodoContext } from "../TodoContext/TodoContext";
import { Modal } from "../Modal/Modal";
import { TodoForm } from "../TodoForm/TodoForm";

function AppUI() {
    const {openModal, setOpenModal} = React.useContext(TodoContext);

    return (
        //También se puede poner <>
        <React.Fragment> 
            {/* uso con use context */}
            <TodoCounter/>
            <TodoSearch/>


            {/* uso con consumer */}
            <TodoContext.Consumer>
                {({searchedTodos, completeTodo, deleteTodo, loading, error}) => (
                    <TodoList>
                        {loading && (<><TodosLoading /><TodosLoading /><TodosLoading /></>)}
                        {error && <TodosError />}
                        {(!loading && searchedTodos.length === 0) && <EmptyTodos />}


                        {searchedTodos.map(todo => (
                            <TodoItem 
                            key={todo.text} //identificador único
                            text={todo.text} 
                            completed={todo.completed}
                            onComplete={() => {completeTodo(todo.text)}}
                            onDelete={() => {deleteTodo(todo.text)}}
                            />
                        ))}
                    </TodoList>
                )}
                
            </TodoContext.Consumer>
            

            <CreateTodoButton setOpenModal={setOpenModal}/>

            {openModal && (
                <Modal>
                    <TodoForm></TodoForm>
                </Modal>
            )}
        </React.Fragment>
    );
}

export {AppUI};