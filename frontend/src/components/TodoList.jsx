import React from 'react';
import Preloader from './Preloader';

const TodoList = ({loading, todos, handleStatus, handleEdit, handleDelete }) => {
  return (
    <div>
      <h2>ToDos:</h2>
      {loading?
      <Preloader />:
      <ol>
        {todos.map((todo, key) => (
          <li key={key}>
            <input
              type="checkbox"
              onChange={() => handleStatus(todo._id)} // Use todo._id for handleStatus
            />
            {todo.name}
            <button onClick={() => {handleEdit(todo._id)}}>Edit Todo</button> {/* Use todo._id for handleEdit */}
            <button onClick={() => handleDelete(todo._id)}>Delete Todo</button> {/* Use todo._id for handleDelete */}
          </li>
        ))}
      </ol>}
    </div>
  );
};

export default TodoList;
