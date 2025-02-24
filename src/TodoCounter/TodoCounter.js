import React from 'react';
import './TodoCounter.css'
import { TodoContext } from '../TodoContext/TodoContext';

function TodoCounter() {
    const {completedTodos, totalTodos} = React.useContext(TodoContext);

    return (
        <h1 className="TodoCounter">
            {completedTodos === totalTodos 
                ? "Completaste todas tus tareas!" 
                : `Has completado ${completedTodos} de ${totalTodos} TODOS`}
        </h1>
    );
}

export { TodoCounter };
