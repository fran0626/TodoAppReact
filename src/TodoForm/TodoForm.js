import React from 'react';
import { TodoContext } from '../TodoContext/TodoContext';
import './TodoForm.css'

function TodoForm(){
    const {
        setOpenModal,
        addTodo
    } = React.useContext(TodoContext);

    const [newTodoValue, setNewTodoValue] = React.useState('');

    const onSubmit = (event) => {
        event.preventDefault();
        addTodo(newTodoValue);
        setOpenModal(false);
    }

    const onCancel = () => {
        setOpenModal(false);
    }

    const onChange = (event) => {
        setNewTodoValue(event.target.value);
    }

    return(
        <form onSubmit={onSubmit}>
            <label>Escribe tu nuevo TODO</label>
            <textarea
                placeholder="Cortar cebolla"
                value={newTodoValue}
                onChange={onChange}
                required
            ></textarea>
            <div className="TodoForm-buttonContainer">
                <button
                    type='button' 
                    onClick={onCancel}
                    className="TodoForm-button--cancel">
                        Cancelar
                </button>
                <button 
                    type='submit'
                    className="TodoForm-button--add">
                        Añadir
                </button>
            </div>
        </form>
    )
}

export{TodoForm};