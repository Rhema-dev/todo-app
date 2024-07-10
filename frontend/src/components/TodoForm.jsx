import React from "react";

const TodoForm = ({ inputValue, handleInput, editmode, updateTodo, addTodo }) => {
  return (
    <div>
      <form onSubmit={editmode ? updateTodo : addTodo}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInput}
          placeholder={editmode ? "Update Todo" : "Add new todo"}
        />
        <button type="submit">{editmode ? "Update" : "Add"}</button>
      </form>
    </div>
  );
};

export default TodoForm;
